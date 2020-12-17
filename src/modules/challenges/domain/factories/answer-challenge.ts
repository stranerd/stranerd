import { isLongerThan, isMoreThan } from 'sd-validate/lib/rules'
import { ChallengeEntity, ChallengeTypes } from '../entities/challenge'
import { ChallengeFactory } from './challenge'

interface Keys { description: string, reward: number, time: number, subjectId: string, quantity: number }
const isLongerThan2 = (value: string) => isLongerThan(value, 2)
const isMoreThan0 = (value: number) => isMoreThan(value, 2)

export class AnswerChallengeFactory extends ChallengeFactory<Keys> {
	readonly rules = {
		description: { required: true, rules: [isLongerThan2] },
		reward: { required: true, rules: [isMoreThan0] },
		time: { required: true, rules: [isMoreThan0] },
		subjectId: { required: true, rules: [] },
		quantity: { required: true, rules: [isMoreThan0] }
	}

	constructor () {
		super({
			description: '', reward: 0, time: 0,
			subjectId: '', quantity: 0
		})
	}

	reserved = []

	get description () { return this.values.description }
	set description (value: string) { this.set('description', value) }
	get reward () { return this.values.reward }
	set reward (value: number) { this.set('reward', value) }
	get time () { return this.values.time }
	set time (value: number) { this.set('time', value) }
	get subjectId () { return this.values.subjectId }
	set subjectId (value: string) { this.set('subjectId', value) }
	get quantity () { return this.values.quantity }
	set quantity (value: number) { this.set('quantity', value) }

	loadEntity = (entity: ChallengeEntity) => {
		this.description = entity.description
		this.reward = entity.reward
		this.time = entity.time
		this.subjectId = entity.props.subjectId
		this.quantity = entity.props.quantity
	}

	toModel = async () => {
		if (this.valid) {
			const { description, reward, time, subjectId, quantity } = this.validValues
			return {
				type: ChallengeTypes.answers,
				description, reward, time,
				meta: { subjectId, quantity }
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
