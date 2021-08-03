import { NextFunction, Request, Response } from 'express'
import { host, domain } from '../../../utils/environment'

export const RedirectMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	if (req.headers.host && req.headers.host !== host) return res.redirect(301, domain + req.originalUrl)
	return next()
}
