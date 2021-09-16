import { DatabaseGetClauses, QueryParams } from '@modules/core'
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
		else return null
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listen (id: string, callback: (entity: UserEntity | null) => void, updateStatus = false) {
		const cb = (model: UserFromModel | null) => {
			const user = model ? this.transformer.fromJSON(model) : null
			callback(user)
		}
		return this.dataSource.listen(id, cb, updateStatus)
	}

	async listenToMany (callback: (entities: UserEntity[]) => void, conditions?: DatabaseGetClauses) {
		const cb = (models: UserFromModel[]) => {
			callback(models.map(this.transformer.fromJSON))
		}
		return this.dataSource.listenToMany(cb, conditions)
	}

	async updateStreak () {
		return this.dataSource.updateStreak()
	}
}
