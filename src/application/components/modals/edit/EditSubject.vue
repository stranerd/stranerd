<template>
	<Modal :close="closeEditModal">
		<template slot="title">
			Edit Subject
		</template>
		<SubjectForm :submit="editSubject" :loading="loading" :factory="factory" :error="error">
			<template slot="buttonText">
				Update Subject
			</template>
		</SubjectForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useEditModal } from '@app/hooks/core/modals'
import { useEditSubject } from '@app/hooks/questions/subjects'
import SubjectForm from '@app/components/admin/questions/subjects/SubjectForm.vue'
export default defineComponent({
	name: 'EditModalSubject',
	components: { SubjectForm },
	setup () {
		const { closeEditModal } = useEditModal()
		const { loading, editSubject, factory, error } = useEditSubject()
		return {
			loading, editSubject, factory, error,
			closeEditModal
		}
	}
})
</script>
