const fs = require('fs')
const axios = require('axios')
const { domain, port } = require('../env.json')

const baseURL = `http://${domain}:${port}/api`
const client = axios.create({ baseURL })

const fetchUsers = async () => {
	const userIds = [
		'N3SDMjFSeUC9e5JCR7xYKwdWXO1h',
		'Voh7NxSi36PPMnHvSubqJ3i0PvNO'
	]

	try {
		const { data } = await client.post('/auth/export', { userIds })
		return data.users
	} catch (error) {
		console.log(error.response.data)
		return []
	}
}

const saveUsers = async (users) => {
	const usersJson = JSON.stringify({ users }, null, 4)
	fs.writeFileSync('firebase/docs/exports/users.json', usersJson)
}

fetchUsers().then(async (users) => {
	await saveUsers(users)
	console.log('Done')
})
