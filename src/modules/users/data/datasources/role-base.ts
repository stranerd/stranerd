export abstract class RoleBaseDataSource {
	abstract toggleAdmin: (data: { id: string, isAdmin: boolean }) => Promise<void>
}
