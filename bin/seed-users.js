const fs = require('fs')
const axios = require('axios')
const { domain, port, use_subdomain: useSubdomain, ssl } = require('../env.json')

const baseURL = useSubdomain ? `http${ssl ? 's' : ''}://api.${domain}:${port}/` : `http${ssl ? 's' : ''}://${domain}:${port}/api/`
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
