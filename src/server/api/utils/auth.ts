import axios from 'axios'
import { apiBases } from '../../../utils/environment'

export const getUser = async (accessToken: string, refreshToken: string) => {
	const response = await axios
		.create({
			baseURL: apiBases.AUTH,
			headers: {
				'Access-Token': accessToken,
				'Refresh-Token': refreshToken
			}
		}).get('/user')
	return response.data
}

export const signout = async (accessToken: string, refreshToken: string) => {
	await axios
		.create({
			baseURL: apiBases.AUTH,
			headers: {
				'Access-Token': accessToken,
				'Refresh-Token': refreshToken
			}
		}).post('/user/signout').catch()
}
