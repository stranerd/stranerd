import { DatabaseGetClauses, DatabaseService, QueryParams } from '@modules/core'
import { TagFromModel } from '../models/tag'
import { TagBaseDataSource } from './tag-base'

export class TagFirebaseDataSource implements TagBaseDataSource {
	// @ts-ignore
	async get (query: QueryParams) {
		// @ts-ignore
		return await DatabaseService.getMany<TagFromModel>('tags', query)
	}

	async listen (callback: (documents: TagFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<TagFromModel>('tags', callback, conditions)
	}
}
