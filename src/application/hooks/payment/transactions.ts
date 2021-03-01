import { Ref, reqSsrRef, useFetch } from '@nuxtjs/composition-api'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { GetOlderTransactions, GetTransactions, TransactionEntity } from '@modules/payment'
import { PAGINATION_LIMIT } from '@utils/constants'

const global = {} as Record<string, {
	transactions: Ref<TransactionEntity[]>
	hasMore: Ref<boolean>
	fetched: Ref<boolean>
	error: Ref<string>, setError: (error: any) => void
	loading: Ref<boolean>, setLoading: (loading: boolean) => void
}>

const pushToTransactionList = (userId: string, transaction: TransactionEntity) => {
	const index = global[userId].transactions.value.findIndex((t) => t.id === transaction.id)
	if (index !== -1) global[userId].transactions.value.splice(index, 1, transaction)
	else global[userId].transactions.value.push(transaction)
}

const unshiftToTransactionList = (userId: string, transaction: TransactionEntity) => {
	const index = global[userId].transactions.value.findIndex((t) => t.id === transaction.id)
	if (index !== -1) global[userId].transactions.value.splice(index, 1, transaction)
	else global[userId].transactions.value.unshift(transaction)
}

export const useTransactionList = (userId: string) => {
	if (global[userId] === undefined) global[userId] = {
		transactions: reqSsrRef([]),
		hasMore: reqSsrRef(false),
		fetched: reqSsrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchTransactions = async () => {
		global[userId].setError('')
		global[userId].setLoading(true)
		try {
			const lastDate = global[userId].transactions.value[0]?.createdAt
			const transactions = await GetTransactions.call(userId, lastDate ? new Date(lastDate) : undefined)
			global[userId].hasMore.value = transactions.length === PAGINATION_LIMIT + 1
			transactions.slice(0, PAGINATION_LIMIT).reverse().forEach((t) => unshiftToTransactionList(userId, t))
			global[userId].fetched.value = true
		} catch (e) { global[userId].setError(e) }
		global[userId].setLoading(false)
	}

	const fetchOlderTransactions = async () => {
		global[userId].setError('')
		global[userId].setLoading(true)
		try {
			const lastDate = global[userId].transactions.value[global[userId].transactions.value.length - 1]?.createdAt
			const transactions = await GetOlderTransactions.call(userId, lastDate ? new Date(lastDate) : undefined)
			global[userId].hasMore.value = transactions.length === PAGINATION_LIMIT + 1
			transactions.slice(0, PAGINATION_LIMIT).forEach((t) => pushToTransactionList(userId, t))
		} catch (e) { global[userId].setError(e) }
		global[userId].setLoading(false)
	}

	useFetch(async () => {
		if (!global[userId].fetched.value) await fetchTransactions()
	})

	return { ...global[userId], fetchOlderTransactions }
}
