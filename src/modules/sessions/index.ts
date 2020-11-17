import { ChatFirebaseDataSource } from './data/datasources/chat-firebase'
import { ChatTransformer } from './data/transformers/chat'
import { ChatRepository } from './data/repositories/chat'
import { FindChatUseCase } from './domain/usecases/chats/findChat'
import { GetChatsUseCase } from './domain/usecases/chats/getChats'
import { AddChatUseCase } from './domain/usecases/chats/addChat'
import { ListenToChatsUseCase } from './domain/usecases/chats/listenToChats'
import { ChatEntity } from './domain/entities/chat'
import { ChatFactory } from './domain/factories/chat'

const chatDataSource = new ChatFirebaseDataSource()

const chatTransformer = new ChatTransformer()

const chatRepository = new ChatRepository(chatDataSource, chatTransformer)

export const GetChats = new GetChatsUseCase(chatRepository)
export const ListenToChats = new ListenToChatsUseCase(chatRepository)
export const AddChat = new AddChatUseCase(chatRepository)
export const FindChat = new FindChatUseCase(chatRepository)

export { ChatEntity, ChatFactory }
