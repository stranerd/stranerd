import { ChallengeFirebaseDataSource } from './data/datasources/challenge-firebase'
import { ChallengeTransformer } from './data/transformers/challenge'
import { ChallengeRepository } from './data/repositories/challenge'
import { GetAllChallengesUseCase } from './domain/usecases/challenges/getAllChallenges'
import { DeleteChallengeUseCase } from './domain/usecases/challenges/deleteChallenge'
import { AddChallengeUseCase } from './domain/usecases/challenges/addChallenge'
import { FindChallengeUseCase } from './domain/usecases/challenges/findChallenge'
import { ChallengeEntity } from './domain/entities/challenge'
import { AnswerChallengeFactory } from './domain/factories/answer-challenge'

const challengeDataSource = new ChallengeFirebaseDataSource()

const challengeTransformer = new ChallengeTransformer()

const challengeRepository = new ChallengeRepository(challengeDataSource, challengeTransformer)

export const GetAllChallenges = new GetAllChallengesUseCase(challengeRepository)
export const DeleteChallenge = new DeleteChallengeUseCase(challengeRepository)
export const AddChallenge = new AddChallengeUseCase(challengeRepository)
export const FindChallenge = new FindChallengeUseCase(challengeRepository)

export { ChallengeEntity, AnswerChallengeFactory }
