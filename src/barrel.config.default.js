const config = require('./barrel.config')

const barrelConfigDefault = {
	dir: config.dir ?? [],
	saveAs: config.saveAs ?? 'index.ts',
	useSemicolon: config.useSemicolon ?? false,
	useExtension: config.useExtension ?? false,
	separateByFiles: config.separateByFiles ?? false,
	subFolders: config.subFolders ?? true,
	includeExtensions: config.fileExtensions ?? ['.ts', '.tsx'],
	exclusions: config.exclutions ?? []
}

const c = barrelConfigDefault

c.exclusions.push(c.saveAs)
c.separateByFiles = c.separateByFiles ? '\n\n' : '\n'
c.useSemicolon = c.useSemicolon ? ';' : ''

module.exports = barrelConfigDefault