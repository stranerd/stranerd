import axios from 'axios'
import { GenerateLink } from '@utils/router'

const client = axios.create({
	baseURL: GenerateLink({ path: '/api', differentSubdomain: true }),
	withCredentials: true
})

export { client as AxiosInstance }
