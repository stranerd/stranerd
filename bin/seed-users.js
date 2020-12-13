const fs = require('fs')
const axios = require('axios')
const { domain, port } = require('../env.json')

const baseURL = `http://${domain}:${port}/api/`
const client = axios.create({ baseURL })

const fetchUsers = async () => {
	const userJSON = fs.existsSync('firebase/docs/exports/users.json')
		? fs.readFileSync('firebase/docs/exports/users.json').toString()
		: ''
	return JSON.parse(userJSON).users ?? []
}

const sendUsers = async (users) => {
	try {
		await client.post('/auth/import', { users })
	} catch (error) {
		console.log(error.response.data)
	}
}

fetchUsers().then(async (users) => {
	await sendUsers(users)
	console.log('Done')
})
