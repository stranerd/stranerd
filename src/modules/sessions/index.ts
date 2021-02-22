import { PersonalChatFirebaseDataSource } from './data/datasources/personal-chat-firebase'
import { SessionChatFirebaseDataSource } from './data/datasources/session-chat-firebase'
import { SessionFirebaseDataSource } from './data/datasources/session-firebase'
import { ChatTransformer } from './data/transformers/chat'
import { SessionTransformer } from './data/transformers/session'
import { ChatRepository } from './data/repositories/chat'
import { SessionRepository } from './data/repositories/session'
import { FindChatUseCase } from './domain/usecases/chats/findChat'
import { GetChatsUseCase } from './domain/usecases/chats/getChats'
import { AddChatUseCase } from './domain/usecases/chats/addChat'
import { ListenToChatsUseCase } from './domain/usecases/chats/listenToChats'
import { FindSessionUseCase } from './domain/usecases/sessions/findSession'
import { ListenToSessionUseCase } from './domain/usecases/sessions/listenToSession'
import { AddSessionUseCase } from './domain/usecases/sessions/addSession'
import { BeginSessionUseCase } from './domain/usecases/sessions/beginSession'
import { CancelSessionUseCase } from './domain/usecases/sessions/cancelSession'
import { ChatEntity } from './domain/entities/chat'
import { ChatFactory } from './domain/factories/chat'
import { SessionEntity } from './domain/entities/session'
import { SessionFactory } from './domain/factories/session'

const personalChatDataSource = new PersonalChatFirebaseDataSource()
const sessionChatDataSource = new SessionChatFirebaseDataSource()
const sessionDataSource = new SessionFirebaseDataSource()

const chatTransformer = new ChatTransformer()
const sessionTransformer = new SessionTransformer()

const personalChatRepository = new ChatRepository(personalChatDataSource, chatTransformer)
const sessionChatRepository = new ChatRepository(sessionChatDataSource, chatTransformer)
const sessionRepository = new SessionRepository(sessionDataSource, sessionTransformer)

export const GetPersonalChats = new GetChatsUseCase(personalChatRepository)
export const ListenToPersonalChats = new ListenToChatsUseCase(personalChatRepository)
export const AddPersonalChat = new AddChatUseCase(personalChatRepository)
export const FindPersonalChat = new FindChatUseCase(personalChatRepository)

export const GetSessionChats = new GetChatsUseCase(sessionChatRepository)
export const ListenToSessionChats = new ListenToChatsUseCase(sessionChatRepository)
export const AddSessionChat = new AddChatUseCase(sessionChatRepository)
export const FindSessionChat = new FindChatUseCase(sessionChatRepository)

export const FindSession = new FindSessionUseCase(sessionRepository)
export const ListenToSession = new ListenToSessionUseCase(sessionRepository)
export const AddSession = new AddSessionUseCase(sessionRepository)
export const BeginSession = new BeginSessionUseCase(sessionRepository)
export const CancelSession = new CancelSessionUseCase(sessionRepository)

export { ChatEntity, ChatFactory }
export { SessionEntity, SessionFactory }
