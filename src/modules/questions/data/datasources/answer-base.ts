import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { AnswerFromModel, AnswerToModel } from '../models/answer'

export abstract class AnswerBaseDataSource {
    abstract create: (data: AnswerToModel) => Promise<string>
    abstract get: (condition?: FirestoreGetClauses) => Promise<AnswerFromModel[]>
    abstract listen: (callback: (documents: AnswerFromModel[]) => void, condition?: FirestoreGetClauses) => Promise<() => void>
    abstract find: (id: string) => Promise<AnswerFromModel | null>
    abstract update: (id: string, data: object) => Promise<void>
    abstract like: (id: string, userId: string) => Promise<void>
    abstract rate: (id: string, userId: string, rating: number) => Promise<void>
}
