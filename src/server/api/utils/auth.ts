import axios, { AxiosError } from 'axios'
import { apiBases } from '../../../utils/environment'
import { StatusCodes } from '../../../utils/http'

type GetUserReturn = { accessToken: string, refreshToken: string, retry: boolean, user: any }

export const getUser = async (accessToken: string, refreshToken: string, retry = false): Promise<GetUserReturn> => {
	try {
		const response = await axios
			.create({
				baseURL: apiBases.AUTH,
				headers: {
					'Access-Token': accessToken,
					'Refresh-Token': refreshToken
				}
			}).get('/user')
		const user = response.data
		return { user, accessToken, refreshToken, retry }
	} catch (e: any) {
		const err = e as AxiosError
		if (!err.isAxiosError) throw err
		if (!err.response) throw err
		if (err.response.status !== StatusCodes.AccessTokenExpired) throw err
		const response = await axios.create({
			baseURL: apiBases.AUTH,
			headers: {
				'Access-Token': accessToken,
				'Refresh-Token': refreshToken
			}
		}).post('/token')
		const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data
		return await getUser(newAccessToken, newRefreshToken, true)
	}
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
