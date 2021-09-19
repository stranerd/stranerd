import io, { Socket } from 'socket.io-client'
import { getTokens } from '@utils/tokens'
import { apiBases } from '@utils/environment'
import { Listeners, NetworkError, StatusCodes } from '@modules/core'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'

let socket = null as Socket<DefaultEventsMap, DefaultEventsMap> | null
const getSocketBaseAndPath = () => {
	const stranerdBase = apiBases.STRANERD
	const splitOnDoubleSlash = stranerdBase.split('//')
	const http = splitOnDoubleSlash[0]
	const minusHttp = splitOnDoubleSlash[1]
	const minusDomain = minusHttp.split('/').slice(1).join('/')
	const path = '/' + (minusDomain ?? '') + '/socket.io'
	const domain = [http, minusHttp.split('/')[0]].join('//')
	return { path, domain }
}

type SocketReturn = { code: StatusCodes, message: string, channel: string }

export async function listenOnSocket<Model> (channel: string, listeners: Listeners<Model>) {
	if (!socket) {
		const { accessToken } = await getTokens()
		socket = io(getSocketBaseAndPath().domain, {
			path: getSocketBaseAndPath().path,
			auth: {
				token: accessToken,
				app: 'stranerd'
			}
		})
	}

	let finalChannel = ''
	await socket.emit('join', { channel }, (res: SocketReturn) => {
		if (res.code !== StatusCodes.Ok) throw new NetworkError(res.code, [{ message: res.message }])
		finalChannel = res.channel
		socket?.on(finalChannel, async (data: { channel: string, type: EmitTypes, data: Model }) => {
			if (finalChannel !== data.channel) return
			await listeners[data.type]?.(data.data)
		})
	})
	return () => {
		try {
			socket?.emit('leave', { channel: finalChannel }, (_: SocketReturn) => {
			})
		} catch (e) {
		}
	}
}

export async function closeSocket () {
	socket?.disconnect()
}

export enum EmitTypes {
	created = 'created',
	updated = 'updated',
	deleted = 'deleted'
}
