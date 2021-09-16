import { HttpClient } from '@modules/core'
import { apiBases } from '@utils/environment'
import { RoleBaseDataSource } from '../datasources/role-base'

export class RoleApiDataSource implements RoleBaseDataSource {
	private authClient: HttpClient

	constructor () {
		this.authClient = new HttpClient(apiBases.STRANERD)
	}

	async toggleAdmin (data: { id: string, isAdmin: boolean }) {
		await this.authClient.post<any, boolean>('/user/roles', {
			app: 'stranerd',
			role: 'isAdmin',
			userId: data.id,
			value: data.isAdmin
		})
	}
}
