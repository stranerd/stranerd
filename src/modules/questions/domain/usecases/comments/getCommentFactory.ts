import { CommentFactory } from '../../factories/comment'

export class GetCommentFactoryUseCase {
	call (): CommentFactory {
		return new CommentFactory()
	}
}
