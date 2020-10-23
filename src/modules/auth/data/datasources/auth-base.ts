export abstract class AuthBaseDataSource {
	abstract loginWithEmail: (email: string, password: string) => Promise<{ idToken: string, id: string, email: string }>
	abstract loginWithGoogle: () => Promise<{ idToken: string, id: string, email: string }>
	abstract registerWithEmail: (name: string, email: string, password: string) => Promise<{ idToken: string, id: string, email: string }>
	abstract resetPassword: (email: string) => Promise<void>
	abstract updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
	abstract session: (id: string, idToken: string) => Promise<void>
	abstract logout: () => Promise<void>
}
