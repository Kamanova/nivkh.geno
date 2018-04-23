const fs = require("fs");
const _ = require("highland");
const stream1 = fs.createReadStream(
  "li-sample-information",
  "utf8"
);

function generateCol(line) {
  let col = line.split(",");
  return col;
}

_(stream1)
  .split()
  .drop(1)
  .map(generateCol)
  .map(col => {
    let ind = [];
    for (let i = 0; i < col.length; i += 9) {
      ind.push(col[i], col[i + 1], col[i + 2]);
    }
    return ind;
  })

  .each(ind => console.log(ind.join(" ")));
