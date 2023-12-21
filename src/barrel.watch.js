const fs = require('fs')
const {exec} = require('child_process')
const config = require('./barrel.config.default')

const DIRECTORIES = config.dir
const EXCLUSIONS = config.exclusions
const COMMAND = 'node ./barrel.generator.js'
let Count = 0

function executeCommand() {
	Count++
	console.log(`------------  ${Count}  ------------`)
	console.log('🛠️ Changes detected...')
	exec(COMMAND, (error) => {
		if (error) {
			console.error(`❌ Error executing the command: ${error.message}`)
			return
		}
		console.log(`✅ Command executed successfully`)
		console.log('👀 Waiting for changes...')
	})
}

function handleChanges(event, fileName) {
	if (!fileName.includes(EXCLUSIONS)) {
		// const indexFileRegex = /index\.ts$/
		// if (!indexFileRegex.test(fileName)) {
		executeCommand()
		// }
	}
}

function watchFolderChanges(folder) {
	if (fs.existsSync(folder)) {
		fs.watch(folder, {recursive: true}, handleChanges)
		console.log(`👀 Watching for changes in folder: ${folder}`)
	}
}

DIRECTORIES.forEach(watchFolderChanges)