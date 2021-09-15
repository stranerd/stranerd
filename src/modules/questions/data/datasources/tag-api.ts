import { HttpClient, QueryParams, DatabaseService, DatabaseGetClauses } from '../../../core'
import { apiBases } from '../../../../utils/environment'
import { TagFromModel } from '../models/tag'
import { TagBaseDataSource } from './tag-base'

export class TagDataSource implements TagBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async listen (callback: (documents: TagFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<TagFromModel>('tags', callback, conditions)
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, any>('/tags', query)
	}
}
