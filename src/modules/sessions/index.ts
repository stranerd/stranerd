import { PersonalChatFirebaseDataSource } from './data/datasources/personal-chat-firebase'
import { SessionFirebaseDataSource } from './data/datasources/session-firebase'
import { ChatTransformer } from './data/transformers/chat'
import { SessionTransformer } from './data/transformers/session'
import { ChatRepository } from './data/repositories/chat'
import { SessionRepository } from './data/repositories/session'
import { GetChatsUseCase } from './domain/usecases/chats/getChats'
import { GetChatsMetaUseCase } from './domain/usecases/chats/getChatsMeta'
import { AddChatUseCase } from './domain/usecases/chats/addChat'
import { MarkChatReadUseCase } from './domain/usecases/chats/markChatRead'
import { ListenToChatsUseCase } from './domain/usecases/chats/listenToChats'
import { ListenToChatsMetaUseCase } from './domain/usecases/chats/listenToChatsMeta'
import { ListenToSessionUseCase } from './domain/usecases/sessions/listenToSession'
import { ListenToSessionsUseCase } from './domain/usecases/sessions/listenToSessions'
import { GetSessionUseCase } from './domain/usecases/sessions/getSession'
import { GetSessionsUseCase } from './domain/usecases/sessions/getSessions'
import { AddSessionUseCase } from './domain/usecases/sessions/addSession'
import { BeginSessionUseCase } from './domain/usecases/sessions/beginSession'
import { CancelSessionUseCase } from './domain/usecases/sessions/cancelSession'
import { ChatEntity } from './domain/entities/chat'
import { ChatMetaEntity } from './domain/entities/chatMeta'
import { ChatFactory } from './domain/factories/chat'
import { SessionEntity } from './domain/entities/session'
import { SessionFactory } from './domain/factories/session'

const personalChatDataSource = new PersonalChatFirebaseDataSource()
const sessionDataSource = new SessionFirebaseDataSource()

const chatTransformer = new ChatTransformer()
const sessionTransformer = new SessionTransformer()

const personalChatRepository = new ChatRepository(personalChatDataSource, chatTransformer)
const sessionRepository = new SessionRepository(sessionDataSource, sessionTransformer)

export const GetPersonalChats = new GetChatsUseCase(personalChatRepository)
export const GetPersonalChatsMeta = new GetChatsMetaUseCase(personalChatRepository)
export const ListenToPersonalChats = new ListenToChatsUseCase(personalChatRepository)
export const ListenToPersonalChatsMeta = new ListenToChatsMetaUseCase(personalChatRepository)
export const AddPersonalChat = new AddChatUseCase(personalChatRepository)
export const MarkPersonalChatRead = new MarkChatReadUseCase(personalChatRepository)

export const GetSession = new GetSessionUseCase(sessionRepository)
export const GetSessions = new GetSessionsUseCase(sessionRepository)
export const ListenToSession = new ListenToSessionUseCase(sessionRepository)
export const ListenToSessions = new ListenToSessionsUseCase(sessionRepository)
export const AddSession = new AddSessionUseCase(sessionRepository)
export const BeginSession = new BeginSessionUseCase(sessionRepository)
export const CancelSession = new CancelSessionUseCase(sessionRepository)

export { ChatEntity, ChatFactory, ChatMetaEntity }
export { SessionEntity, SessionFactory }
