export interface MessageFromModel {
	id: string
	name: string
	email: string
	message: string
	dates: {
		createdAt: number
	}
}

export interface MessageToModel {
	name: string
	email: string
	message: string
}
