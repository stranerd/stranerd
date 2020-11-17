export interface IAuthRepository {
	signinWithEmail: (email: string, password: string) => Promise<{ idToken: string, id: string, email: string }>
	signinWithGoogle: () => Promise<{ idToken: string, id: string, email: string }>
	signupWithEmail: (name: string, email: string, password: string) => Promise<{ idToken: string, id: string, email: string }>
	resetPassword: (email: string) => Promise<void>
	updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
	session: (idToken: string) => Promise<void>
	logout: () => Promise<void>
}
