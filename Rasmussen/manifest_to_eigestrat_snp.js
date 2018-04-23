// Optimistic (believes in same SNP states across different manifests)

// Usage:
// node manifest_to_eigestrat_snp.js \
//      InfiniumOmniExpress-24v1-2_A1.csv_Physical-and-Genetic-Coordinates.txt \
//      Human660W-Quad_v1_H.csv \
//      InfiniumOmniExpress-24v1-2_A2.csv
//      > cardona.omni-filtered.snp

const fs = require("fs");
const hl = require("highland");
const _ = require("lodash");
const Immutable = require("immutable");

const coordinatesPath = process.argv[2];
const manifestPath = process.argv[3];
const referenceManifestPath = process.argv[4];
const encoding = "utf8";
const complement = {
  A: "T",
  T: "A",
  G: "C",
  C: "G"
};

function mapIlluminaCoordinatesToEigenstratSnp(line) {
  const columns = line.split("\t");
  const snp = columns[0];

  let chr = columns[1];
  let map = columns[2];
  let dis = (parseFloat(columns[3]) / 100).toFixed(6);

  if (chr == "X") chr = 23;
  if (chr == "Y") chr = 24;
  if (chr == "XY") chr = 23; // check

  if (!_.isFinite(dis)) dis = 0; // check

  return { body: `${snp} ${chr} ${dis} ${map}`, snp };
}

function scanForAssaySection(result, line) {
  if (typeof result === "string") {
    result = { keep: false, line };
  }

  let { keep } = result;

  if (line.match(/^\[\w+\]$/)) {
    keep = !!line.match(/\[Assay\]/);
  }

  return { keep, line };
}

hl(fs.createReadStream(referenceManifestPath, encoding))
  .split()
  .scan1(scanForAssaySection)
  .filter(data => data.keep)
  .pluck("line")
  .drop(2)
  .map(line => line.split(",")[1])
  .toArray(list => {
    let set = Immutable.Set(list);

    hl(fs.createReadStream(coordinatesPath, encoding))
      .split()
      .drop(1)
      .map(mapIlluminaCoordinatesToEigenstratSnp)
      .toArray(list => {
        const snps = list.map(el => el.snp);

        hl(fs.createReadStream(manifestPath, encoding))
          .split()
          .scan1(scanForAssaySection)
          .filter(data => data.keep)
          .pluck("line")
          .drop(2)
          .filter(line => set.has(line.split(",")[1]))
          .map(line => {
            const columns = line.split(",");
            const snp = columns[1];
            const strand = columns[2];

            let allele1 = columns[3][1];
            let allele2 = columns[3][3];

            if (strand == "BOT") {
              allele1 = complement[allele1];
              allele2 = complement[allele2];
            }

            const index = snps.indexOf(snp);

            return `${list[index].body} ${allele1} ${allele2}\n`;
          })
          .pipe(process.stdout);
      });
  });
