import { DatabaseGetClauses } from '@modules/core'
import { CommentFromModel, CommentToModel } from '../models/comment'

export abstract class CommentBaseDataSource {
    abstract create: (baseId: string, data: CommentToModel) => Promise<string>
    abstract get: (baseId: string, condition?: DatabaseGetClauses) => Promise<CommentFromModel[]>
    abstract listen: (baseId: string, callback: (documents: CommentFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
    abstract find: (baseId: string, id: string) => Promise<CommentFromModel | null>
    abstract update: (baseId: string, id: string, data: object) => Promise<void>
}
