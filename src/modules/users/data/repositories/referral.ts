import { DatabaseGetClauses } from '@modules/core'
import { IReferralRepository } from '../../domain/irepositories/ireferral'
import { ReferralBaseDataSource } from '../datasources/referral-base'
import { ReferralTransformer } from '../transformers/referral'
import { ReferralFromModel } from '../models/referral'
import { ReferralEntity } from '../../domain/entities/referral'

export class ReferralRepository implements IReferralRepository {
	private dataSource: ReferralBaseDataSource
	private transformer: ReferralTransformer

	constructor (dataSource: ReferralBaseDataSource, transformer: ReferralTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (userId: string, conditions?: DatabaseGetClauses) {
		const models = await this.dataSource.get(userId, conditions)
		return models.map((model: ReferralFromModel) => this.transformer.fromJSON(model))
	}

	async listen (userId: string, callback: (entities: ReferralEntity[]) => void, conditions?: DatabaseGetClauses) {
		const listenCB = (documents: ReferralFromModel[]) => {
			const entities = documents.map(this.transformer.fromJSON)
			callback(entities)
		}
		return await this.dataSource.listen(userId, listenCB, conditions)
	}
}
