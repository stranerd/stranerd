import { IMetaRepository } from '../../irepositories/imeta'

export class RateTutorUseCase {
	private readonly repository: IMetaRepository

	constructor (repository: IMetaRepository) {
		this.repository = repository
	}

	async call (tutorId: string, rating: number, review: string | undefined) {
		return await this.repository.rateTutor(tutorId, rating, review)
	}
}
