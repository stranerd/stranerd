import { TransactionFirebaseDataSource } from './data/datasources/transaction-firebase'
import { TransactionTransformer } from './data/transformers/transaction'
import { TransactionRepository } from './data/repositories/transaction'
import { GetTransactionsUseCase } from './domain/usecases/transactions/getTransactions'

const transactionDataSource = new TransactionFirebaseDataSource()

const transactionTransformer = new TransactionTransformer()

const transactionRepository = new TransactionRepository(transactionDataSource, transactionTransformer)

export const GetTransactions = new GetTransactionsUseCase(transactionRepository)
