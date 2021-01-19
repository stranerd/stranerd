import { FunctionsService } from '@modules/core/services/firebase'
import { RoleBaseDataSource } from '../datasources/role-base'

export class RoleFirebaseDataSource implements RoleBaseDataSource {
	async toggleAdmin (data: { id: string, isAdmin: boolean }) {
		return await FunctionsService.call('toggleAdmin', data)
	}

	async toggleTutor (data: { id: string, isTutor: boolean }) {
		return await FunctionsService.call('toggleTutor', data)
	}

	async subscribeToMailingList (data: { email: string }) {
		return await FunctionsService.call('subscribeToMailingList', data)
	}
}
