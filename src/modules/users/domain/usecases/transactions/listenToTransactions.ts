import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { ITransactionRepository } from '../../irepositories/itransaction'
import { TransactionEntity } from '../../entities/transaction'

export class ListenToTransactionsUseCase {
	private repository: ITransactionRepository

	constructor (repository: ITransactionRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<TransactionEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(userId, conditions, listener, (entity) => {
			if (entity.userId !== userId) return false
			if (date) return entity.createdAt > date
			else return true
		})
	}
}
