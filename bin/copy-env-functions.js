const fs = require('fs')

if (fs.existsSync('env.json')) {
	const content = fs.readFileSync('env.json').toString()
	const env = JSON.parse(content)
	const runtimeconfig = JSON.stringify({ env }, null, 4)
	fs.writeFileSync('firebase/functions/.runtimeconfig.json', runtimeconfig)
} else {
	console.error('Env.json doesnt exist. Try creating one by running npm env:copy:example')
	process.exit(1)
}
