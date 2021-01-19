export abstract class RoleBaseDataSource {
	abstract toggleAdmin: (data: { id: string, isAdmin: boolean }) => Promise<void>
	abstract toggleTutor: (data: { id: string, isTutor: boolean }) => Promise<void>
	abstract subscribeToMailingList: (data: { email: string }) => Promise<void>
}
