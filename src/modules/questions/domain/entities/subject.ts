import { BaseEntity } from '@modules/core/domains/entities/base'
import { Media } from '@modules/core/data/models/base'

export class SubjectEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly iconData: Media
	public readonly createdAt: number

	constructor ({ id, name, iconData, createdAt }: SubjectConstructorArgs) {
		super()
		this.id = id
		this.name = capitalize(name)
		this.iconData = iconData
		this.createdAt = createdAt
	}

	get icon () { return this.iconData?.link ?? undefined }
}

type SubjectConstructorArgs = { id: string, name: string, iconData: Media, createdAt: number }
const capitalize = (value: string) => {
	const c = (v: string) => v[0].toUpperCase() + v.slice(1)
	return value.split(' ').map(c).join(' ')
}
