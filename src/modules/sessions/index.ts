import { PersonalChatFirebaseDataSource } from './data/datasources/personal-chat-firebase'
import { SessionFirebaseDataSource } from './data/datasources/session-firebase'
import { ChatTransformer } from './data/transformers/chat'
import { SessionTransformer } from './data/transformers/session'
import { ChatRepository } from './data/repositories/chat'
import { SessionRepository } from './data/repositories/session'
import { GetChatsUseCase } from './domain/usecases/chats/getChats'
import { AddChatUseCase } from './domain/usecases/chats/addChat'
import { ListenToChatsUseCase } from './domain/usecases/chats/listenToChats'
import { GetUserLastChatUseCase } from './domain/usecases/chats/getUserLastChat'
import { ListenToUserLastChatUseCase } from './domain/usecases/chats/listenToUserLastChat'
import { ListenToSessionUseCase } from './domain/usecases/sessions/listenToSession'
import { AddSessionUseCase } from './domain/usecases/sessions/addSession'
import { BeginSessionUseCase } from './domain/usecases/sessions/beginSession'
import { CancelSessionUseCase } from './domain/usecases/sessions/cancelSession'
import { ChatEntity } from './domain/entities/chat'
import { ChatFactory } from './domain/factories/chat'
import { SessionEntity } from './domain/entities/session'
import { SessionFactory } from './domain/factories/session'
import { CancelSessionFactory } from './domain/factories/cancelSession'

const personalChatDataSource = new PersonalChatFirebaseDataSource()
const sessionDataSource = new SessionFirebaseDataSource()

const chatTransformer = new ChatTransformer()
const sessionTransformer = new SessionTransformer()

const personalChatRepository = new ChatRepository(personalChatDataSource, chatTransformer)
const sessionRepository = new SessionRepository(sessionDataSource, sessionTransformer)

export const GetPersonalChats = new GetChatsUseCase(personalChatRepository)
export const ListenToPersonalChats = new ListenToChatsUseCase(personalChatRepository)
export const AddPersonalChat = new AddChatUseCase(personalChatRepository)
export const GetUserLastChat = new GetUserLastChatUseCase(personalChatRepository)
export const ListenToUserLastChat = new ListenToUserLastChatUseCase(personalChatRepository)

export const ListenToSession = new ListenToSessionUseCase(sessionRepository)
export const AddSession = new AddSessionUseCase(sessionRepository)
export const BeginSession = new BeginSessionUseCase(sessionRepository)
export const CancelSession = new CancelSessionUseCase(sessionRepository)

export { ChatEntity, ChatFactory }
export { SessionEntity, SessionFactory, CancelSessionFactory }
