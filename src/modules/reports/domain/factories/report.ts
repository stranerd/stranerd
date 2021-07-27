import { BaseFactory } from '@modules/core'
import { isLongerThan } from 'sd-validate/lib/rules'
import { UserBio } from '@modules/users'
import { ReportToModel } from '../../data/models/report'
import { ReportEntity } from '../entities/report'

type Keys<ReportType> = {
	reporterId: string, reportedId: string,
	reporterBio: UserBio | undefined, reported: ReportType | undefined,
	message: string
}

export class ReportFactory<ReportType extends { userId: string }> extends BaseFactory<ReportEntity<ReportType>, ReportToModel<ReportType>, Keys<ReportType>> {
	public rules = {
		reporterId: { required: true, rules: [] },
		reportedId: { required: true, rules: [] },
		reporterBio: { required: true, rules: [] },
		reported: { required: true, rules: [] },
		message: { required: true, rules: [(value: string) => isLongerThan(value, 0)] }
	}

	constructor () {
		super({ reporterId: '', reportedId: '', reporterBio: undefined, reported: undefined, message: '' })
	}

	reserved = []

	get message () { return this.values.message }
	set message (value: string) { this.set('message', value) }
	set reporterBioAndId (value: { id: string, bio: UserBio }) {
		this.set('reporterId', value.id)
		this.set('reporterBio', value.bio)
	}

	set reported (value: { id: string, reported: ReportType }) {
		this.set('reportedId', value.id)
		this.set('reported', value.reported)
	}

	public toModel = async () => {
		if (this.valid) {
			const { reporterId, reportedId, reporterBio, reported, message } = this.validValues
			return { reporterId, reportedId, reporterBio: reporterBio!, reported: reported!, message }
		} else {
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: ReportEntity<ReportType>) => {
		this.reporterBioAndId = {
			id: entity.reporterId,
			bio: entity.reporterBio
		}
		this.reported = {
			id: entity.reportedId,
			reported: entity.reported
		}
		this.message = entity.message
	}
}
