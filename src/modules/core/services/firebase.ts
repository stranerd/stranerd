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
				const { start, end, equal } = conditions.order.condition
				if (start) ref = ref.startAt(start)
				if (end) ref = ref.endAt(end)
				if (equal) ref = ref.equalTo(equal)
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

export const FunctionsService = {
	call: async (name: string, data: any) => {
		const callable = functions.httpsCallable(name)
		const result = await callable(data)
		return result.data
	}
}

export const DatabaseService = {
	get: async (path: string, conditions?: DatabaseGetClauses) => {
		let ref: firebase.database.Query = database.ref(path)
		ref = buildDatabaseQuery(ref, conditions)
		const doc = await ref.once('value')
		const children: any = {}
		doc.forEach((child) => {
			children[child.key!] = child.val()
		})
		return { ...children, id: doc.key! }
	},
	getMany: async (path: string, conditions?: DatabaseGetClauses) => {
		let ref: firebase.database.Query = database.ref(path)
		ref = buildDatabaseQuery(ref, conditions)
		const doc = await ref.once('value')
		const children: any = []
		doc.forEach((child) => {
			children.push({ ...child.val(), id: child.key })
		})
		return children
	},
	listen: async (path: string, callback: (doc: any) => void, conditions?: DatabaseGetClauses) => {
		let ref: firebase.database.Query = database.ref(path)
		ref = buildDatabaseQuery(ref, conditions)
		const listener = ref.on('value', (snapshot) => {
			if (!snapshot.exists) return callback(null)

			const children: any = {}
			snapshot.forEach((child) => {
				children[child.key!] = child.val()
			})
			const doc = { ...children, id: snapshot.key! }
			callback(doc)
		})
		return () => ref.off('value', listener)
	},
	listenToMany: async (path: string, callback: (docs: any[]) => void, conditions?: DatabaseGetClauses) => {
		let ref: firebase.database.Query = database.ref(path)
		ref = buildDatabaseQuery(ref, conditions)
		const listener = ref.on('value', (snapshot) => {
			const children: any = []
			snapshot.forEach((child) => {
				children.push({ ...child.val(), id: child.key })
			})
			callback(children)
		})
		return () => ref.off('value', listener)
	},
	create: async (path: string, data: any) => {
		data.dates = { createdAt: firebase.database.ServerValue.TIMESTAMP }
		const doc = await database.ref(path).push(data)
		return doc.key!
	},
	update: async (path: string, data: { [key: string]: any }) => {
		await database.ref(path).update(data)
	},
	delete: async (path: string) => {
		await database.ref(path).remove()
	}
}
