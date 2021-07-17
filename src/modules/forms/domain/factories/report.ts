import { BaseFactory } from '@modules/core'
import { isLongerThan } from 'sd-validate/lib/rules'
import { UserBio } from '@modules/users'
import { ReportToModel } from '../../data/models/report'
import { ReportEntity } from '../entities/report'

type Keys = {
	reporterId: string, reportedId: string,
	reporterBio: UserBio | undefined, reportedBio: UserBio | undefined,
	title: string, message: string
}

export class ReportFactory extends BaseFactory<ReportEntity, ReportToModel, Keys> {
	public rules = {
		reporterId: { required: true, rules: [] },
		reportedId: { required: true, rules: [] },
		reporterBio: { required: true, rules: [] },
		reportedBio: { required: true, rules: [] },
		title: { required: true, rules: [(value: string) => isLongerThan(value, 2)] },
		message: { required: true, rules: [(value: string) => isLongerThan(value, 0)] }
	}

	constructor () {
		super({ reporterId: '', reportedId: '', reporterBio: undefined, reportedBio: undefined, title: '', message: '' })
	}

	reserved = []

	get title () { return this.values.title }
	set title (value: string) { this.set('title', value) }
	get message () { return this.values.message }
	set message (value: string) { this.set('message', value) }
	set reporterBioAndId (value: { id: string, bio: UserBio }) {
		this.set('reporterId', value.id)
		this.set('reporterBio', value.bio)
	}

	set reportedBioAndId (value: { id: string, bio: UserBio }) {
		this.set('reportedId', value.id)
		this.set('reportedBio', value.bio)
	}

	public toModel = async () => {
		if (this.valid) {
			const { reporterId, reportedId, reporterBio, reportedBio, title, message } = this.validValues
			return { reporterId, reportedId, reporterBio: reporterBio!, reportedBio: reportedBio!, title, message }
		} else {
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: ReportEntity) => {
		this.reporterBioAndId = {
			id: entity.reporterId,
			bio: entity.reporterBio
		}
		this.reportedBioAndId = {
			id: entity.reportedId,
			bio: entity.reportedBio
		}
		this.title = entity.title
		this.message = entity.message
	}
}
