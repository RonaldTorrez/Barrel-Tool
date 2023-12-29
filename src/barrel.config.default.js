const {loadFromRoot} = require('./barrel.util')
const {configName} = require('./barrel.util')
const config = require(loadFromRoot(configName))

const barrelConfigDefault = {
	dir: config.dir ?? [],
	saveAs: config.saveAs ?? 'index.ts',
	useSemicolon: config.useSemicolon ?? false,
	useExtension: config.useExtension ?? false,
	separateByFiles: config.separateByFiles ?? false,
	subFolders: config.subFolders ?? true,
	includeExtensions: config.includeExtensions ?? ['.ts', '.tsx'],
	exclusions: config.exclusions ?? []
}

const c = barrelConfigDefault

c.exclusions.push(c.saveAs)
c.separateByFiles = c.separateByFiles ? '\n\n' : '\n'
c.useSemicolon = c.useSemicolon ? ';' : ''

module.exports = barrelConfigDefault