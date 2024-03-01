const path = require('path')

const loadFromRoot = (...args) => path.join(process.cwd(), args.join('/'))
const loadFrom = (...args) => path.join(args.join('/'))
const configName = 'barrel.config.js'

module.exports = {
	loadFromRoot,
	loadFrom,
	configName
}