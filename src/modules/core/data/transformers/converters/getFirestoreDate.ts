import firebase from 'firebase'

export const timestampToDate = (timestamp: firebase.firestore.Timestamp | number | undefined) :Date | undefined => {
	if (typeof timestamp === 'number') return new Date(timestamp)
	return timestamp?.toDate() ?? undefined
}

export const dateToTimestamp = (date: Date) :firebase.firestore.Timestamp => {
	return firebase.firestore.Timestamp.fromDate(date)
}

export const dateToMilliseconds = (date: Date) => date.getTime()

export const serverTimeStamp = () => {
	return firebase.firestore.FieldValue.serverTimestamp()
}
