import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReferralFromModel } from '../models/referral'

export abstract class ReferralBaseDataSource {
	abstract get: (user: string, query: QueryParams) => Promise<QueryResults<ReferralFromModel>>
	abstract listenToMany: (user: string, listener: Listeners<ReferralFromModel>) => Promise<() => void>
	abstract listenToOne: (user: string, id: string, listener: Listeners<ReferralFromModel>) => Promise<() => void>
}
