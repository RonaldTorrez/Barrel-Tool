const regExtension = /\.[^.]+$/
const regGetDefaultExport = /export default(?:\s+function\s+(\w+)|\s+(\w+))/
const regGetGeneralExport = /export (?:const|let|var|function|class|interface|type)\s+(\w+)/g
const regGetNamedExport = /export\s*\{\s*([^}]+)\s*}/g
const regNamedExport = /export\s*\{\s*|\s*}/g

module.exports = {
	regExtension,
	regGetDefaultExport,
	regGetGeneralExport,
	regGetNamedExport,
	regNamedExport
}