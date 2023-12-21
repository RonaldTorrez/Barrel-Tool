const fs = require('fs').promises
const path = require('path')
const config = require('./barrel.config.default')

const SAVE_AS = config.saveAs
const DIRECTORIES = config.dir
const INCLUDE_EXTENSIONS = config.includeExtensions
const USE_SEMICOLON = config.useSemicolon
const USE_EXTENSION = config.useExtension
const SEPARATE_BY_FILES = config.separateByFiles
const SUB_FOLDERS = config.subFolders

function applyExtension(file) {
	return USE_EXTENSION ? file : file.replace(/\.[^.]+$/, '')
}

async function existDir(dir) {
	try {
		await fs.access(dir)
		return true
	} catch {
		return false
	}
}

async function readFile(filePath) {
	try {
		return await fs.readFile(filePath, 'utf8')
	} catch (error) {
		console.error(`Error reading file: ${filePath}`)
		throw error
	}
}

async function writeFile(filePath, content) {
	try {
		await fs.writeFile(filePath, content, 'utf8')
	} catch (error) {
		console.error(`Error writing to file: ${filePath}`)
		throw error
	}
}

function getDefaultExport(fileContent) {
	const match = fileContent.match(/export default(?:\s+function\s+(\w+)|\s+(\w+))/)
	return match ? match[1] || match[2] : null
}

function getGeneralExport(fileContent) {
	return fileContent.match(/export (?:const|let|var|function|class|interface|type)\s+(\w+)/g) || []
}

function getNamedExport(fileContent) {
	const match = fileContent.match(/export\s*\{\s*([^}]+)\s*}/g)
	return match ? match.map(match => match.replace(/export\s*\{\s*|\s*}/g, '').trim()) : []
}

async function processFile(directory, file) {
	try {
		if (!SAVE_AS.includes(file) && INCLUDE_EXTENSIONS.some(ext => file.endsWith(ext))) {
			const filePath = path.join(directory, file)
			const fileContent = await readFile(filePath)
			const exportDefault = getDefaultExport(fileContent)
			const exportGeneral = getGeneralExport(fileContent)
			const namedExports = getNamedExport(fileContent)

			const fileName = applyExtension(file)
			const barrelContent = []

			if (exportDefault) {
				barrelContent.push(`export { default as ${exportDefault} } from './${fileName}'${USE_SEMICOLON}`)
			}

			if (exportGeneral.length > 0) {
				barrelContent.push(`export * from './${fileName}'${USE_SEMICOLON}`)
			}

			if (namedExports.length > 0) {
				// namedExports.forEach(exportName => {
				// 	barrelContent.push(`export { ${exportName} } from './${fileName}'${USE_SEMICOLON}`)
				// })

				barrelContent.push(`export * from './${fileName}'${USE_SEMICOLON}`)
			}

			return barrelContent.join('\n')
		}
		return null
	} catch (error) {
		console.error(`Error processing file: ${file} in directory: ${directory}`)
		console.error(error)
		return null
	}
}

async function generateBarrel(directory) {
	try {
		const files = await fs.readdir(directory)

		if (files.length === 0) {
			return
		}

		const barrelContent = []

		for (const file of files) {
			const entry = await processFile(directory, file)
			if (entry !== null) {
				barrelContent.push(entry)
			}
		}

		const barrelPath = path.join(directory, SAVE_AS)
		await writeFile(barrelPath, barrelContent.join(SEPARATE_BY_FILES))
	} catch (error) {
		console.error(`Error generating barrel for directory: ${directory}`)
		console.error(error)
	}
}

async function processSubdirectories(directory) {
	const subDirectories = await fs.readdir(directory)

	for (const subDir of subDirectories) {
		const fullPath = path.join(directory, subDir)
		const stats = await fs.lstat(fullPath)

		if (stats.isDirectory()) {
			await existDir(fullPath)
			await generateBarrel(fullPath)
			await processSubdirectories(fullPath)
		}
	}
}

async function generateBarrels() {
	if (DIRECTORIES.length === 0) {
		return
	}

	for (const dir of DIRECTORIES) {
		await existDir(dir)
		await generateBarrel(dir)

		if (SUB_FOLDERS) {
			await processSubdirectories(dir)
		}
	}
}

generateBarrels().then()