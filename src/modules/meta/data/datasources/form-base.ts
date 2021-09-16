export abstract class FormBaseDataSource<To> {
	abstract create: (data: To) => Promise<void>
}
