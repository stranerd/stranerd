import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isImage } from 'sd-validate/lib/rules'
import { Media } from '@modules/core/data/models/base'
import { UserBio } from '@modules/users'
import { TutorApplicationEntity } from '../entities/tutorApplication'
import { TutorApplicationToModel } from '../../data/models/tutorApplication'

type Content = File | Media
type Keys = {
	course: string, proof: Content | undefined, about: string, description: string, subjectId: string,
	userId: string, userBio: UserBio | undefined
}

export class TutorApplicationFactory extends BaseFactory<TutorApplicationEntity, TutorApplicationToModel, Keys> {
	public readonly rules = {
		course: { required: true, rules: [(val: string) => isLongerThan(val, 3)] },
		proof: { required: true, rules: [isImage] },
		about: { required: true, rules: [(val: string) => isLongerThan(val, 3)] },
		description: { required: true, rules: [(val: string) => isLongerThan(val, 3)] },
		subjectId: { required: true, rules: [] },
		userId: { required: true, rules: [] },
		userBio: { required: true, rules: [] }
	}

	constructor () {
		super({
			course: '', proof: undefined, about: '', description: '', subjectId: '',
			userId: '', userBio: undefined
		})
	}

	reserved = []

	get course () { return this.values.course }
	set course (value: string) { this.set('course', value) }
	get about () { return this.values.about }
	set about (value: string) { this.set('about', value) }
	get description () { return this.values.description }
	set description (value: string) { this.set('description', value) }
	get subjectId () { return this.values.subjectId }
	set subjectId (value: string) { this.set('subjectId', value) }
	get proof () { return this.values.proof! }
	set proof (file: Content) { this.set('proof', file) }
	set userBioAndId (value: { id: string, bio: UserBio }) {
		this.set('userId', value.id)
		this.set('userBio', value.bio)
	}

	public toModel = async () => {
		if (this.valid) {
			if (this.proof instanceof File) this.proof = await this.uploadFile('tutorApplications', this.proof)
			const { course, about, description, subjectId, proof, userBio, userId } = this.validValues
			return { course, about, description, subjectId, proof: proof as Media, userBio: userBio!, userId }
		} else throw new Error('Validation errors')
	}

	public loadEntity = (entity: TutorApplicationEntity) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
