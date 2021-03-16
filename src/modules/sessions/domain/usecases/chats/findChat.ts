import { IChatRepository } from '../../irepositories/ichat'

export class FindChatUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (path: string, id: string) {
		return await this.repository.find(path, id)
	}
}
