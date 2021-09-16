import { Listeners } from '@modules/core'
import { IReferralRepository } from '../../irepositories/ireferral'
import { ReferralEntity } from '../../entities/referral'

export class ListenToReferralsUseCase {
	private repository: IReferralRepository

	constructor (repository: IReferralRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<ReferralEntity>) {
		return await this.repository.listenToMany(userId, listener)
	}
}
