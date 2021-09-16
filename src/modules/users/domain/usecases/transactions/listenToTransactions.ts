import { Listeners } from '@modules/core'
import { ITransactionRepository } from '../../irepositories/itransaction'
import { TransactionEntity } from '../../entities/transaction'

export class ListenToTransactionsUseCase {
	private repository: ITransactionRepository

	constructor (repository: ITransactionRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<TransactionEntity>) {
		return await this.repository.listenToMany(userId, listener)
	}
}
