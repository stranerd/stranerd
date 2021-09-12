import { MetaFirebaseDataSource } from './data/datasources/meta-firebase'
import { MessageFirebaseDataSource } from './data/datasources/message-firebase'
import { MetaRepository } from './data/repositories/meta'
import { MessageRepository } from './data/repositories/message'
import { MakeStripePaymentUseCase } from './domain/usecases/meta/makeStripePayment'
import { BuyCoinsUseCase } from './domain/usecases/meta/buyCoins'
import { TipTutorUseCase } from './domain/usecases/meta/tipTutor'
import { RateTutorUseCase } from './domain/usecases/meta/rateTutor'
import { AddMessageUseCase } from './domain/usecases/messages/addMessage'
import { MessageFactory } from './domain/factories/message'

const metaDataSource = new MetaFirebaseDataSource()
const messageDataSource = new MessageFirebaseDataSource()

const metaRepository = new MetaRepository(metaDataSource)

export const MakeStripePayment = new MakeStripePaymentUseCase(metaRepository)
export const BuyCoins = new BuyCoinsUseCase(metaRepository)
export const TipTutor = new TipTutorUseCase(metaRepository)
export const RateTutor = new RateTutorUseCase(metaRepository)

const messageRepository = new MessageRepository(messageDataSource)

export const AddMessage = new AddMessageUseCase(messageRepository)

export { MessageFactory }
