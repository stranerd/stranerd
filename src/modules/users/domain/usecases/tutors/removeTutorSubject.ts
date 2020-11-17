import firebase from 'firebase'
import { ITutorRepository } from '../../irepositories/itutor'

export class RemoveTutorSubjectUseCase {
	private repository: ITutorRepository

	constructor (repository: ITutorRepository) {
		this.repository = repository
	}

	async call (id: string, subject: string) {
		return await this.repository.update(id, {
			subjects: {
				[subject]: firebase.firestore.FieldValue.delete() as any
			}
		})
	}
}
