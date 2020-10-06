export const signin = async (idToken: string) => {
	console.log('Unimplemented: ', idToken)
}

export const signout = async (session: string) => {
	console.log('Unimplemented: ', session)
}

export const decodeSessionCookie = async (session: string) => {
	console.log('Unimplemented: ', session)
	return { id: session  }
}
