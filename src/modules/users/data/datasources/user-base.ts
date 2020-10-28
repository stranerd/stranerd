import { UserFromModel } from '../models/user'

export abstract class UserBaseDataSource {
	public abstract find: (id: string) => Promise<UserFromModel | undefined>
}
