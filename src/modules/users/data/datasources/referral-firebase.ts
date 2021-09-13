import { DatabaseGetClauses, DatabaseService } from '@modules/core'
import { ReferralFromModel } from '../models/referral'
import { ReferralBaseDataSource } from './referral-base'

export class ReferralFirebaseDataSource implements ReferralBaseDataSource {
	async get (userId: string, conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<ReferralFromModel>(`users/${userId}/referrals`, conditions)
	}

	async listen (userId: string, callback: (documents: ReferralFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<ReferralFromModel>(`users/${userId}/referrals`, callback, conditions)
	}
}
