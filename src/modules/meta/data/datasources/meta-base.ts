import { QueryResults } from '@modules/core'
import { QuestionFromModel } from '@modules/questions/data/models/question'
import { AnswerFromModel } from '@modules/questions/data/models/answer'
import { UserFromModel } from '@modules/users/data/models/user'

export abstract class MetaBaseDataSource {
	abstract buyCoinsWithStripe: (data: { amount: number, currency: string, gold: number, bronze: number }) => Promise<{ id: string, clientSecret: string }>
	abstract verifyStripePayment: (data: { intentId: string }) => Promise<boolean>
	abstract makeStripePayment: (data: { amount: number, currency: string }) => Promise<string>
	abstract buyCoins: (data: { amount: number, isGold: boolean }) => Promise<void>
	abstract search: (searchParam: string) => Promise<{
		questions: QueryResults<QuestionFromModel>
		answers: QueryResults<AnswerFromModel>
		users: QueryResults<UserFromModel>
	}>
}
