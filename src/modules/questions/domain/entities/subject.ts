import { BaseEntity } from '@modules/core/domains/entities/base'
import { Media } from '@modules/core/data/models/base'

export class SubjectEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly iconData: Media

	constructor ({ id, name, iconData }: SubjectConstructorArgs) {
		super()
		this.id = id
		this.name = capitalize(name)
		this.iconData = iconData
	}

	get icon () { return this.iconData?.link ?? undefined }
}

type SubjectConstructorArgs = { id: string, name: string, iconData: Media }
const capitalize = (value: string) => {
	const c = (v: string) => v[0].toUpperCase() + v.slice(1)
	return value.split(' ').map(c).join(' ')
}
