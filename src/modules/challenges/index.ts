import { ChallengeFirebaseDataSource } from './data/datasources/challenge-firebase'
import { PersonalChallengeFirebaseDataSource } from './data/datasources/personal-challenge-firebase'
import { ChallengeTransformer } from './data/transformers/challenge'
import { PersonalChallengeTransformer } from './data/transformers/personal-challenge'
import { ChallengeRepository } from './data/repositories/challenge'
import { PersonalChallengeRepository } from './data/repositories/personal-challenge'
import { GetAllChallengesUseCase } from './domain/usecases/challenges/getAllChallenges'
import { DeleteChallengeUseCase } from './domain/usecases/challenges/deleteChallenge'
import { AddChallengeUseCase } from './domain/usecases/challenges/addChallenge'
import { FindChallengeUseCase } from './domain/usecases/challenges/findChallenge'
import { GetAllPersonalChallengesUseCase } from './domain/usecases/personal-challenges/getAllPersonalChallenges'
import { ChallengeEntity } from './domain/entities/challenge'
import { AnswerChallengeFactory } from './domain/factories/answer-challenge'
import { PersonalChallengeEntity } from './domain/entities/personal-challenge'

const challengeDataSource = new ChallengeFirebaseDataSource()
const personalChallengeDataSource = new PersonalChallengeFirebaseDataSource()

const challengeTransformer = new ChallengeTransformer()
const personalChallengeTransformer = new PersonalChallengeTransformer()

const challengeRepository = new ChallengeRepository(challengeDataSource, challengeTransformer)
const personalChallengeRepository = new PersonalChallengeRepository(personalChallengeDataSource, personalChallengeTransformer)

export const GetAllChallenges = new GetAllChallengesUseCase(challengeRepository)
export const DeleteChallenge = new DeleteChallengeUseCase(challengeRepository)
export const AddChallenge = new AddChallengeUseCase(challengeRepository)
export const FindChallenge = new FindChallengeUseCase(challengeRepository)

export const GetAllPersonalChallenges = new GetAllPersonalChallengesUseCase(personalChallengeRepository)

export { ChallengeEntity, AnswerChallengeFactory, PersonalChallengeEntity }
