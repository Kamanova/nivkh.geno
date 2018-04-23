//Для создания когнечного файла li.geno
// genoStream - geno-файл, где отсутствует заголовок, RsId присутствуют и отфильтрованы относительно 
// snp-файла. Генотипы представлены в виде нуклеотидов.


const fs = require("fs");
const minimist = require("minimist");
const highland = require("highland");
const encoding = "utf8";
const genoStream = fs.createReadStream(
  `/Users/katya/Desktop/js/file/li.geno`,
  encoding
);

const skipEmpty = s => s !== "";
const alleleVar = {};
const complement = {
  A: "T",
  T: "A",
  G: "C",
  C: "G"
};

fs
  .readFileSync(`/Users/katya/Desktop/js/file/li.snp`, encoding)
  .split("\n")
  .filter(skipEmpty)
  .forEach(line => {
    const column = line.split(" ");
    const id = column[0];
    const allele1 = `${column[4]}${column[4]}`;
    const allele2 = `${column[5]}${column[5]}`;
    const allele12 = `${column[4]}${column[5]}`;
    const flippedAllele1 = `${complement[column[4]]}${complement[column[4]]}`;
    const flippedAllele2 = `${complement[column[5]]}${complement[column[5]]}`;
    const flippedAllele12 = `${complement[column[4]]}${complement[column[5]]}`;

    const alleles = {
      allele1,
      allele2,
      allele12,
      flippedAllele1,
      flippedAllele2,
      flippedAllele12
    };

    alleleVar[id] = alleles;
  });

highland(genoStream)
  .split()
  .map(line => line.split(" "))
  .map(genoArray => {
    const rsId = genoArray.shift();
    const alleles = alleleVar[rsId];

    const geno = genoArray.map(el => {
      if (el == alleles.allele12 || el == alleles.flippedAllele12) {
        return "1";
      } else if (el == alleles.allele1 || el == alleles.flippedAllele1) {
        return "0";
      } else if (el == alleles.allele2 || el == alleles.flippedAllele2) {
        return "2";
      } else if (el == "--") {
        return "9";
      } else {
        return "Unknown genotype";
      }
    });
    return geno.join("");
  })
  .each(res => console.log(res));
