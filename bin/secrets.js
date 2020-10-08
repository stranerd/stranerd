const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)

fs.writeFileSync(path.join(__dirname, '../.env'), args[0])
