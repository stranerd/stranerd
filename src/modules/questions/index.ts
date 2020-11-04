import { SubjectFirebaseDataSource } from './data/datasources/subject-firebase'
import { SubjectTransformer } from './data/transformers/subject'
import { SubjectRepository } from './data/repositories/subject'
import { GetSubjectsUseCase } from './domain/usecases/subjects/getSubjects'
import { DeleteSubjectUseCase } from './domain/usecases/subjects/deleteSubject'
import { GetSubjectFactoryUseCase } from './domain/usecases/subjects/getSubjectFactory'
import { AddSubjectUseCase } from './domain/usecases/subjects/addSubject'
import { UpdateSubjectUseCase } from './domain/usecases/subjects/updateSubject'
import { FindSubjectUseCase } from './domain/usecases/subjects/findSubject'

const subjectDataSource = new SubjectFirebaseDataSource()

const subjectTransformer = new SubjectTransformer()

const subjectRepository = new SubjectRepository(subjectDataSource, subjectTransformer)

export const GetSubjects = new GetSubjectsUseCase(subjectRepository)
export const DeleteSubject = new DeleteSubjectUseCase(subjectRepository)
export const AddSubject = new AddSubjectUseCase(subjectRepository)
export const UpdateSubject = new UpdateSubjectUseCase(subjectRepository)
export const FindSubject = new FindSubjectUseCase(subjectRepository)
export const GetSubjectFactory = new GetSubjectFactoryUseCase()
