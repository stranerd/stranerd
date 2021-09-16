import { DatabaseGetClauses, DatabaseService, QueryParams } from '@modules/core'
import { ReferralFromModel } from '../models/referral'
import { ReferralBaseDataSource } from './referral-base'

export class ReferralFirebaseDataSource implements ReferralBaseDataSource {
	// @ts-ignore
	async get (userId: string, query: QueryParams) {
		// @ts-ignore
		return await DatabaseService.getMany<ReferralFromModel>(`users/${userId}/referrals`, query)
	}

	async listen (userId: string, callback: (documents: ReferralFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<ReferralFromModel>(`users/${userId}/referrals`, callback, conditions)
	}
}
