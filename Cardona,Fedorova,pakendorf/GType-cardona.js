const fs = require('fs')
const _ = require('highland')

const stream = fs.createReadStream('cardona.txt', 'utf8')

_(stream)
  .split()
  .map(line => {
    const col = line.split('\t')
    const rs = col[0]
    let result = [rs]

    for (let i = 1; i < col.length; i += 6) {
      result.push(col[i], col[i + 4])
    }

    return result
  })
  .each(data => console.log(data.join(';')))
