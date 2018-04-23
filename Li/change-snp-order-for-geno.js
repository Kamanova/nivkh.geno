// меняет порядок снипов в snp-файле на основе geno-файла.

//Usage:
//	node code/change-snp-order-for-geno.js --snp file/li.snp --geno file/li.geno

const fs = require("fs");
const _ = require("highland");
const minimist = require("minimist");

const argv = minimist(process.argv.slice(2));
const pathSnpFile = argv.snp;
const pathGenoFile = argv.geno;
const snpMap = {};

const snpArray = fs.readFileSync(pathSnpFile, "utf8").split("\n");
const rsIdArray = snpArray.map(line => line.split(" ")[0]);

rsIdArray.forEach((rsId, index) => {
  snpMap[rsId] = snpArray[index];
});

const genoStream = fs.createReadStream(pathGenoFile, "utf8");

_(genoStream)
  .split()
  .map(line => line.split(" ")[0])
  .each(rsId => console.log(snpMap[rsId]));
