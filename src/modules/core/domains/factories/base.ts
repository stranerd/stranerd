import { Rule, Validator } from 'sd-validate'
import { UploaderService } from '../../services/uploader'

export abstract class BaseFactory<E, T, K extends Record<string, any>> {
	protected abstract readonly rules: Record<keyof K, { required: boolean, rules: Rule[] }>
	protected readonly defaults: K
	protected values: K
	protected validValues: K
	errors: Record<keyof K, string | undefined>
	abstract toModel: () => Promise<T>
	abstract loadEntity: (entity: E) => void
	abstract reserved: string[]

	protected constructor (keys: K) {
		this.values = this.validValues = this.defaults = keys
		this.errors = Object.keys(keys)
			.reduce((acc, value: keyof K) => {
				acc[value] = undefined
				return acc
			}, {} as Record<keyof K, string | undefined>)
	}

	set (property: keyof K, value: any) {
		const check = this.checkValidity(property, value)

		this.values[property] = value
		this.validValues[property] = check.isValid ? value : this.defaults[property]
		this.errors[property] = check.message

		return check.isValid
	}

	get valid () {
		return Object.keys(this.defaults)
			.map((key) => this.isValid(key))
			.every((valid) => valid)
	}

	isValid = (property: keyof K) => this.checkValidity(property, this.validValues[property]).isValid

	validateAll = () => Object.keys(this.defaults)
		.forEach((key) => this.set(key, this.values[key]))

	checkValidity (property: keyof K, value: any) {
		const validity = Validator.single(value, this.rules[property].rules, this.rules[property].required)
		if (validity.isValid) return { isValid: validity.isValid, message: undefined }
		else return { isValid: validity.isValid, message: validity.errors[0] }
	}

	reset = () => {
		const reserved = ['userId', 'user']
		Object.keys(this.defaults)
			.filter((key) => !reserved.concat(this.reserved ?? []).includes(key))
			.forEach((key: keyof K) => {
				this.values[key] = this.defaults[key]
				this.validValues[key] = this.defaults[key]
				this.errors[key] = undefined
			})
	}

	uploadFile = async (path: string, file: File) => await UploaderService.call(path, file)
}
