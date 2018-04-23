const fs = require("fs");
const _ = require("highland");
const stream1 = fs.createReadStream(
  "/Users/katya/Desktop/js/file/HumanOmni2.5-4v1_B-H_MappingInformation.txt",
  "utf8"
);

function generateCol(line) {
  let col = line.split("\t")[0];
  return col;
}

_(stream1)
  .split()
  .drop(1)
  .map(generateCol)
  .each(array => console.log(array));
