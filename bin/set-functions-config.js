const fs = require('fs')
const { execSync } = require('child_process')

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

	const command1 = `firebase functions:config:unset env -P ${environment} --non-interactive`
	const command2 = `firebase functions:config:set ${envs} -P ${environment} --non-interactive`
	try {
		execSync(command1)
		execSync(command2)
	} catch (err) {
		console.log(err.message)
		process.exit(1)
	}
} else throw new Error('Env.json doesnt exist. Try creating one by running npm env:copy:example')
