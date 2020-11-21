const fs = require('fs')
const { exec } = require('child_process')

if (fs.existsSync('env.json')) {
	const content = fs.readFileSync('env.json').toString()
	const { environment } = JSON.parse(content)
	const command = `firebase functions:config:unset env -P ${environment} && firebase functions:config:set env=${content} -P ${environment}`
	exec(command, (error, _, stderr) => {
		if (error || stderr) process.exit(1)
	})
}
