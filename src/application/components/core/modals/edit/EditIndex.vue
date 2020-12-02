<template>
	<div>
		<EditSubject v-if="isEditModalSubject" />
		<EditTutorSubjects v-if="isEditModalTutorSubjects" />
		<EditAccountProfile v-if="isEditModalAccountProfile" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useEditModal } from '@app/hooks/core/modals'
import EditSubject from '@app/components/core/modals/edit/EditSubject.vue'
import EditTutorSubjects from '@app/components/core/modals/edit/EditTutorSubjects.vue'
import EditAccountProfile from '@app/components/core/modals/edit/EditAccountProfile.vue'
export default defineComponent({
	name: 'EditModalIndex',
	components: {
		EditSubject,
		EditTutorSubjects,
		EditAccountProfile
	},
	setup () {
		const { isEditModalSubject, isEditModalTutorSubjects, isEditModalAccountProfile } = useEditModal()
		return { isEditModalSubject, isEditModalTutorSubjects, isEditModalAccountProfile }
	}
})
</script>
