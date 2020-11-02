import { SubjectFirebaseDataSource } from './data/datasources/subject-firebase'
import { SubjectTransformer } from './data/transformers/subject'
import { SubjectRepository } from './data/repositories/subject'
import { GetSubjectsUseCase } from './domain/useCases/getSubjects'
import { DeleteSubjectUseCase } from './domain/useCases/deleteSubject'
import { GetSubjectFactoryUseCase } from './domain/useCases/getSubjectFactory'
import { AddSubjectUseCase } from './domain/useCases/addSubject'
import { UpdateSubjectUseCase } from './domain/useCases/updateSubject'
import { FindSubjectUseCase } from './domain/useCases/findSubject'

const subjectDataSource = new SubjectFirebaseDataSource()

const subjectTransformer = new SubjectTransformer()

const subjectRepository = new SubjectRepository(subjectDataSource, subjectTransformer)

export const GetSubjects = new GetSubjectsUseCase(subjectRepository)
export const DeleteSubject = new DeleteSubjectUseCase(subjectRepository)
export const AddSubject = new AddSubjectUseCase(subjectRepository)
export const UpdateSubject = new UpdateSubjectUseCase(subjectRepository)
export const FindSubject = new FindSubjectUseCase(subjectRepository)
export const GetSubjectFactory = new GetSubjectFactoryUseCase()
