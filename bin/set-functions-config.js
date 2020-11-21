const fs = require('fs')
const { exec } = require('child_process')

if (fs.existsSync('env.json')) {
	const content = fs.readFileSync('env.json').toString()
	const command = `firebase functions:config:unset env && firebase functions:config:set env=${content}`
	exec(command, (error, _, stderr) => {
		if (error || stderr) process.exit(1)
	})
}
