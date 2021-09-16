import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ReferralFromModel } from '../models/referral'
import { ReferralBaseDataSource } from './referral-base'

export class ReferralApiDataSource implements ReferralBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async get (_: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ReferralFromModel>>('/referrals', query)
	}

	async listenToOne (_: string, id: string, listener: Listeners<ReferralFromModel>) {
		return listenOnSocket(`referrals/${id}`, listener)
	}

	async listenToMany (_: string, listener: Listeners<ReferralFromModel>) {
		return listenOnSocket('referrals', listener)
	}
}
