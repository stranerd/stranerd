import { ref } from '@nuxtjs/composition-api'

export const usePassword = () => {
	const show = ref(false)
	const toggle = () => show.value = !show.value

	return { show, toggle }
}

export const useFileInputs = (singleCB: (file: File) => void) => {
	const catchFiles = (e: Event) => {
		const file = (e.target as HTMLInputElement)?.files?.[0] ?? undefined
		if (file) singleCB(file)
	}
	return { catchFiles }
}

export const useMultipleFileInputs = (multipleCB: (files: File[]) => void) => {
	const catchMultipleFiles = (e: Event) => {
		const fileList = (e.target as HTMLInputElement)?.files ?? []
		const files: File[] = []
		for (let i = 0; i < fileList.length; i++) files.push(fileList[i])
		multipleCB(files)
	}
	return { catchMultipleFiles }
}
