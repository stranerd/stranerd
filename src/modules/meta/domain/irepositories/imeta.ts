import { QueryResults } from '@modules/core'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import { UserEntity } from '@modules/users'

export abstract class IMetaRepository {
	abstract buyCoinsWithStripe: (data: { amount: number, currency: string, gold: number, bronze: number }) => Promise<{ id: string, clientSecret: string }>
	abstract verifyStripePayment: (data: { intentId: string }) => Promise<boolean>
	abstract makeStripePayment: (amount: number, currency: string) => Promise<string>
	abstract buyCoins: (amount: number, isGold: boolean) => Promise<void>
	abstract search: (searchParam: string) => Promise<{
		questions: QueryResults<QuestionEntity>
		answers: QueryResults<AnswerEntity>
		users: QueryResults<UserEntity>
	}>
}
