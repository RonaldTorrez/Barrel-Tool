const path = require('path')

const loadFromRoot = (...args) => path.join(process.cwd(), args.join('/'))

module.exports = {
	loadFromRoot
}