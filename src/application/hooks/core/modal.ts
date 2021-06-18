import { reqRef } from '@nuxtjs/composition-api'
import { VueConstructor } from 'vue/types/umd'

const stack = reqRef([] as string[])

function spreadModals<T> (modals: Record<string, T>, type: string) {
	return Object.fromEntries(Object.entries(modals).map(([key, val]) => [type + key, val]))
}

export function useModal<Type extends string, Key extends string = string> (modalTypes: Record<Type, Record<Key, VueConstructor>>) {
	const modals = Object.entries<Record<Key, VueConstructor>>(modalTypes)
		.map(([type, modals]) => spreadModals(modals, type))
		.reduce((acc, cur) => ({ ...acc, ...cur }), {})

	function addToStack (id: string) {
		removeFromStack(id)
		if (Object.keys(modals).includes(id)) stack.value.push(id)
	}

	function removeFromStack (id: string) {
		const index = stack.value.findIndex((i) => i === id)
		if (index > -1) stack.value.splice(index)
	}

	function getModalHelpers<K extends string = string, T = any> (modals: Record<K, T>, type: Type) {
		const helpers = Object.fromEntries(Object.keys(modals).map((key) => [
			[[`open${key}`], () => addToStack(type + key)],
			[[`close${key}`], () => removeFromStack(type + key)]
		]).reduce((acc, curr) => acc.concat(curr), [])) as Record<`open${K}` | `close${K}`, () => void>

		const closeAll = () => Object.keys(modals).forEach((key) => removeFromStack(type + key))

		return { ...helpers, closeAll }
	}

	return { stack, addToStack, removeFromStack, modals, getModalHelpers }
}
