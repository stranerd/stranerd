import { isLongerThan, isMoreThan } from 'sd-validate/lib/rules'
import { ChallengeEntity, ChallengeTypes } from '../entities/challenge'
import { ChallengeFactory } from './challenge'

interface Keys { description: string, reward: number, count: number, time: number, subjectId: string }
const isLongerThan2 = (value: string) => isLongerThan(value, 2)
const isMoreThan0 = (value: number) => isMoreThan(value, 0)

export class AnswerChallengeFactory extends ChallengeFactory<Keys> {
	readonly rules = {
		description: { required: true, rules: [isLongerThan2] },
		reward: { required: true, rules: [isMoreThan0] },
		count: { required: true, rules: [isMoreThan0] },
		time: { required: true, rules: [isMoreThan0] },
		subjectId: { required: true, rules: [] }
	}

	constructor () {
		super({
			description: '', reward: 0, count: 0,
			time: 0, subjectId: ''
		})
	}

	reserved = []

	get description () { return this.values.description }
	set description (value: string) { this.set('description', value) }
	get reward () { return this.values.reward }
	set reward (value: number) { this.set('reward', value) }
	get count () { return this.values.count }
	set count (value: number) { this.set('count', value) }
	get time () { return this.values.time }
	set time (value: number) { this.set('time', value) }
	get subjectId () { return this.values.subjectId }
	set subjectId (value: string) { this.set('subjectId', value) }

	loadEntity = (entity: ChallengeEntity) => {
		this.description = entity.description
		this.reward = entity.reward
		this.count = entity.count
		this.time = entity.time
		this.subjectId = entity.props.subjectId
	}

	toModel = async () => {
		if (this.valid) {
			const { description, reward, count, time, subjectId } = this.validValues
			return {
				type: ChallengeTypes.answers,
				description, reward, time, count,
				meta: { subjectId }
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
