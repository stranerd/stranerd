import { SessionToModel } from '@modules/sessions/data/models/session'
import { Status } from '@modules/users'
import { DatabaseGetClauses, FirestoreGetClauses } from '../data/datasources/base'
import firebase, { database, firestore, functions } from './initFirebase'

const buildFirestoreQuery = (query: firebase.firestore.Query, conditions?: FirestoreGetClauses) => {
	if (conditions) {
		if (conditions.order) query = query.orderBy(conditions.order.field, conditions.order.desc ? 'desc' : 'asc')
		if (conditions.where) {
			conditions.where.forEach((clause) => {
				query = query.where(clause.field, clause.condition, clause.value)
			})
		}
		if (conditions.limit) query = query.limit(conditions.limit)
	}
	return query
}

const buildDatabaseQuery = (ref: firebase.database.Query, conditions?: DatabaseGetClauses) => {
	if (conditions) {
		if (conditions.order) {
			ref = ref.orderByChild(conditions.order.field)
			if (conditions.order.condition) {
				const { '<': lt, '<=': lte, '==': eq, '>': gt, '>=': gte } = conditions.order.condition
				if (gte) ref = ref.startAt(gte)
				if (lte) ref = ref.endAt(lte)
				if (gt) ref = ref.startAfter(gt)
				if (lt) ref = ref.endBefore(lt)
				if (eq) ref = ref.equalTo(eq)
			}
		}
		if (conditions.limit) ref = conditions.limit.bottom
			? ref.limitToLast(conditions.limit.count)
			: ref.limitToFirst(conditions.limit.count)
	}
	return ref
}

export const FirestoreService = {
	find: async (collection: string, id: string) => {
		const doc = await firestore.collection(collection).doc(id).get()
		if (doc.exists) return { id: doc.id, ...doc.data() }
		else return null
	},
	get: async (collection: string, conditions?: FirestoreGetClauses) => {
		let query: firebase.firestore.Query = firestore.collection(collection)
		query = buildFirestoreQuery(query, conditions)
		const docs = await query.get()
		return docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
	},
	listenToOne: async (callback: (document: any) => void, collection: string, id: string) => {
		return firestore.collection(collection).doc(id).onSnapshot((snapshot) => {
			callback(snapshot.exists ? { id: snapshot.id, ...snapshot.data() } : null)
		})
	},
	listenToMany: async (callback: (documents: any[]) => void, collection: string, conditions?: FirestoreGetClauses) => {
		let query: firebase.firestore.Query = firestore.collection(collection)
		query = buildFirestoreQuery(query, conditions)
		return query.onSnapshot((snapshot) => {
			const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
			callback(documents)
		})
	},
	create: async (collection: string, data: object) => {
		// @ts-ignore
		data.dates = { createdAt: firebase.firestore.FieldValue.serverTimestamp() }
		const ref = await firestore.collection(collection).add(data)
		return ref.id
	},
	update: async (collection: string, id: string, data: object) => {
		// @ts-ignore
		data.dates = { updatedAt: firebase.firestore.FieldValue.serverTimestamp() }
		const ref = firestore.collection(collection).doc(id)
		await ref.set(data, { merge: true })
	},
	delete: async (collection: string, id: string) => {
		return await firestore.collection(collection).doc(id).delete()
	}
}

export const DatabaseService = {
	get: async (path: string, conditions?: DatabaseGetClauses) => {
		const ref = database.ref(path)
		const doc = await buildDatabaseQuery(ref, conditions).once('value')
		if (!doc.exists()) return null
		const children: any = {}
		doc.forEach((child) => {
			children[child.key!] = child.val()
		})
		return { ...children, id: doc.key! }
	},
	getMany: async (path: string, conditions?: DatabaseGetClauses) => {
		const ref = database.ref(path)
		const doc = await buildDatabaseQuery(ref, conditions).once('value')
		if (!doc.exists()) return []
		const children: any = []
		doc.forEach((child) => {
			children.push({ ...child.val(), id: child.key })
		})
		return children
	},
	listen: async (path: string, callback: (doc: any) => void, conditions?: DatabaseGetClauses, updateStatus = false) => {
		const ref = database.ref(path)
		const listener = buildDatabaseQuery(ref, conditions)
			.on('value', (snapshot) => {
				if (!snapshot.exists()) return callback(null)

				const children: any = {}
				snapshot.forEach((child) => {
					children[child.key!] = child.val()
				})
				const doc = { ...children, id: snapshot.key! }
				callback(doc)
			})
		if (updateStatus) firebase.database().ref('.info/connected')
			.on('value', async (snapshot) => {
				if (!snapshot.val()) return
				await ref.onDisconnect().update({
					status: {
						mode: Status.OFFLINE,
						updatedAt: firebase.database.ServerValue.TIMESTAMP
					}
				})
				await ref.update({
					status: {
						mode: Status.ONLINE,
						updatedAt: firebase.database.ServerValue.TIMESTAMP
					}
				})
			})
		return () => ref.off('value', listener)
	},
	listenToMany: async (path: string, caller: (docs: any[]) => void, conditions?: DatabaseGetClauses) => {
		const ref = database.ref(path)
		const listener = buildDatabaseQuery(ref, conditions)
			.on('value', (snapshot) => {
				if (!snapshot.exists()) return caller([])
				const children: any = []
				snapshot.forEach((child) => {
					children.push({ ...child.val(), id: child.key })
				})
				caller(children)
			})
		return () => ref.off('value', listener)
	},
	create: async (path: string, data: any) => {
		data.dates = { createdAt: firebase.database.ServerValue.TIMESTAMP }
		const doc = await database.ref(path).push(data)
		return doc.key!
	},
	update: async (path: string, data: Record<string, any>) => {
		await database.ref(path).update(data)
	},
	delete: async (path: string) => {
		await database.ref(path).remove()
	}
}

export interface FUNCTIONS {
	toggleAdmin: { id: string, isAdmin: boolean },
	toggleTutor: { id: string, isTutor: boolean },
	subscribeToMailingList: { email: string },
	requestNewSession: { session: Partial<SessionToModel> },
	acceptSession: { id: string },
	cancelSession: { id: string },
	getClientToken: {},
	makePayment: { amount: number, nonce: string },
	buyCoins: { amount: number, isGold: boolean },
	updateStreak: {},
	tipTutor: { tutorId: string, amount: number },
	rateTutor: { tutorId: string, amount: number, review: string | undefined },
	approveTutorApplication: { id: string, approved: boolean },
	markAsBestAnswer: { questionId: string, answerId: string }
}

export interface FUNCTION_RETURNS {
	toggleAdmin: void,
	toggleTutor: void,
	subscribeToMailingList: void,
	requestNewSession: string,
	acceptSession: void,
	cancelSession: void,
	getClientToken: { braintree: string, paypal: string },
	makePayment: boolean,
	buyCoins: void,
	updateStreak: { isLessThan: boolean, isNextDay: boolean, streak: number },
	tipTutor: void,
	rateTutor: void,
	approveTutorApplication: void,
	markAsBestAnswer: void
}

export const FunctionsService = {
	call: async function call<T extends keyof FUNCTIONS> (name: T, data: FUNCTIONS[T]) {
		const callable = functions.httpsCallable(name)
		const result = await callable(data)
		return result.data as FUNCTION_RETURNS[T]
	}
}
