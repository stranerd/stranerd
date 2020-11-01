import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { IUserRepository } from '../../domain/irepositories/iuser'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserTransformer } from '../transformers/user'

export class UserRepository implements IUserRepository {
	private dataSource: UserBaseDataSource
	private transformer: UserTransformer

	constructor (dataSource: UserBaseDataSource, transformer: UserTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		if (model) return this.transformer.fromJSON(model)
		else return undefined
	}

	async get (conditions?: FirestoreGetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model) => this.transformer.fromJSON(model))
	}
}
