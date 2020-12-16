import { ChallengeFirebaseDataSource } from './data/datasources/challenge-firebase'
import { ChallengeTransformer } from './data/transformers/challenge'
import { ChallengeRepository } from './data/repositories/challenge'
import { GetAllChallengesUseCase } from './domain/usecases/challenges/getAllChallenges'
import { ChallengeEntity } from './domain/entities/challenge'

const challengeDataSource = new ChallengeFirebaseDataSource()

const challengeTransformer = new ChallengeTransformer()

const challengeRepository = new ChallengeRepository(challengeDataSource, challengeTransformer)

export const GetAllChallenges = new GetAllChallengesUseCase(challengeRepository)

export { ChallengeEntity }
