import firebase from 'firebase'
import { Timestamp } from '@modules/core/data/models/base'

export const timestampToDate = (timestamp: Timestamp | number | undefined) :Date => {
	if (typeof timestamp === 'number') return new Date(timestamp)
	return timestamp?.toDate() ?? new Date()
}

export const dateToTimestamp = (date: Date) :Timestamp => {
	return firebase.firestore.Timestamp.fromDate(date)
}

export const dateToMilliseconds = (date: Date) => date.getTime()

export const serverTimeStamp = () => {
	return firebase.firestore.FieldValue.serverTimestamp()
}
