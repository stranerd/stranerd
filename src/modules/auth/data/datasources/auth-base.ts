export abstract class AuthBaseDataSource {
	abstract signinWithEmail: (email: string, password: string) => Promise<{ idToken: string, id: string, email: string }>
	abstract signinWithGoogle: () => Promise<{ idToken: string, id: string, email: string }>
	abstract signupWithEmail: (name: string, email: string, password: string) => Promise<{ idToken: string, id: string, email: string }>
	abstract resetPassword: (email: string) => Promise<void>
	abstract updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
	abstract session: (idToken: string) => Promise<void>
	abstract logout: () => Promise<void>
}
