import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { TagFromModel } from '../models/tag'
import { TagBaseDataSource } from './tag-base'

export class TagFirebaseDataSource implements TagBaseDataSource {
	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<TagFromModel>('tags', conditions)
	}

	async listen (callback: (documents: TagFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<TagFromModel>('tags', callback, conditions)
	}
}
