import { DatabaseGetClauses, QueryParams, QueryResults } from '@modules/core'
import { ReferralEntity } from '../entities/referral'

export interface IReferralRepository {
	get: (userId: string, query: QueryParams) => Promise<QueryResults<ReferralEntity>>
	listen: (userId: string, callback: (entities: ReferralEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
}
