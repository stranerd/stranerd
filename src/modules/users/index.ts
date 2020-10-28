import { UserFirebaseDataSource } from './data/datasources/user-firebase'
import { UserTransformer } from './data/transformers/user'
import { UserRepository } from './data/repositories/user'
import { FindUserUseCase } from './domain/usecases/findUser'

const userDataSource = new UserFirebaseDataSource()

const userTransformer = new UserTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)

export const FindUser = new FindUserUseCase(userRepository)
