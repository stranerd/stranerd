import axios from 'axios'
import { AUTH_API_BASE } from '../../../utils/environment'

export const getUser = async (accessToken: string, refreshToken: string) => {
	const response = await axios
		.create({
			baseURL: AUTH_API_BASE,
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
			baseURL: AUTH_API_BASE,
			headers: {
				'Access-Token': accessToken,
				'Refresh-Token': refreshToken
			}
		}).post('/user/signout').catch()
}
