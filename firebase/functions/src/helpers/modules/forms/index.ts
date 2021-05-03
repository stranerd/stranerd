export type Message = {
	id: string,
	name: string,
	email: string,
	message: string,
	date: string
}

export type Report = {
	id: string,
	reporterId: string,
	reportedId: string,
	reporterBio: any,
	reportedBio: any,
	title: string,
	message: string,
	date: string
}
