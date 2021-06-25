import { TransactionFirebaseDataSource } from './data/datasources/transaction-firebase'
import { PaymentFirebaseDataSource } from './data/datasources/payment-firebase'
import { TransactionTransformer } from './data/transformers/transaction'
import { TransactionRepository } from './data/repositories/transaction'
import { PaymentRepository } from './data/repositories/payment'
import { GetTransactionsUseCase } from './domain/usecases/transactions/getTransactions'
import { GetOlderTransactionsUseCase } from './domain/usecases/transactions/getOlderTransactions'
import { GetClientTokenUseCase } from './domain/usecases/payment/getClientToken'
import { MakePaymentUseCase } from './domain/usecases/payment/makePayment'
import { BuyCoinsUseCase } from './domain/usecases/payment/buyCoins'
import { TipTutorUseCase } from './domain/usecases/payment/tipTutor'
import { TransactionEntity } from './domain/entities/transaction'

const transactionDataSource = new TransactionFirebaseDataSource()
const paymentDataSource = new PaymentFirebaseDataSource()

const transactionTransformer = new TransactionTransformer()

const transactionRepository = new TransactionRepository(transactionDataSource, transactionTransformer)
const paymentRepository = new PaymentRepository(paymentDataSource)

export const GetTransactions = new GetTransactionsUseCase(transactionRepository)
export const GetOlderTransactions = new GetOlderTransactionsUseCase(transactionRepository)

export const GetClientToken = new GetClientTokenUseCase(paymentRepository)
export const MakePayment = new MakePaymentUseCase(paymentRepository)
export const BuyCoins = new BuyCoinsUseCase(paymentRepository)
export const TipTutor = new TipTutorUseCase(paymentRepository)

export { TransactionEntity }
