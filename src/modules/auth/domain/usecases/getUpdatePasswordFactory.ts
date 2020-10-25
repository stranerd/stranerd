import { UpdatePasswordFactory } from '../factories/updatePassword'

export class GetUpdatePasswordFactoryUseCase {
	call () {
		return new UpdatePasswordFactory()
	}
}
