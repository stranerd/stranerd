import { DatabaseGetClauses } from '@modules/core/data/datasources/base'

export abstract class FormBaseDataSource<From, To> {
	abstract create: (data: To) => Promise<string>
	abstract get: (condition?: DatabaseGetClauses) => Promise<From[]>
	abstract find: (id: string) => Promise<From | null>
	abstract update: (id: string, data: To) => Promise<void>
	abstract delete: (id: string) => Promise<void>
}
