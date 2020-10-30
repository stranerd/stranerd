<template>
	<div>
		<EditTutorSubjects v-if="isEditModalTutorSubjects" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useEditModal } from '@app/usecases/core/modals'
import EditTutorSubjects from '@app/components/core/modals/edit/EditTutorSubjects.vue'
export default defineComponent({
	name: 'EditModalIndex',
	components: {
		EditTutorSubjects
	},
	setup () {
		const { isEditModalTutorSubjects } = useEditModal()
		return { isEditModalTutorSubjects }
	}
})
</script>
