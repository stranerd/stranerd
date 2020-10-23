export interface WhereCondition {
	field: string
	condition: '<' | '<=' | '==' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any'
	value: any
}
export interface GetClauses {
	limit?: number
	where?: WhereCondition[],
	order?: {
		field: string
		desc: boolean
	}
}
