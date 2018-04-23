const fs = require("fs");
const _ = require("highland");
const minimist = require("minimist");
const stream1 = fs.createReadStream(
  "/Users/katya/Desktop/js/file/omni-cardona-fedorova-pakendorf-rasmussen-li-lazaridis.fam",
  "utf8"
);
const nameArray = fs
  .readFileSync("/Users/katya/Desktop/js/file/clust.txt", "utf8")
  .split("\n");
const population = {};

const nameIdArray = nameArray.map(line => line.split(" ")[2]);

nameIdArray.forEach((name, index) => {
  population[index] = name;
});

_(stream1)
  .split()
  .filter(line => line !== "")
  .map(line => {
    const indexfam = line.split(" ")[0];
    line = line.replace(/\d+/, population[indexfam]);
    return line;
  })
  .each(data => console.log(data));
