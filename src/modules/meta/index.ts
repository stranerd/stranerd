import { MetaFirebaseDataSource } from './data/datasources/meta-firebase'
import { MetaRepository } from './data/repositories/meta'
import { MakeStripePaymentUseCase } from './domain/usecases/meta/makeStripePayment'
import { BuyCoinsUseCase } from './domain/usecases/meta/buyCoins'
import { TipTutorUseCase } from './domain/usecases/meta/tipTutor'
import { RateTutorUseCase } from './domain/usecases/meta/rateTutor'

const metaDataSource = new MetaFirebaseDataSource()

const metaRepository = new MetaRepository(metaDataSource)

export const MakeStripePayment = new MakeStripePaymentUseCase(metaRepository)
export const BuyCoins = new BuyCoinsUseCase(metaRepository)
export const TipTutor = new TipTutorUseCase(metaRepository)
export const RateTutor = new RateTutorUseCase(metaRepository)
