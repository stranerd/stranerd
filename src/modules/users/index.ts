import { UserFirebaseDataSource } from './data/datasources/user-firebase'
import { RoleFirebaseDataSource } from './data/datasources/role-firebase'
import { NotificationFirebaseDataSource } from './data/datasources/notification-firebase'
import { UserTransformer } from './data/transformers/user'
import { NotificationTransformer } from './data/transformers/notification'
import { UserRepository } from './data/repositories/user'
import { RoleRepository } from './data/repositories/role'
import { NotificationRepository } from './data/repositories/notification'
import { FindUserUseCase } from './domain/usecases/users/findUser'
import { MakeAdminUseCase } from './domain/usecases/roles/makeAdmin'
import { RemoveAdminUseCase } from './domain/usecases/roles/removeAdmin'
import { SubscribeToMailingListUseCase } from './domain/usecases/roles/subscribeToMailingList'
import { GetUsersByEmailUseCase } from './domain/usecases/users/getUsersByEmail'
import { GetAllAdminsUseCase } from './domain/usecases/users/getAllAdmins'
import { GetAllTutorsUseCase } from './domain/usecases/users/getAllTutors'
import { ListenToTutorsUseCase } from './domain/usecases/users/listenToTutors'
import { ListenToUserUseCase } from './domain/usecases/users/listenToUser'
import { UpdateStreakUseCase } from './domain/usecases/users/updateStreak'
import { GetTopRankingUsersUseCase } from './domain/usecases/rankings/getTopRankingUsers'
import { ListenToTopRankingUsersUseCase } from './domain/usecases/rankings/listenToTopRankingUsers'
import { GetNotificationsUseCase } from './domain/usecases/notifications/getNotifications'
import { ListenToNotificationsUseCase } from './domain/usecases/notifications/listenToNotifications'
import { MarkNotificationSeenUseCase } from './domain/usecases/notifications/markNotificationSeen'
import { UserEntity, UserBio, generateDefaultBio, RankingPeriods } from './domain/entities/user'
import { Avatar, Avatars } from './domain/entities/avatar'
import { NotificationEntity } from './domain/entities/notification'
import { MailingListFactory } from './domain/factories/mailingList'

const userDataSource = new UserFirebaseDataSource()
const roleDataSource = new RoleFirebaseDataSource()
const notificationDataSource = new NotificationFirebaseDataSource()

const userTransformer = new UserTransformer()
const notificationTransformer = new NotificationTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)
const roleRepository = new RoleRepository(roleDataSource)
const notificationRepository = new NotificationRepository(notificationDataSource, notificationTransformer)

export const FindUser = new FindUserUseCase(userRepository)
export const GetUsersByEmail = new GetUsersByEmailUseCase(userRepository)
export const GetAllAdmins = new GetAllAdminsUseCase(userRepository)
export const GetAllTutors = new GetAllTutorsUseCase(userRepository)
export const ListenToTutors = new ListenToTutorsUseCase(userRepository)
export const ListenToUser = new ListenToUserUseCase(userRepository)
export const UpdateStreak = new UpdateStreakUseCase(userRepository)

export const MakeAdmin = new MakeAdminUseCase(roleRepository)
export const RemoveAdmin = new RemoveAdminUseCase(roleRepository)
export const SubscribeToMailingList = new SubscribeToMailingListUseCase(roleRepository)

export const GetTopRankingUsers = new GetTopRankingUsersUseCase(userRepository)
export const ListenToTopRankingUsers = new ListenToTopRankingUsersUseCase(userRepository)

export const GetNotifications = new GetNotificationsUseCase(notificationRepository)
export const ListenToNotifications = new ListenToNotificationsUseCase(notificationRepository)
export const MarkNotificationSeen = new MarkNotificationSeenUseCase(notificationRepository)

export { UserEntity, generateDefaultBio, RankingPeriods, NotificationEntity, Avatars }
export { MailingListFactory }
export type { UserBio, Avatar }
