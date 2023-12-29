const fs = require('fs')
const {configName} = require('./src/barrel.util')

const content = `const barrelConfig = {
  dir: [
    // Add your folder names here:  './models', './utils'
  ]
};

module.exports = barrelConfig;`

fs.writeFileSync(configName, content)

console.log(`The file ${configName} has been generated.`)