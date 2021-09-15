import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios'
import { getTokens, saveTokens } from '@utils/tokens'
import { apiBases } from '@utils/environment'

export enum StatusCodes {
	Ok = 200,
	BadRequest = 400,
	NotAuthenticated = 401,
	NotAuthorized = 403,
	NotFound = 404,
	ValidationError = 422,
	EmailNotVerified = 460,
	AccessTokenExpired = 461,
	RefreshTokenMisused = 462,
	InvalidToken = 463
}

export enum Conditions {
	lt = 'lt', lte = 'lte', gt = 'gt', gte = 'gte',
	eq = 'eq', ne = 'ne', in = 'in', nin = 'nin'
}

type Where = { field: string, value: any, condition?: Conditions }

export interface QueryParams {
	where?: Where[]
	auth?: Where[]
	whereType?: 'and' | 'or'
	sort?: { field: string, order?: 1 | -1 }
	limit?: number
	all?: boolean
	page?: number
	search?: string
}

export interface QueryResults<Model> {
	pages: {
		start: number,
		last: number,
		previous: number | null,
		next: number | null,
		current: number,
	},
	docs: {
		limit: number,
		total: number,
		count: number
	},
	results: Model[]
}

export class NetworkError extends Error {
	readonly statusCode: StatusCodes
	readonly errors: { message: string; field?: string }[]

	constructor (statusCode: number, errors: { message: string; field?: string }[]) {
		super()
		this.statusCode = statusCode
		this.errors = errors
	}
}

export class HttpClient {
	private readonly client: AxiosInstance

	constructor (baseURL: string) {
		this.client = axios.create({ baseURL })
		this.client.interceptors.request.use(async (config) => {
			const isFromOurServer = Object.values(apiBases).includes(config.baseURL!)
			if (!isFromOurServer) return config
			const { accessToken, refreshToken } = await getTokens()
			if (accessToken) config.headers['Access-Token'] = accessToken
			if (refreshToken) config.headers['Refresh-Token'] = refreshToken
			return config
		}, (error) => Promise.reject(error))
	}

	async get<Body, ReturnValue> (url: string, body: Body): Promise<ReturnValue> {
		return this.makeRequest<Body, ReturnValue>(url, 'get', body)
	}

	async post<Body, ReturnValue> (url: string, body: Body): Promise<ReturnValue> {
		return this.makeRequest<Body, ReturnValue>(url, 'post', body)
	}

	async put<Body, ReturnValue> (url: string, body: Body): Promise<ReturnValue> {
		return this.makeRequest<Body, ReturnValue>(url, 'put', body)
	}

	async delete<Body, ReturnValue> (url: string, body: Body): Promise<ReturnValue> {
		return this.makeRequest<Body, ReturnValue>(url, 'delete', body)
	}

	private async makeRequest<Body, ReturnValue> (url: string, method: Method, data: Body): Promise<ReturnValue> {
		try {
			const res = await this.client.request<Body, AxiosResponse<ReturnValue>>({
				url, method, data
			})
			return res.data
		} catch (e) {
			const error = e as unknown as AxiosError
			if (!error.isAxiosError) throw error
			if (!error.response) throw error
			const isFromOurServer = Object.values(apiBases).includes(this.client.defaults.baseURL!)
			if (!isFromOurServer) throw error
			const status = error.response.status
			if (status !== StatusCodes.AccessTokenExpired) throw new NetworkError(status, error.response.data)
			await this.getNewTokens()
			return this.makeRequest(url, method, data)
		}
	}

	private async getNewTokens () {
		const res = await this.client.post('/token', {}, { baseURL: apiBases.AUTH })
		const { accessToken, refreshToken } = res.data
		await saveTokens({ accessToken, refreshToken })
		await this.client.post('/api/auth/signin',
			{ accessToken, refreshToken },
			{ baseURL: '' }
		)
	}
}
