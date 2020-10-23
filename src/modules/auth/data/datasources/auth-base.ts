export abstract class AuthBaseDataSource {
	public abstract loginWithEmail: (email: string, password: string) => Promise<{ idToken: string, id: string, email: string }>
	public abstract loginWithGoogle: () => Promise<{ idToken: string, id: string, email: string }>
	public abstract registerWithEmail: (name: string, email: string, password: string) => Promise<{ idToken: string, id: string, email: string }>
	public abstract logout: () => Promise<void>
	public abstract resetPassword: (email: string) => Promise<void>
	public abstract updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
}
