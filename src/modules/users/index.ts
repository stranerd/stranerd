import { UserFirebaseDataSource } from './data/datasources/user-firebase'
import { RoleFirebaseDataSource } from './data/datasources/role-firebase'
import { TutorFirebaseDataSource } from './data/datasources/tutor-firebase'
import { NotificationFirebaseDataSource } from './data/datasources/notification-firebase'
import { UserTransformer } from './data/transformers/user'
import { TutorTransformer } from './data/transformers/tutor'
import { NotificationTransformer } from './data/transformers/notification'
import { UserRepository } from './data/repositories/user'
import { RoleRepository } from './data/repositories/role'
import { TutorRepository } from './data/repositories/tutor'
import { NotificationRepository } from './data/repositories/notification'
import { FindUserUseCase } from './domain/usecases/users/findUser'
import { MakeAdminUseCase } from './domain/usecases/roles/makeAdmin'
import { RemoveAdminUseCase } from './domain/usecases/roles/removeAdmin'
import { SubscribeToMailingListUseCase } from './domain/usecases/roles/subscribeToMailingList'
import { MakeTutorUseCase } from './domain/usecases/roles/makeTutor'
import { RemoveTutorUseCase } from './domain/usecases/roles/removeTutor'
import { GetUsersByEmailUseCase } from './domain/usecases/users/getUsersByEmail'
import { GetAllAdminsUseCase } from './domain/usecases/users/getAllAdmins'
import { ListenToUserUseCase } from './domain/usecases/users/listenToUser'
import { FindTutorUseCase } from './domain/usecases/tutors/findTutor'
import { GetTutorsUseCase } from './domain/usecases/tutors/getTutors'
import { AddTutorSubjectUseCase } from './domain/usecases/tutors/addTutorSubject'
import { RemoveTutorSubjectUseCase } from './domain/usecases/tutors/removeTutorSubject'
import { GetTopRankingUsersUseCase } from './domain/usecases/rankings/getTopRankingUsers'
import { ListenToTopRankingUsersUseCase } from './domain/usecases/rankings/listenToTopRankingUsers'
import { AddNotificationUseCase } from './domain/usecases/notifications/addNotification'
import { ListenToNotificationsUseCase } from './domain/usecases/notifications/listenToNotifications'
import { FindNotificationUseCase } from './domain/usecases/notifications/findNotification'
import { MarkNotificationSeenUseCase } from './domain/usecases/notifications/markNotificationSeen'
import { DeleteNotificationUseCase } from './domain/usecases/notifications/deleteNotification'
import { UserEntity, UserBio, Status, generateDefaultBio, RankingPeriods } from './domain/entities/user'
import { TutorEntity } from './domain/entities/tutor'
import { NotificationEntity } from './domain/entities/notification'
import { MailingListFactory } from './domain/factories/mailingList'

const userDataSource = new UserFirebaseDataSource()
const roleDataSource = new RoleFirebaseDataSource()
const tutorDataSource = new TutorFirebaseDataSource()
const notificationDataSource = new NotificationFirebaseDataSource()

const userTransformer = new UserTransformer()
const tutorTransformer = new TutorTransformer()
const notificationTransformer = new NotificationTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)
const roleRepository = new RoleRepository(roleDataSource)
const tutorRepository = new TutorRepository(tutorDataSource, tutorTransformer)
const notificationRepository = new NotificationRepository(notificationDataSource, notificationTransformer)

export const FindUser = new FindUserUseCase(userRepository)
export const GetUsersByEmail = new GetUsersByEmailUseCase(userRepository)
export const GetAllAdmins = new GetAllAdminsUseCase(userRepository)
export const ListenToUser = new ListenToUserUseCase(userRepository)

export const MakeAdmin = new MakeAdminUseCase(roleRepository)
export const RemoveAdmin = new RemoveAdminUseCase(roleRepository)
export const MakeTutor = new MakeTutorUseCase(roleRepository)
export const RemoveTutor = new RemoveTutorUseCase(roleRepository)
export const SubscribeToMailingList = new SubscribeToMailingListUseCase(roleRepository)

export const FindTutor = new FindTutorUseCase(tutorRepository)
export const GetTutors = new GetTutorsUseCase(tutorRepository)
export const AddTutorSubject = new AddTutorSubjectUseCase(tutorRepository)
export const RemoveTutorSubject = new RemoveTutorSubjectUseCase(tutorRepository)

export const GetTopRankingUsers = new GetTopRankingUsersUseCase(userRepository)
export const ListenToTopRankingUsers = new ListenToTopRankingUsersUseCase(userRepository)

export const AddNotification = new AddNotificationUseCase(notificationRepository)
export const FindNotification = new FindNotificationUseCase(notificationRepository)
export const ListenToNotifications = new ListenToNotificationsUseCase(notificationRepository)
export const MarkNotificationSeen = new MarkNotificationSeenUseCase(notificationRepository)
export const DeleteNotification = new DeleteNotificationUseCase(notificationRepository)

export { UserEntity, generateDefaultBio, TutorEntity, Status, RankingPeriods, NotificationEntity }
export { MailingListFactory }
export type { UserBio }
