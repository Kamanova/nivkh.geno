const fs = require('fs')
const _ = require('highland')
const stream = fs.createReadStream(
  'manifest_file/cardona.txt',
  'utf8'
)
const stream1 = fs.createReadStream(
  'manifest_file/omni.txt',
  'utf8'
)

let ar = []
let set = new Set()

_(stream)
  .split()
  .map(line => line.split(',')[1])
  .each(snp => ar.push(snp))
  .done(() => {
    _(stream1)
      .split()
      .map(line1 => line1.split(',')[1])
      .each(snp1 => set.add(snp1))
      .done(() => {
        // console.log(set)
        // console.log(ar)

        let result = 0

        for (let i = 0; i < ar.length; i += 1) {
          if (set.has(ar[i])) result += 1
        }

        console.log(result)
      })
  })

