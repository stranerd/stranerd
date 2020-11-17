<template>
	<div>
		<EditSubject v-if="isEditModalSubject" />
		<EditTutorSubjects v-if="isEditModalTutorSubjects" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useEditModal } from '@app/hooks/core/modals'
import EditSubject from '@app/components/core/modals/edit/EditSubject.vue'
import EditTutorSubjects from '@app/components/core/modals/edit/EditTutorSubjects.vue'
export default defineComponent({
	name: 'EditModalIndex',
	components: {
		EditSubject,
		EditTutorSubjects
	},
	setup () {
		const { isEditModalSubject, isEditModalTutorSubjects } = useEditModal()
		return { isEditModalSubject, isEditModalTutorSubjects }
	}
})
</script>
