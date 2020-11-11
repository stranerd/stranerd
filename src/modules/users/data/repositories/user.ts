import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IUserRepository } from '../../domain/irepositories/iuser'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserTransformer } from '../transformers/user'
import { UserFromModel } from '../models/user'
import { UserEntity } from '../../domain/entities/user'

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

	async get (conditions?: DatabaseGetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model) => this.transformer.fromJSON(model))
	}

	async listen (id: string, callback: (entity: UserEntity | null) => void) {
		const cb = (model: UserFromModel | null) => {
			const user = model ? this.transformer.fromJSON(model) : null
			callback(user)
		}
		return this.dataSource.listen(id, cb)
	}
}
