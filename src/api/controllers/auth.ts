import { Request, Response } from 'express'
import { signin, signout } from '../utils/firebaseAuth'
import { getConfig } from '../utils/config'

const SESSION_NAME = 'session'

export const SigninController = async (req: Request, res: Response) => {
	const { idToken, id } = req.body

	if(getConfig().isDev){
		if(!id) return res.status(400).json({
			success: false,
			error: 'Id is required'
		}).end()
	}else{
		if(!idToken) return res.status(400).json({
			success: false,
			error: 'Id Token is required'
		}).end()
	}

	let sessionValue = id

	try{
		if(!getConfig().isDev) sessionValue = await signin(idToken)

		res.cookie(SESSION_NAME, sessionValue, {
			maxAge:  14 * 24 * 60 * 60 * 1000,
			domain: getConfig().host,
			httpOnly: true,
			sameSite: 'lax'
		})

		return res.status(400).json({
			success: true,
			error: null
		}).end()

	}catch(err){
		return res.status(400).json({
			success: false,
			error: 'Failed to sign in'
		}).end()
	}
}


export const SignoutController = async (req: Request, res: Response) => {
	const session = req.cookies[SESSION_NAME]
	res.clearCookie(SESSION_NAME)

	try{
		if(!getConfig().isDev) await signout(session)

		return res.json({
			success: true,
			error: null
		}).end()
	}catch(err){
		return res.status(400).json({
			success: false,
			error: 'Failed to sign out!'
		}).end()
	}
}
