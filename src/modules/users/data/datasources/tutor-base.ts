import { GetClauses } from '@modules/core/data/datasources/base'
import { TutorFromModel } from '../models/tutor'

export abstract class TutorBaseDataSource {
	public abstract find: (id: string) => Promise<TutorFromModel | undefined>
	public abstract get: (condition?: GetClauses) => Promise<TutorFromModel[]>
	abstract add: (id: string) => Promise<void>
	abstract delete: (id: string) => Promise<void>
	abstract updateCourse: (id: string, subject: string, data: { level: number } | null) => Promise<void>
}
