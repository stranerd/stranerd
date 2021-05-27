import { Media } from '@modules/core/data/models/base'
import { UserBio, generateDefaultBio } from './user'

export class TutorApplicationEntity {
	public readonly id: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly course: string
	public readonly subjectId: string
	public readonly about: string
	public readonly description: string
	public readonly proof: Media
	public readonly createdAt: number

	constructor ({ id, userId, userBio, course, subjectId, about, description, proof, createdAt }: TutorApplicationConstructorArgs) {
		this.id = id
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.course = course
		this.subjectId = subjectId
		this.about = about
		this.description = description
		this.proof = proof
		this.createdAt = createdAt
	}
}

type TutorApplicationConstructorArgs = {
	id: string, userId: string, userBio: UserBio, course: string, subjectId: string, proof: Media
	about: string, description: string, createdAt: number
}
