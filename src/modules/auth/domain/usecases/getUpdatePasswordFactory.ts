import { UpdatePasswordFactory } from '../factories/updatePassword'

export class GetUpdatePasswordFactoryUseCase {
	call = () => new UpdatePasswordFactory()
}
