export interface MessageFromModel {
	id: string
	fName: string
	lName: string
	email: string
	message: string
	dates: {
		createdAt: number
	}
}

export interface MessageToModel {
	fName: string
	lName: string
	email: string
	message: string
}
