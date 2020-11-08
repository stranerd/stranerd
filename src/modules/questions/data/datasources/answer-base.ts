import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { AnswerFromModel, AnswerToModel } from '../models/answer'

export abstract class AnswerBaseDataSource {
    abstract create: (data: AnswerToModel) => Promise<string>
    abstract get: (condition?: DatabaseGetClauses) => Promise<AnswerFromModel[]>
    abstract listen: (callback: (documents: AnswerFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
    abstract find: (id: string) => Promise<AnswerFromModel | null>
}
