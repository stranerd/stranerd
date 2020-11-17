export interface IRoleRepository {
	toggleAdmin: (id: string, isAdmin: boolean) => Promise<void>
	subscribeToMailingList: (data: { email: string }) => Promise<void>
}
