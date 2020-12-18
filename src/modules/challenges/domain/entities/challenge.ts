import { BaseEntity } from '@modules/core/domains/entities/base'

export enum ChallengeTypes {
	answers = 'answers'
}

export class ChallengeEntity extends BaseEntity {
	public readonly id: string
	public readonly type: ChallengeTypes
	public readonly description: string
	public readonly reward: number
	public readonly count: number
	public readonly time: number
	public readonly meta: Record<string, any>
	public readonly createdAt: string

	constructor ({ id, type, description, reward, count, time, meta, createdAt }: ChallengeConstructorArgs) {
		super()
		this.id = id
		this.type = type as ChallengeTypes
		this.description = description
		this.reward = reward
		this.count = count
		this.time = time
		this.meta = meta
		this.createdAt = createdAt
	}

	get props () {
		if (this.type === ChallengeTypes.answers) return { subjectId: this.meta?.subjectId ?? '' }
		return this.meta
	}

	get clone () :ChallengeClone {
		const { type, description, reward, count, time, meta } = this
		return { type, description, reward, count, time, meta }
	}
}

type ChallengeConstructorArgs = ChallengeClone & {
	id: string,
	createdAt: string
}

export type ChallengeClone = {
	type: string,
	description: string,
	reward: number,
	count: number,
	time: number,
	meta: Record<string, any>
}
