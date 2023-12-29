const path = require('path')

const loadFromRoot = (...args) => path.join(process.cwd(), args.join('/'))
const configName = 'barrel.config.js'

module.exports = {
	loadFromRoot,
	configName
}