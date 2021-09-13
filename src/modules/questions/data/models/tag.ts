export interface TagFromModel {
	id: string, 
	name: string, 
	count: number, 
	createdAt: number, 
	updatedAt: number 
}

export interface TagToModel {
	name: string, 
	count: number
}
