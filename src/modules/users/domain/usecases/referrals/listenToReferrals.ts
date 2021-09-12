import { DatabaseGetClauses } from '@modules/core'
import { IReferralRepository } from '../../irepositories/ireferral'
import { ReferralEntity } from '../../entities/referral'

export class ListenToReferralsUseCase {
	private repository: IReferralRepository

	constructor (repository: IReferralRepository) {
		this.repository = repository
	}

	async call (userId: string, callback: (entities: ReferralEntity[]) => void, date?: number) {
		const conditions: DatabaseGetClauses = {
			order: { field: 'dates/createdAt' }
		}
		if (date) conditions!.order!.condition = { '>': date }
		const cb = (entities: ReferralEntity[]) => callback(entities)
		return await this.repository.listen(userId, cb, conditions)
	}
}
