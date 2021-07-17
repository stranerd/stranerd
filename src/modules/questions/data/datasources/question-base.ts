import { FirestoreGetClauses } from '@modules/core'
import { QuestionFromModel, QuestionToModel } from '../models/question'

export abstract class QuestionBaseDataSource {
    abstract create: (data: QuestionToModel) => Promise<string>
    abstract update: (id: string, data: Partial<QuestionToModel>) => Promise<void>
    abstract get: (condition?: FirestoreGetClauses) => Promise<QuestionFromModel[]>
    abstract listenToOne: (id: string, callback: (document: QuestionFromModel | null) => void) => Promise<() => void>
    abstract listenToMany: (callback: (documents: QuestionFromModel[]) => void, condition?: FirestoreGetClauses) => Promise<() => void>
    abstract find: (id: string) => Promise<QuestionFromModel | null>
}
