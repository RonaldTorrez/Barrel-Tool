const path = require('path')
const config = require(path.join(process.cwd(), 'barrel.config.js'))

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