import { TransactionFirebaseDataSource } from './data/datasources/transaction-firebase'
import { MetaFirebaseDataSource } from './data/datasources/meta-firebase'
import { TransactionTransformer } from './data/transformers/transaction'
import { TransactionRepository } from './data/repositories/transaction'
import { MetaRepository } from './data/repositories/meta'
import { GetTransactionsUseCase } from './domain/usecases/transactions/getTransactions'
import { GetOlderTransactionsUseCase } from './domain/usecases/transactions/getOlderTransactions'
import { MakeStripePaymentUseCase } from './domain/usecases/meta/makeStripePayment'
import { BuyCoinsUseCase } from './domain/usecases/meta/buyCoins'
import { TipTutorUseCase } from './domain/usecases/meta/tipTutor'
import { RateTutorUseCase } from './domain/usecases/meta/rateTutor'
import { TransactionEntity } from './domain/entities/transaction'

const transactionDataSource = new TransactionFirebaseDataSource()
const metaDataSource = new MetaFirebaseDataSource()

const transactionTransformer = new TransactionTransformer()

const transactionRepository = new TransactionRepository(transactionDataSource, transactionTransformer)
const metaRepository = new MetaRepository(metaDataSource)

export const GetTransactions = new GetTransactionsUseCase(transactionRepository)
export const GetOlderTransactions = new GetOlderTransactionsUseCase(transactionRepository)

export const MakeStripePayment = new MakeStripePaymentUseCase(metaRepository)
export const BuyCoins = new BuyCoinsUseCase(metaRepository)
export const TipTutor = new TipTutorUseCase(metaRepository)
export const RateTutor = new RateTutorUseCase(metaRepository)

export { TransactionEntity }
