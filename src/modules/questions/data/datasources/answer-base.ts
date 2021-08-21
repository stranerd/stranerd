import { FirestoreGetClauses } from '@modules/core'
import { AnswerFromModel, AnswerToModel } from '../models/answer'

export abstract class AnswerBaseDataSource {
	abstract create: (data: AnswerToModel) => Promise<string>
	abstract get: (condition?: FirestoreGetClauses) => Promise<AnswerFromModel[]>
	abstract listenToOne: (id: string, callback: (document: AnswerFromModel | null) => void) => Promise<() => void>
	abstract listenToMany: (callback: (documents: AnswerFromModel[]) => void, condition?: FirestoreGetClauses) => Promise<() => void>
	abstract find: (id: string) => Promise<AnswerFromModel | null>
	abstract update: (id: string, data: Partial<AnswerToModel>) => Promise<void>
	abstract delete: (id: string) => Promise<void>
	abstract rate: (id: string, userId: string, rating: number) => Promise<void>
	abstract markAsBest: (data: { questionId: string, answerId: string }) => Promise<void>
}
