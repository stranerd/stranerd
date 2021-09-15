export type { FirestoreGetClauses, DatabaseGetClauses } from './data/datasources/base'
export type { Media } from './data/models/base'
export { timestampToMs } from './data/transformers/converters/getFirebaseDate'

export { BaseEntity } from './domain/entities/base'
export { BaseFactory } from './domain/factories/base'

export { AxiosInstance, AxiosClient, NetworkError, StatusCodes } from './services/http'
export { DatabaseService, FirestoreService, FunctionsService } from './services/firebase'
export { UploaderService } from './services/uploader'
export { default as firebase, analytics, firestore, database, auth, storage, functions } from './services/initFirebase'
export type { Timestamp } from './services/initFirebase'
