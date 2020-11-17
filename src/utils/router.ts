import { useSubdomain, protocol, hostname } from '@utils/environment'

export const GenerateLink = ({ path, differentSubdomain, root } : { path: string, differentSubdomain?: boolean, root?: boolean }) => {
	if (!useSubdomain) return path.startsWith('/') ? path : '/' + path

	if (root && differentSubdomain) return `${protocol}${hostname}/${path.startsWith('/') ? path.substr(1) : path}`
	else if (root && !differentSubdomain) return path.startsWith('/') ? path : '/' + path

	const [subdomain, ...rem] = path.split('/').filter((str) => !!str)

	if (!differentSubdomain) return '/' + rem.join('/')

	if (subdomain) return `${protocol}${subdomain}.${hostname}/${rem?.join('/')}`

	return `${protocol}${hostname}/${path.startsWith('/') ? path.substr(1) : path}`
}
