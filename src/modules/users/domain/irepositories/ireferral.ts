import { DatabaseGetClauses } from '@modules/core'
import { ReferralEntity } from '../entities/referral'

export interface IReferralRepository {
	get: (userId: string, conditions?: DatabaseGetClauses) => Promise<ReferralEntity[]>
	listen: (userId: string, callback: (entities: ReferralEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
}
