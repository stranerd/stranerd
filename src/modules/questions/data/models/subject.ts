export interface SubjectFromModel {
	id: string
	name: string
	dates: {
		createdAt: number
	}
}

export interface SubjectToModel {
	name: string
}
