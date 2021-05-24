export interface NotificationFromModel {
	id: string
	body: string
	seen: boolean
	action: string
	dates: {
		createdAt: number
	}
}

export interface NotificationToModel {
	body: string
	seen: boolean
	action: string
}
