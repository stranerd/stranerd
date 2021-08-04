import { SessionToModel } from '@modules/sessions/data/models/session'
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
	find: async function find<T extends { id: string }> (collection: string, id: string) :Promise<T | null> {
		const doc = await firestore.collection(collection).doc(id).get()
		if (doc.exists) return { id: doc.id, ...doc.data() } as T
		else return null
	},
	get: async function get<T extends { id: string }> (collection: string, conditions?: FirestoreGetClauses) :Promise<T[]> {
		let query: firebase.firestore.Query = firestore.collection(collection)
		query = buildFirestoreQuery(query, conditions)
		const docs = await query.get()
		return docs.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[]
	},
	listenToOne: async function listenToOne<T extends { id: string }> (callback: (document: T | null) => void, collection: string, id: string) {
		return firestore.collection(collection).doc(id).onSnapshot((snapshot) => {
			callback(snapshot.exists ? { id: snapshot.id, ...snapshot.data() } as T : null)
		})
	},
	listenToMany: async function listenToMany<T extends { id: string }> (callback: (documents: T[]) => void, collection: string, conditions?: FirestoreGetClauses) {
		let query: firebase.firestore.Query = firestore.collection(collection)
		query = buildFirestoreQuery(query, conditions)
		return query.onSnapshot((snapshot) => {
			const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[]
			callback(documents)
		})
	},
	create: async function create<T extends Record<string, any>> (collection: string, data: T) {
		// @ts-ignore
		data.dates = { createdAt: firebase.firestore.FieldValue.serverTimestamp() }
		const ref = await firestore.collection(collection).add(data)
		return ref.id
	},
	update: async function update<T extends Record<string, any>> (collection: string, id: string, data: T) {
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
	get: async function get<T extends { id: string }> (path: string, conditions?: DatabaseGetClauses) :Promise<T | null> {
		const ref = database.ref(path)
		const doc = await buildDatabaseQuery(ref, conditions).once('value')
		if (!doc.exists()) return null
		const children: any = {}
		doc.forEach((child) => {
			children[child.key!] = child.val()
		})
		return { ...children, id: doc.key! } as T
	},
	getMany: async function getMany<T extends { id: string }> (path: string, conditions?: DatabaseGetClauses) :Promise<T[]> {
		const ref = database.ref(path)
		const doc = await buildDatabaseQuery(ref, conditions).once('value')
		if (!doc.exists()) return []
		const children: any = []
		doc.forEach((child) => {
			children.push({ ...child.val(), id: child.key })
		})
		return children as T[]
	},
	listen: async function listen<T extends { id: string }> (path: string, callback: (doc: T | null) => void, conditions?: DatabaseGetClauses, updateStatus = false) {
		const ref = database.ref(path)
		const listener = buildDatabaseQuery(ref, conditions)
			.on('value', (snapshot) => {
				if (!snapshot.exists()) return callback(null)

				const children: any = {}
				snapshot.forEach((child) => {
					children[child.key!] = child.val()
				})
				const doc = { ...children, id: snapshot.key! } as T
				callback(doc)
			})
		if (updateStatus) {
			const key = Date.now()
			await ref.onDisconnect().update({
				[`status/connections/${key}`]: null,
				'status/lastSeen': firebase.database.ServerValue.TIMESTAMP
			})
			await ref.update({
				[`status/connections/${key}`]: true
			})
		}
		return () => ref.off('value', listener)
	},
	listenToMany: async function listenToMany<T extends { id: string }> (path: string, caller: (docs: T[]) => void, conditions?: DatabaseGetClauses) {
		const ref = database.ref(path)
		const listener = buildDatabaseQuery(ref, conditions)
			.on('value', (snapshot) => {
				if (!snapshot.exists()) return caller([])
				const children = [] as T[]
				snapshot.forEach((child) => {
					children.push({ ...child.val(), id: child.key })
				})
				caller(children)
			})
		return () => ref.off('value', listener)
	},
	create: async function create<T> (path: string, data: T) {
		// @ts-ignore
		data.dates = { createdAt: firebase.database.ServerValue.TIMESTAMP }
		const doc = await database.ref(path).push(data)
		return doc.key!
	},
	update: async function update<T> (path: string, data: T) {
		await database.ref(path).update(data)
	},
	delete: async (path: string) => {
		await database.ref(path).remove()
	}
}

export interface FUNCTIONS {
	toggleAdmin: { id: string, isAdmin: boolean },
	subscribeToMailingList: { email: string },
	requestNewSession: { session: Partial<SessionToModel> },
	acceptSession: { id: string, accepted: boolean },
	cancelSession: { id: string },
	makeStripePayment: { amount: number, currency: string },
	buyCoins: { amount: number, isGold: boolean },
	updateStreak: {},
	tipTutor: { tutorId: string, amount: number },
	rateTutor: { tutorId: string, rating: number, review: string | undefined },
	approveTutorApplication: { id: string, approved: boolean },
	markAsBestAnswer: { questionId: string, answerId: string }
	handleReport: { id: string, key: string, userId: string }
	newReferral: { referrerId: string, userId: string, email: string }
}

export interface FUNCTION_RETURNS {
	toggleAdmin: void,
	subscribeToMailingList: void,
	requestNewSession: string,
	acceptSession: void,
	cancelSession: void,
	makeStripePayment: string,
	buyCoins: void,
	updateStreak: { skip: boolean, increase: boolean, reset: boolean, streak: number },
	tipTutor: void,
	rateTutor: void,
	approveTutorApplication: void,
	markAsBestAnswer: void
	handleReport: void
	newReferral: void
}

export const FunctionsService = {
	call: async function call<T extends keyof FUNCTIONS> (name: T, data: FUNCTIONS[T]) {
		const callable = functions.httpsCallable(name)
		const result = await callable(data)
		return result.data as FUNCTION_RETURNS[T]
	}
}
