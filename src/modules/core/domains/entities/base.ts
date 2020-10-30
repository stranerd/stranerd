export class BaseEntity {
	public hash: string

	constructor () {
		this.hash = Math.random().toString(36).substr(2, 12)
	}

	toJSON () {
		const json = Object.assign({}, this)
		const proto = Object.getPrototypeOf(this)
		Object.getOwnPropertyNames(proto)
			.filter((k) => k !== 'constructor')
			.forEach((key) => {
				// @ts-ignore
				json[key] = this[key]
			})
		return json
	}
}
