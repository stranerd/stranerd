import { MessageFirebaseDataSource } from './data/datasources/message-firebase'
import { MessageTransformer } from './data/transformers/message'
import { MessageRepository } from './data/repositories/message'
import { AddMessageUseCase } from './domain/usecases/messages/addMessage'

const messageDataSource = new MessageFirebaseDataSource()

const messageTransformer = new MessageTransformer()

const messageRepository = new MessageRepository(messageDataSource, messageTransformer)

export const AddMessage = new AddMessageUseCase(messageRepository)
