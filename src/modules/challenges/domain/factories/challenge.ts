import { BaseFactory } from '@modules/core/domains/factories/base'
import { ChallengeEntity } from '../entities/challenge'
import { ChallengeToModel } from '../../data/models/challenge'

export abstract class ChallengeFactory<K> extends BaseFactory<ChallengeEntity, ChallengeToModel, K> {}
