import { EmitTypes } from '@modules/core/services/sockets'

export interface FirestoreWhereCondition {
	field: string
	condition: '<' | '<=' | '==' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any'
	value: any
}

export interface FirestoreGetClauses {
	limit?: number
	where?: FirestoreWhereCondition[],
	order?: {
		field: string
		desc: boolean
	}
}

export interface DatabaseGetClauses {
	limit?: {
		count: number
		bottom: boolean
	}
	order?: {
		field: string,
		condition?: {
			'>'?: any
			'>='?: any
			'<'?: any
			'<='?: any
			'=='?: any
		}
	}
}

export type Listeners<Model> = {
	[EmitTypes.created]: (model: Model) => Promise<void>
	[EmitTypes.updated]: (model: Model) => Promise<void>
	[EmitTypes.deleted]: (model: Model) => Promise<void>
}
