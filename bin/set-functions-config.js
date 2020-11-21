const fs = require('fs')
const { exec } = require('child_process')

const parse = (tree) => {
	const isObj = (x) => x !== null && typeof x === 'object'

	const values = []
	const properties = Object.keys(tree)
	properties.forEach((prop) => {
		if (isObj(tree[prop])) {
			const children = parse(tree[prop])
			children.forEach((child) => values.push(prop + '.' + child))
		} else {
			const value = prop + '=' + '"' + tree[prop] + '"'
			values.push(value)
		}
	})
	return values
}

if (fs.existsSync('env.json')) {
	const content = fs.readFileSync('env.json').toString()
	const env = JSON.parse(content)
	const { environment } = env
	const envs = parse({ env }).join('\t')

	const command = `firebase functions:config:unset env -P ${environment} && firebase functions:config:set ${envs} -P ${environment}`
	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error('Error:', error.message)
			process.exit(1)
		}
		if (stderr) console.warn(stderr)
		console.log(stdout)
	})
} else {
	console.error('Env.json doesnt exist')
}
