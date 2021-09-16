import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReferralEntity } from '../entities/referral'

export interface IReferralRepository {
	get: (userId: string, query: QueryParams) => Promise<QueryResults<ReferralEntity>>
	listenToOne: (userId: string, id: string, listener: Listeners<ReferralEntity>) => Promise<() => void>
	listenToMany: (userId: string, listener: Listeners<ReferralEntity>) => Promise<() => void>
}
