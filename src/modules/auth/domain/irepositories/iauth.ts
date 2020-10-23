export interface IAuthRepository {
	loginWithEmail: (email: string, password: string) => Promise<{ idToken: string, id: string, email: string }>
	loginWithGoogle: () => Promise<{ idToken: string, id: string, email: string }>
	registerWithEmail: (name: string, email: string, password: string) => Promise<{ idToken: string, id: string, email: string }>
	resetPassword: (email: string) => Promise<void>
	updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
	session: (id: string, idToken: string) => Promise<void>
	logout: () => Promise<void>
}
