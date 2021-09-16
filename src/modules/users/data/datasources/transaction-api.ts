import { HttpClient, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { TransactionFromModel } from '../models/transaction'
import { TransactionBaseDataSource } from './transaction-base'

export class TransactionApiDataSource implements TransactionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async get (_: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<TransactionFromModel>>('/transactions', query)
	}
}
