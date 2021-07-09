declare type DeepRequired<T> = Required<T extends object ? {
	[K in keyof T]: DeepRequired<T[K]>
} : T >

declare type DeepNullable<T> = T extends object ? undefined | {
	[K in keyof T]: DeepNullable<T[K]>
} : T
