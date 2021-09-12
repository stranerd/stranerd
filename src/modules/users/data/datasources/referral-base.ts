import { DatabaseGetClauses } from '@modules/core'
import { ReferralFromModel } from '../models/referral'

export abstract class ReferralBaseDataSource {
	abstract get: (user: string, condition?: DatabaseGetClauses) => Promise<ReferralFromModel[]>
	abstract listen: (user: string, callback: (documents: ReferralFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
}
