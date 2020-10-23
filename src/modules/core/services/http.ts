import axios from 'axios'
import { protocol, hostname, useSubdomain } from '@utils/environment'

const getBaseURL = () => {
	return useSubdomain ? protocol + 'api.' + hostname : protocol + hostname + '/api'
}

const client = axios.create({
	baseURL: getBaseURL(),
	withCredentials: true
})

export { client as AxiosInstance }
