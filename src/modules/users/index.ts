import { UserFirebaseDataSource } from './data/datasources/user-firebase'
import { RoleFirebaseDataSource } from './data/datasources/role-firebase'
import { NotificationFirebaseDataSource } from './data/datasources/notification-firebase'
import { TutorApplicationFirebaseDataSource } from './data/datasources/tutorApplication-firebase'
import { UserTransformer } from './data/transformers/user'
import { NotificationTransformer } from './data/transformers/notification'
import { TutorApplicationTransformer } from './data/transformers/tutorApplication'
import { UserRepository } from './data/repositories/user'
import { RoleRepository } from './data/repositories/role'
import { NotificationRepository } from './data/repositories/notification'
import { TutorApplicationRepository } from './data/repositories/tutorApplication'
import { FindUserUseCase } from './domain/usecases/users/findUser'
import { MakeAdminUseCase } from './domain/usecases/roles/makeAdmin'
import { RemoveAdminUseCase } from './domain/usecases/roles/removeAdmin'
import { SubscribeToMailingListUseCase } from './domain/usecases/roles/subscribeToMailingList'
import { MakeTutorUseCase } from './domain/usecases/roles/makeTutor'
import { RemoveTutorUseCase } from './domain/usecases/roles/removeTutor'
import { GetUsersByEmailUseCase } from './domain/usecases/users/getUsersByEmail'
import { GetAllAdminsUseCase } from './domain/usecases/users/getAllAdmins'
import { GetAllTutorsUseCase } from './domain/usecases/users/getAllTutors'
import { ListenToTutorsUseCase } from './domain/usecases/users/listenToTutors'
import { ListenToUserUseCase } from './domain/usecases/users/listenToUser'
import { AddTutorSubjectUseCase } from './domain/usecases/users/addTutorSubject'
import { RemoveTutorSubjectUseCase } from './domain/usecases/users/removeTutorSubject'
import { UpdateStreakUseCase } from './domain/usecases/users/updateStreak'
import { GetTopRankingUsersUseCase } from './domain/usecases/rankings/getTopRankingUsers'
import { ListenToTopRankingUsersUseCase } from './domain/usecases/rankings/listenToTopRankingUsers'
import { GetNotificationsUseCase } from './domain/usecases/notifications/getNotifications'
import { ListenToNotificationsUseCase } from './domain/usecases/notifications/listenToNotifications'
import { MarkNotificationSeenUseCase } from './domain/usecases/notifications/markNotificationSeen'
import { AddTutorApplicationsUseCase } from './domain/usecases/tutorApplications/addTutorApplications'
import { GetTutorApplicationsUseCase } from './domain/usecases/tutorApplications/getTutorApplications'
import { ListenToTutorApplicationsUseCase } from './domain/usecases/tutorApplications/listenToTutorApplications'
import { ApproveTutorApplicationUseCase } from './domain/usecases/tutorApplications/approveTutorApplication'
import { UserEntity, UserBio, Status, generateDefaultBio, RankingPeriods } from './domain/entities/user'
import { Avatar, Avatars } from './domain/entities/avatar'
import { Achievements } from './domain/entities/achievement'
import { NotificationEntity } from './domain/entities/notification'
import { TutorApplicationEntity } from './domain/entities/tutorApplication'
import { TutorApplicationFactory } from './domain/factories/tutorApplication'
import { MailingListFactory } from './domain/factories/mailingList'

const userDataSource = new UserFirebaseDataSource()
const roleDataSource = new RoleFirebaseDataSource()
const notificationDataSource = new NotificationFirebaseDataSource()
const tutorApplicationDataSource = new TutorApplicationFirebaseDataSource()

const userTransformer = new UserTransformer()
const notificationTransformer = new NotificationTransformer()
const tutorApplicationTransformer = new TutorApplicationTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)
const roleRepository = new RoleRepository(roleDataSource)
const notificationRepository = new NotificationRepository(notificationDataSource, notificationTransformer)
const tutorApplicationRepository = new TutorApplicationRepository(tutorApplicationDataSource, tutorApplicationTransformer)

export const FindUser = new FindUserUseCase(userRepository)
export const GetUsersByEmail = new GetUsersByEmailUseCase(userRepository)
export const GetAllAdmins = new GetAllAdminsUseCase(userRepository)
export const GetAllTutors = new GetAllTutorsUseCase(userRepository)
export const ListenToTutors = new ListenToTutorsUseCase(userRepository)
export const ListenToUser = new ListenToUserUseCase(userRepository)
export const AddTutorSubject = new AddTutorSubjectUseCase(userRepository)
export const RemoveTutorSubject = new RemoveTutorSubjectUseCase(userRepository)
export const UpdateStreak = new UpdateStreakUseCase(userRepository)

export const MakeAdmin = new MakeAdminUseCase(roleRepository)
export const RemoveAdmin = new RemoveAdminUseCase(roleRepository)
export const MakeTutor = new MakeTutorUseCase(roleRepository)
export const RemoveTutor = new RemoveTutorUseCase(roleRepository)
export const SubscribeToMailingList = new SubscribeToMailingListUseCase(roleRepository)

export const GetTopRankingUsers = new GetTopRankingUsersUseCase(userRepository)
export const ListenToTopRankingUsers = new ListenToTopRankingUsersUseCase(userRepository)

export const GetNotifications = new GetNotificationsUseCase(notificationRepository)
export const ListenToNotifications = new ListenToNotificationsUseCase(notificationRepository)
export const MarkNotificationSeen = new MarkNotificationSeenUseCase(notificationRepository)

export const AddTutorApplications = new AddTutorApplicationsUseCase(tutorApplicationRepository)
export const GetTutorApplications = new GetTutorApplicationsUseCase(tutorApplicationRepository)
export const ListenToTutorApplications = new ListenToTutorApplicationsUseCase(tutorApplicationRepository)
export const ApproveTutorApplication = new ApproveTutorApplicationUseCase(tutorApplicationRepository)

export { UserEntity, generateDefaultBio, Status, RankingPeriods, NotificationEntity, Avatars, TutorApplicationEntity }
export { MailingListFactory, Achievements, TutorApplicationFactory }
export type { UserBio, Avatar }
