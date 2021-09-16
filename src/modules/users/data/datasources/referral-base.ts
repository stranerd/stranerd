import { DatabaseGetClauses, QueryParams, QueryResults } from '@modules/core'
import { ReferralFromModel } from '../models/referral'

export abstract class ReferralBaseDataSource {
	abstract get: (user: string, query: QueryParams) => Promise<QueryResults<ReferralFromModel>>
	abstract listen: (user: string, callback: (documents: ReferralFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
}
