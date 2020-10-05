import { ref } from '@nuxtjs/composition-api'

export const usePassword = () => {
	const show = ref(false)
	const toggle = () => show.value = !show.value

	return { show, toggle }
}
