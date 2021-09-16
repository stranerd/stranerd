import { QuestionTransformer } from '@modules/questions/data/transformers/question'
import { AnswerTransformer } from '@modules/questions/data/transformers/answer'
import { UserTransformer } from '@modules/users/data/transformers/user'
import { IMetaRepository } from '../../domain/irepositories/imeta'
import { MetaBaseDataSource } from '../datasources/meta-base'

export class MetaRepository implements IMetaRepository {
	private readonly dataSource: MetaBaseDataSource

	constructor (dataSource: MetaBaseDataSource) {
		this.dataSource = dataSource
	}

	async makeStripePayment (amount: number, currency: string) {
		return await this.dataSource.makeStripePayment({ amount, currency })
	}

	async buyCoins (amount: number, isGold: boolean) {
		return await this.dataSource.buyCoins({ amount, isGold })
	}

	async search (search: string) {
		const questionTransformer = new QuestionTransformer()
		const answerTransformer = new AnswerTransformer()
		const userTransformer = new UserTransformer()
		const models = await this.dataSource.search(search)
		return {
			questions: {
				...models.questions,
				results: models.questions.results.map(questionTransformer.fromJSON)
			},
			answers: {
				...models.answers,
				results: models.answers.results.map(answerTransformer.fromJSON)
			},
			users: {
				...models.users,
				results: models.users.results.map(userTransformer.fromJSON)
			}
		}
	}

	async buyCoinsWithStripe (data: { amount: number; currency: string; gold: number; bronze: number }) {
		return await this.dataSource.buyCoinsWithStripe(data)
	}

	async verifyStripePayment (data: { intentId: string }) {
		return await this.dataSource.verifyStripePayment(data)
	}
}
