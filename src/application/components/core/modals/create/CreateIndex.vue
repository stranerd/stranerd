<template>
	<div>
		<CreateSubject v-if="isCreateModalSubject" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/usecases/core/modals'
import CreateSubject from '@app/components/core/modals/create/CreateSubject.vue'
export default defineComponent({
	name: 'CreateModalIndex',
	components: {
		CreateSubject
	},
	setup () {
		const { isCreateModalSubject } = useCreateModal()
		return { isCreateModalSubject }
	}
})
</script>
