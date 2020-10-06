import * as Express from 'express'
import { getConfig } from '../utils/config'

const router = Express.Router()

router.use((req, res) => res.json(getConfig()).end())

export { router }
