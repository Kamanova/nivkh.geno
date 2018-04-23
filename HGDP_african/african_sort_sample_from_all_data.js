const fs = require("fs");
const _ = require("highland");
const stream1 = fs.createReadStream("file/african_vcf_data", "utf8");
const stream2 = fs.createReadStream(
  "/Sample_name_yoruba ",
  "utf8"
);
let indexes = [];
let names = [];
_(stream2)
  .split()
  .map(line => line.split("\t")[0])
  .toArray(names => {
    _(stream1)
      .split()
      .drop(95)
      .map(line => line.split("\t"))
      .map(array => {
        if (indexes.length == 0) {
          array.forEach((el, index) => {
            if (names.indexOf(el) >= 0) indexes.push(index);
          });
        }
        const filteredArray = array.filter(
          (el, index) => indexes.indexOf(index) >= 0
        );
        return filteredArray;
      })
      .each(value => {
        console.log(value);
      });
  });
