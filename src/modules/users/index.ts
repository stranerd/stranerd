import { UserFirebaseDataSource } from './data/datasources/user-firebase'
import { RoleFirebaseDataSource } from './data/datasources/role-firebase'
import { NotificationFirebaseDataSource } from './data/datasources/notification-firebase'
import { ReviewFirebaseDataSource } from './data/datasources/review-firebase'
import { TransactionFirebaseDataSource } from './data/datasources/transaction-firebase'
import { UserTransformer } from './data/transformers/user'
import { NotificationTransformer } from './data/transformers/notification'
import { ReviewTransformer } from './data/transformers/review'
import { TransactionTransformer } from './data/transformers/transaction'
import { UserRepository } from './data/repositories/user'
import { RoleRepository } from './data/repositories/role'
import { NotificationRepository } from './data/repositories/notification'
import { ReviewRepository } from './data/repositories/review'
import { TransactionRepository } from './data/repositories/transaction'
import { FindUserUseCase } from './domain/usecases/users/findUser'
import { MakeAdminUseCase } from './domain/usecases/roles/makeAdmin'
import { RemoveAdminUseCase } from './domain/usecases/roles/removeAdmin'
import { GetUsersByEmailUseCase } from './domain/usecases/users/getUsersByEmail'
import { GetAllAdminsUseCase } from './domain/usecases/users/getAllAdmins'
import { GetAllSessionTutorsUseCase } from './domain/usecases/users/getAllSessionTutors'
import { ListenToAllSessionTutorsUseCase } from './domain/usecases/users/listenToAllSessionTutors'
import { ListenToUserUseCase } from './domain/usecases/users/listenToUser'
import { UpdateStreakUseCase } from './domain/usecases/users/updateStreak'
import { GetNotificationsUseCase } from './domain/usecases/notifications/getNotifications'
import { ListenToNotificationsUseCase } from './domain/usecases/notifications/listenToNotifications'
import { MarkNotificationSeenUseCase } from './domain/usecases/notifications/markNotificationSeen'
import { GetReviewsUseCase } from './domain/usecases/reviews/getReviews'
import { ListenToReviewsUseCase } from './domain/usecases/reviews/listenToReviews'
import { GetTransactionsUseCase } from './domain/usecases/transactions/getTransactions'
import { GetOlderTransactionsUseCase } from './domain/usecases/transactions/getOlderTransactions'
import { generateDefaultBio, UserBio, UserEntity } from './domain/entities/user'
import { NotificationEntity } from './domain/entities/notification'
import { ReviewEntity } from './domain/entities/review'
import { TransactionEntity } from './domain/entities/transaction'

const userDataSource = new UserFirebaseDataSource()
const roleDataSource = new RoleFirebaseDataSource()
const notificationDataSource = new NotificationFirebaseDataSource()
const reviewDataSource = new ReviewFirebaseDataSource()
const transactionDataSource = new TransactionFirebaseDataSource()

const userTransformer = new UserTransformer()
const notificationTransformer = new NotificationTransformer()
const reviewTransformer = new ReviewTransformer()
const transactionTransformer = new TransactionTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)
const roleRepository = new RoleRepository(roleDataSource)
const notificationRepository = new NotificationRepository(notificationDataSource, notificationTransformer)
const reviewRepository = new ReviewRepository(reviewDataSource, reviewTransformer)
const transactionRepository = new TransactionRepository(transactionDataSource, transactionTransformer)

export const FindUser = new FindUserUseCase(userRepository)
export const GetUsersByEmail = new GetUsersByEmailUseCase(userRepository)
export const GetAllAdmins = new GetAllAdminsUseCase(userRepository)
export const GetAllSessionTutors = new GetAllSessionTutorsUseCase(userRepository)
export const ListenToAllSessionTutors = new ListenToAllSessionTutorsUseCase(userRepository)
export const ListenToUser = new ListenToUserUseCase(userRepository)
export const UpdateStreak = new UpdateStreakUseCase(userRepository)

export const MakeAdmin = new MakeAdminUseCase(roleRepository)
export const RemoveAdmin = new RemoveAdminUseCase(roleRepository)

export const GetNotifications = new GetNotificationsUseCase(notificationRepository)
export const ListenToNotifications = new ListenToNotificationsUseCase(notificationRepository)
export const MarkNotificationSeen = new MarkNotificationSeenUseCase(notificationRepository)

export const GetReviews = new GetReviewsUseCase(reviewRepository)
export const ListenToReviews = new ListenToReviewsUseCase(reviewRepository)

export const GetTransactions = new GetTransactionsUseCase(transactionRepository)
export const GetOlderTransactions = new GetOlderTransactionsUseCase(transactionRepository)

export { UserEntity, generateDefaultBio, NotificationEntity, ReviewEntity, TransactionEntity }
export type { UserBio }
