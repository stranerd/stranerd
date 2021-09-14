type Tokens = {
	accessToken: string
	refreshToken: string
}

const tokens: Tokens = {
	accessToken: '',
	refreshToken: ''
}

export const saveTokens = async ({ accessToken, refreshToken }: Tokens) => {
	tokens.accessToken = accessToken
	tokens.refreshToken = refreshToken
}

export const getTokens = async (): Promise<Tokens> => ({
	accessToken: tokens.accessToken,
	refreshToken: tokens.refreshToken
})
