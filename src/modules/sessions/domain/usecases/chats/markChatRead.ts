import { IChatRepository } from '../../irepositories/ichat'

export class MarkChatReadUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (sessionId: string, id: string) {
		return await this.repository.update(sessionId, id, { readAt: Date.now() })
	}
}
