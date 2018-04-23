const fs = require("fs");
const _ = require("highland");
const model = fs
  .readFileSync("/model", "utf8")
  .split("\n");

const stream2 = fs.createReadStream(
  "/snp_list_yoruba",
  "utf8"
);

let snp_list = [];

function generateCol(line) {
  let array = line.split("\t")[0];
  return array;
}

let number = 0;

function generateIndexesStreamGeno(line) {
  number += 1;
  const l = line + " " + number;
  const new_line = l.split(" ");
  console.log(new_line);
  return new_line;
}
list = [];
result = [];

_(stream2)
  .split()
  .map(generateCol)
  .map(generateIndexesStreamGeno)
  .map(new_line => {
    const idx = model.indexOf(new_line[0], 0);
    return idx;
  })

  .each(result => console.log(result));
