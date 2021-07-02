import { IMetaRepository } from '../../irepositories/imeta'

export class TipTutorUseCase {
	private readonly repository: IMetaRepository

	constructor (repository: IMetaRepository) {
		this.repository = repository
	}

	async call (amount: number, tutorId: string) {
		return await this.repository.tipTutor(amount, tutorId)
	}
}
