import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { TagFromModel } from '../models/tag'
import { TagBaseDataSource } from './tag-base'

export class TagApiDataSource implements TagBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async listen (listener: Listeners<TagFromModel>) {
		return listenOnSocket('tags', listener)
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<TagFromModel>>('/tags', query)
	}

	async listenToOne (id: string, listener: Listeners<TagFromModel>) {
		return listenOnSocket(`tags/${id}`, listener)
	}

	async listenToMany (listener: Listeners<TagFromModel>) {
		return listenOnSocket('tags', listener)
	}
}
