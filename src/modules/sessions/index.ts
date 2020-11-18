import { ChatFirebaseDataSource } from './data/datasources/chat-firebase'
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
import { ChatEntity } from './domain/entities/chat'
import { ChatFactory } from './domain/factories/chat'
import { SessionEntity } from './domain/entities/session'

const chatDataSource = new ChatFirebaseDataSource()
const sessionDataSource = new SessionFirebaseDataSource()

const chatTransformer = new ChatTransformer()
const sessionTransformer = new SessionTransformer()

const chatRepository = new ChatRepository(chatDataSource, chatTransformer)
const sessionRepository = new SessionRepository(sessionDataSource, sessionTransformer)

export const GetChats = new GetChatsUseCase(chatRepository)
export const ListenToChats = new ListenToChatsUseCase(chatRepository)
export const AddChat = new AddChatUseCase(chatRepository)
export const FindChat = new FindChatUseCase(chatRepository)

export const FindSession = new FindSessionUseCase(sessionRepository)

export { ChatEntity, ChatFactory }
export { SessionEntity }
