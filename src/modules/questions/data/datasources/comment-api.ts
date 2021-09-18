import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentBaseDataSource } from './comment-base'

export class CommentApiDataSource implements CommentBaseDataSource {
	private readonly stranerdClient: HttpClient
	private readonly path: string

	constructor (path: string) {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
		this.path = path
	}

	async create (data: CommentToModel) {
		const comment = await this.stranerdClient.post<CommentToModel, CommentFromModel>(`/${this.path}`, data)
		return comment.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, CommentFromModel>(`/${this.path}/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<CommentFromModel>>(`${this.path}`, query)
	}

	async update (id: string, data: CommentToModel) {
		await this.stranerdClient.put<CommentToModel, CommentFromModel>(`/${this.path}/${id}`, data)
	}

	async listenToOne (id: string, listener: Listeners<CommentFromModel>) {
		return listenOnSocket(`${this.path}/${id}`, listener)
	}

	async listenToMany (listener: Listeners<CommentFromModel>) {
		return listenOnSocket(`${this.path}`, listener)
	}
}
