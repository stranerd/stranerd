import { FunctionsService } from '@modules/core'
import { RoleBaseDataSource } from '../datasources/role-base'

export class RoleFirebaseDataSource implements RoleBaseDataSource {
	async toggleAdmin (data: { id: string, isAdmin: boolean }) {
		return await FunctionsService.call('toggleAdmin', data)
	}

	async subscribeToMailingList (data: { email: string }) {
		return await FunctionsService.call('subscribeToMailingList', data)
	}
}
