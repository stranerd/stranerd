const fs = require('fs')
const axios = require('axios')
const { host, port, use_subdomain: useSubdomain, ssl } = require('../env.json')

const baseURL = useSubdomain ? `http${ssl ? 's' : ''}://api.${host}:${port}/` : `http${ssl ? 's' : ''}://${host}:${port}/api/`
const client = axios.create({ baseURL })

const fetchUsers = async () => {
	const userIds = [
		'AnvGH8M7puPI9G3YWqZbga9Y2SIu',
		'lFRSwFfCR8IXiiQ2YlsTDgPktcOf',
		'RIzWHZvK1dSInQGACNV9TkGYhSDS',
		'JKpm7EUxG5CCYfAGALclOpAHbA5H'
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
