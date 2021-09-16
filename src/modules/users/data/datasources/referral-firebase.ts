import { DatabaseService, Listeners, QueryParams } from '@modules/core'
import { ReferralFromModel } from '../models/referral'
import { ReferralBaseDataSource } from './referral-base'

export class ReferralFirebaseDataSource implements ReferralBaseDataSource {
	// @ts-ignore
	async get (userId: string, query: QueryParams) {
		// @ts-ignore
		return await DatabaseService.getMany<ReferralFromModel>(`users/${userId}/referrals`, query)
	}

	async listenToOne (userId: string, id: string, listener: Listeners<ReferralFromModel>) {
		// @ts-ignore
		return await DatabaseService.listenToMany<ReferralFromModel>(`users/${userId}/referrals/${id}`, listener)
	}

	async listenToMany (userId: string, listener: Listeners<ReferralFromModel>) {
		// @ts-ignore
		return await DatabaseService.listenToMany<ReferralFromModel>(`users/${userId}/referrals`, listener)
	}
}
