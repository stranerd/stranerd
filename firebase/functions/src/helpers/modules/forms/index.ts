export type Message = {
	id: string,
	fName: string,
	lName: string,
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
