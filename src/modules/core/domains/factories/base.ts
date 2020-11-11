import { Rule, Validator } from 'sd-validate'
import { UploaderService } from '../../services/uploader'

export abstract class BaseFactory<E, T> {
	abstract readonly rules: { [key: string]: { required: boolean, rules: Rule[] } }
	abstract values: { [key: string]: any }
	abstract validValues: { [key: string]: any }
	abstract errors: { [key: string]: string | undefined }
	abstract toModel: () => Promise<T>
	abstract loadEntity: (entity: E) => void

	set (property: string, value: any) {
		const check = this.checkValidity(property, value)

		this.values[property] = value
		this.validValues[property] = check.isValid ? value : undefined
		this.errors[property] = check.message

		return check.isValid
	}

	get valid () {
		return Object.keys(this.validValues).map((key) => this.isValid(key)).every((valid) => valid)
	}

	isValid = (property: string) => this.checkValidity(property, this.validValues[property]).isValid

	validateAll = () => Object.keys(this.values).forEach((key) => this.set(key, this.values[key]))

	checkValidity (property: string, value: any) {
		if (this.rules[property]) {
			const validity = Validator.single(value, this.rules[property].rules, this.rules[property].required)
			if (validity.isValid) return { isValid: validity.isValid, message: undefined }
			else return { isValid: validity.isValid, message: validity.errors[0] }
		} else throw new Error('Property doesn\'t exist')
	}

	reset = () => {
		const reserved = ['userId', 'user']
		Object.keys(this.values).filter((key) => !reserved.includes(key))
			.forEach((key) => {
				this.values[key] = undefined
				this.validValues[key] = undefined
				this.errors[key] = undefined
			})
	}

	uploadFile = async (path: string, file: File) => await UploaderService.call(path, file)
}
