import axios from 'axios'
import { environmentVariables } from './environment'

export const subscribeToMailchimpList = async (email: string) => {
	const body = {
		members: [
			{ email_address: email, status: 'subscribed' }
		]
	}
	const bodyJSON = JSON.stringify(body)
	const { audienceId, apiKey, dataCenter } = environmentVariables.mailchimp
	const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}`

	try{
		await axios.post(url, bodyJSON, { headers: { Authorization: `auth ${apiKey}` } })
	} catch (error) { throw new Error(error.message) }
}
