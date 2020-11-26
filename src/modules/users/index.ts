import { UserFirebaseDataSource } from './data/datasources/user-firebase'
import { RoleFirebaseDataSource } from './data/datasources/role-firebase'
import { TutorFirebaseDataSource } from './data/datasources/tutor-firebase'
import { UserTransformer } from './data/transformers/user'
import { TutorTransformer } from './data/transformers/tutor'
import { UserRepository } from './data/repositories/user'
import { RoleRepository } from './data/repositories/role'
import { TutorRepository } from './data/repositories/tutor'
import { FindUserUseCase } from './domain/usecases/users/findUser'
import { MakeAdminUseCase } from './domain/usecases/roles/makeAdmin'
import { RemoveAdminUseCase } from './domain/usecases/roles/removeAdmin'
import { SubscribeToMailingListUseCase } from './domain/usecases/roles/subscribeToMailingList'
import { GetUsersByEmailUseCase } from './domain/usecases/users/getUsersByEmail'
import { GetAllAdminsUseCase } from './domain/usecases/users/getAllAdmins'
import { ListenToUserUseCase } from './domain/usecases/users/listenToUser'
import { FindTutorUseCase } from './domain/usecases/tutors/findTutor'
import { GetTutorsUseCase } from './domain/usecases/tutors/getTutors'
import { MakeTutorUseCase } from './domain/usecases/tutors/makeTutor'
import { RemoveTutorUseCase } from './domain/usecases/tutors/removeTutor'
import { AddTutorSubjectUseCase } from './domain/usecases/tutors/addTutorSubject'
import { RemoveTutorSubjectUseCase } from './domain/usecases/tutors/removeTutorSubject'
import { ListenToTopDailyUsersUseCase } from './domain/usecases/rankings/listenToTopDailyUsers'
import { ListenToTopWeeklyUsersUseCase } from './domain/usecases/rankings/listenToTopWeeklyUsers'
import { ListenToTopMonthlyUsersUseCase } from './domain/usecases/rankings/listenToTopMonthlyUsers'
import { ListenToTopQuarterlyUsersUseCase } from './domain/usecases/rankings/listenToTopQuarterlyUsers'
import { UserEntity, UserBio, generateDefaultBio } from './domain/entities/user'
import { TutorEntity } from './domain/entities/tutor'
import { MailingListFactory } from './domain/factories/mailingList'

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
export const ListenToUser = new ListenToUserUseCase(userRepository)

export const MakeAdmin = new MakeAdminUseCase(roleRepository)
export const RemoveAdmin = new RemoveAdminUseCase(roleRepository)
export const SubscribeToMailingList = new SubscribeToMailingListUseCase(roleRepository)

export const FindTutor = new FindTutorUseCase(tutorRepository)
export const GetTutors = new GetTutorsUseCase(tutorRepository)
export const MakeTutor = new MakeTutorUseCase(tutorRepository)
export const RemoveTutor = new RemoveTutorUseCase(tutorRepository)
export const AddTutorSubject = new AddTutorSubjectUseCase(tutorRepository)
export const RemoveTutorSubject = new RemoveTutorSubjectUseCase(tutorRepository)

export const ListenToTopDailyUsers = new ListenToTopDailyUsersUseCase(userRepository)
export const ListenToTopWeeklyUsers = new ListenToTopWeeklyUsersUseCase(userRepository)
export const ListenToTopMonthlyUsers = new ListenToTopMonthlyUsersUseCase(userRepository)
export const ListenToTopQuarterlyUsers = new ListenToTopQuarterlyUsersUseCase(userRepository)

export { UserEntity, generateDefaultBio, TutorEntity }
export { MailingListFactory }
export type { UserBio }
