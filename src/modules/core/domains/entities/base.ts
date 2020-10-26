export class BaseEntity {
	public hash: string

	constructor () {
		this.hash = Math.random().toString(36).substr(2, 12)
	}
}
