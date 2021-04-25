import { getRandomValue } from '@utils/numbers'

export class BaseEntity {
	public hash: string

	constructor () {
		this.hash = getRandomValue()
	}

	toJSON () {
		const json = Object.assign({}, this) as Record<string, any>
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
