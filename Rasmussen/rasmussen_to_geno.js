const fs = require("fs");
const _ = require("highland");

// const stream1 = fs.createReadStream(
//   "rasmussen660.snp",
//   "utf8"
// );
// //получили файл snplist > snplist_for_rasmussen660
// _(stream1)
//   .split()
//   .map(line => line.split(" ")[0])
//   .each(array => console.log(array));

const snplist = fs
  .readFileSync("snplist_for_rasmussen660", "utf8")
  .split("\n");

const stream = fs.createReadStream(
  "GSE22494_660_eskimo_matrix.txt",
  "utf8"
);

result = [];
_(stream)
  .split()
  .map(line => line.split("\t"))
  .filter(col => {
    const rs = snplist.indexOf(col[0]) >= 0;
    return rs;
  })
  .map(col => {
    let result = [];
    for (let i = 1; i < col.length; i += 6) {
      result.push(col[i]);
    }
    return result;
  })
  .drop(1)
  .map(geno => {
    const new_geno = geno.map(el => {
      if (el == "AA") {
        return "0";
      } else if (el == "AB") {
        return "1";
      } else if (el == "BB") {
        return "2";
      } else if (el == "NC") {
        return "9";
      } else {
        return "Unknown genotype";
      }
    });
    return new_geno;
  })
  .each(result => console.log(result.join("")));
