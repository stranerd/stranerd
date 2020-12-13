import firebase from '@modules/core/services/initFirebase'
import { Timestamp } from '@modules/core/data/models/base'

export const timestampToDateString = (timestamp: Timestamp | number | undefined) => {
	if (typeof timestamp === 'number') return new Date(timestamp).toString()
	return timestamp?.toDate().toString() ?? new Date().toString()
}

export const dateToTimestamp = (date: Date) :Timestamp => {
	return firebase.firestore.Timestamp.fromDate(date)
}

export const dateToMilliseconds = (date: Date) => date.getTime()

export const serverTimeStamp = () => {
	return firebase.firestore.FieldValue.serverTimestamp()
}
