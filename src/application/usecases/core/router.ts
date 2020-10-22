import { useSubdomain, host, port, isDev, ssl } from '@utils/enviroment'

const getLink = ({ path, differentSubdomain, root } : { path: string, differentSubdomain?: boolean, root?: boolean }) => {
	const hostname = isDev ? `${host}:${port}` : host
	const protocol = `http${ssl ? 's' : ''}://`

	if (!useSubdomain) return path.startsWith('/') ? path : '/' + path

	if (root && differentSubdomain) return `${protocol}${hostname}/${path.startsWith('/') ? path.substr(1) : path}`
	else if (root && !differentSubdomain) return path.startsWith('/') ? path : '/' + path

	const [subdomain, ...rem] = path.split('/').filter((str) => !!str)

	if (!differentSubdomain) return '/' + rem.join('/')

	if (subdomain) return `${protocol}${subdomain}.${hostname}/${rem?.join('/')}`

	return `${protocol}${hostname}/${path.startsWith('/') ? path.substr(1) : path}`
}

export const useRouter = () => ({ getLink })
