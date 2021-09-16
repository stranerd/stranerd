import io, { Socket } from 'socket.io-client'
import { getTokens } from '@utils/tokens'
import { apiBases } from '@utils/environment'
import { Listeners, StatusCodes } from '@modules/core'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'

let socket = null as Socket<DefaultEventsMap, DefaultEventsMap> | null

export async function listenOnSocket<Model> (channel: string, listeners: Listeners<Model>) {
	if (!socket) {
		const { accessToken } = await getTokens()
		socket = io(apiBases.STRANERD, {
			auth: {
				token: accessToken,
				app: 'stranerd'
			}
		})
	}

	let finalChannel = ''
	await socket.emit('join', { channel }, (res: { code: StatusCodes, message: string, channel: string }) => {
		finalChannel = res.channel
		socket?.on(finalChannel, async (data: { channel: string, type: EmitTypes, data: Model }) => {
			if (finalChannel !== data.channel) return
			await listeners[data.type]?.(data.data)
		})
	})
	return () => {
		try {
			socket?.emit('leave', { channel: finalChannel })
		} catch (e) {
		}
	}
}

export enum EmitTypes {
	created = 'created',
	updated = 'updated',
	deleted = 'deleted'
}
