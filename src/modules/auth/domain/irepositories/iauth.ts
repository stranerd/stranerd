export interface IAuthRepository {
	loginWithEmail: (email: string, password: string) => Promise<string>
	loginWithGoogle: () => Promise<string>
	logout: () => Promise<void>
	registerWithEmail: (name: string, email: string, password: string) => Promise<string>
	resetPassword: (email: string) => Promise<void>
	updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
}
