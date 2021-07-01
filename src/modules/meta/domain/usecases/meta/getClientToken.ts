import { IMetaRepository } from '../../irepositories/imeta'

export class GetClientTokenUseCase {
	private readonly repository: IMetaRepository

	constructor (repository: IMetaRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.getClientToken()
	}
}
