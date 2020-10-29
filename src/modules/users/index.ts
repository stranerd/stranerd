import { UserFirebaseDataSource } from './data/datasources/user-firebase'
import { RoleFirebaseDataSource } from './data/datasources/role-firebase'
import { UserTransformer } from './data/transformers/user'
import { UserRepository } from './data/repositories/user'
import { RoleRepository } from './data/repositories/role'
import { FindUserUseCase } from './domain/usecases/findUser'
import { MakeAdminUseCase } from './domain/usecases/makeAdmin'
import { RemoveAdminUseCase } from './domain/usecases/removeAdmin'
import { SubscribeToMailingListUseCase } from './domain/usecases/subscribeToMailingList'
import { GetMailingListFactoryUseCase } from './domain/usecases/getMailingListFactory'
import { GetUsersByEmailUseCase } from './domain/usecases/getUsersByEmail'

const userDataSource = new UserFirebaseDataSource()
const roleDataSource = new RoleFirebaseDataSource()

const userTransformer = new UserTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)
const roleRepository = new RoleRepository(roleDataSource)

export const FindUser = new FindUserUseCase(userRepository)
export const GetUsersByEmail = new GetUsersByEmailUseCase(userRepository)

export const MakeAdmin = new MakeAdminUseCase(roleRepository)
export const RemoveAdmin = new RemoveAdminUseCase(roleRepository)
export const SubscribeToMailingList = new SubscribeToMailingListUseCase(roleRepository)
export const GetMailingListFactory = new GetMailingListFactoryUseCase()
