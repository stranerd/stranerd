import Cookie from 'cookie'

export const serialize = (name: string, value: string) => Cookie.serialize(name, value, {
	maxAge: 3600,
	path: '/',
	sameSite: 'lax'
})
