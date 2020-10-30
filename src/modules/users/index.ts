import { UserFirebaseDataSource } from './data/datasources/user-firebase'
import { RoleFirebaseDataSource } from './data/datasources/role-firebase'
import { TutorFirebaseDataSource } from './data/datasources/tutor-firebase'
import { UserTransformer } from './data/transformers/user'
import { TutorTransformer } from './data/transformers/tutor'
import { UserRepository } from './data/repositories/user'
import { RoleRepository } from './data/repositories/role'
import { TutorRepository } from './data/repositories/tutor'
import { FindUserUseCase } from './domain/usecases/findUser'
import { MakeAdminUseCase } from './domain/usecases/makeAdmin'
import { RemoveAdminUseCase } from './domain/usecases/removeAdmin'
import { SubscribeToMailingListUseCase } from './domain/usecases/subscribeToMailingList'
import { GetMailingListFactoryUseCase } from './domain/usecases/getMailingListFactory'
import { GetUsersByEmailUseCase } from './domain/usecases/getUsersByEmail'
import { GetAllAdminsUseCase } from './domain/usecases/getAllAdmins'
import { FindTutorUseCase } from './domain/usecases/findTutor'
import { GetTutorsUseCase } from './domain/usecases/getTutors'
import { MakeTutorUseCase } from './domain/usecases/makeTutor'

const userDataSource = new UserFirebaseDataSource()
const roleDataSource = new RoleFirebaseDataSource()
const tutorDataSource = new TutorFirebaseDataSource()

const userTransformer = new UserTransformer()
const tutorTransformer = new TutorTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)
const roleRepository = new RoleRepository(roleDataSource)
const tutorRepository = new TutorRepository(tutorDataSource, tutorTransformer)

export const FindUser = new FindUserUseCase(userRepository)
export const GetUsersByEmail = new GetUsersByEmailUseCase(userRepository)
export const GetAllAdmins = new GetAllAdminsUseCase(userRepository)

export const MakeAdmin = new MakeAdminUseCase(roleRepository)
export const RemoveAdmin = new RemoveAdminUseCase(roleRepository)
export const SubscribeToMailingList = new SubscribeToMailingListUseCase(roleRepository)
export const GetMailingListFactory = new GetMailingListFactoryUseCase()

export const FindTutor = new FindTutorUseCase(tutorRepository)
export const GetTutors = new GetTutorsUseCase(tutorRepository)
export const MakeTutor = new MakeTutorUseCase(tutorRepository)
