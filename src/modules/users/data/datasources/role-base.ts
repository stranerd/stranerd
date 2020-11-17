export abstract class RoleBaseDataSource {
	public abstract toggleAdmin: (data: { id: string, isAdmin: boolean }) => Promise<void>
	public abstract subscribeToMailingList: (data: { email: string }) => Promise<void>
}
