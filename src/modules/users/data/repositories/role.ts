import { IRoleRepository } from '../../domain/irepositories/irole'
import { RoleBaseDataSource } from '../datasources/role-base'

export class RoleRepository implements IRoleRepository {
	private dataSource: RoleBaseDataSource

	constructor (dataSource: RoleBaseDataSource) {
		this.dataSource = dataSource
	}

	async toggleAdmin (id: string, isAdmin: boolean) {
		return await this.dataSource.toggleAdmin({ id, isAdmin })
	}

	async toggleTutor (id: string, isTutor: boolean) {
		return await this.dataSource.toggleTutor({ id, isTutor })
	}

	async subscribeToMailingList (data: { email: string }) {
		return await this.dataSource.subscribeToMailingList(data)
	}
}
