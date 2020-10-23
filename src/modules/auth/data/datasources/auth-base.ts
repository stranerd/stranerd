export abstract class AuthBaseDataSource {
	public abstract loginWithEmail: (email: string, password: string) => Promise<string>
	public abstract loginWithGoogle: () => Promise<string>
	public abstract logout: () => Promise<void>
	public abstract registerWithEmail: (name: string, email: string, password: string) => Promise<string>
	public abstract resetPassword: (email: string) => Promise<void>
	public abstract updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
}
