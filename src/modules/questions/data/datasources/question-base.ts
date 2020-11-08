import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { QuestionFromModel, QuestionToModel } from '../models/question'

export abstract class QuestionBaseDataSource {
    abstract create: (data: QuestionToModel) => Promise<string>
    abstract update: (id: string, data: Partial<QuestionToModel>) => Promise<void>
    abstract get: (condition?: FirestoreGetClauses) => Promise<QuestionFromModel[]>
    abstract listen: (callback: (documents: QuestionFromModel[]) => void, condition?: FirestoreGetClauses) => Promise<() => void>
    abstract find: (id: string) => Promise<QuestionFromModel | null>
}
