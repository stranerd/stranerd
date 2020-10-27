<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCreateModal } from '@app/usecases/core/modals'
export default defineComponent({
	setup () {
		const { isCreateModalSubject } = useCreateModal()
		return { isCreateModalSubject }
	}
})
</script>
