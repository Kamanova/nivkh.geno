const fs = require("fs");
const _ = require("highland");
const minimist = require("minimist");
const inputfile = fs.createReadStream(
  "/Users/katya/Desktop/js/file/inputfile_treemix",
  "utf8"
);
index_line = 0;
_(inputfile)
  .split()
  .filter(line => line !== "")
  .map(line => {
    const fields = line.split(" ");
    fields[21] = "";
    fields[17] = "";
    fields[28] = "";
    return fields.join(" ");
  })
  .each(data => console.log(data));