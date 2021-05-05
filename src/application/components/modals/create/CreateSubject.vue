<template>
	<Modal :close="closeCreateModal">
		<template slot="title">
			Create Subject
		</template>
		<SubjectForm :submit="createSubject" :loading="loading" :factory="factory" :error="error">
			<template slot="buttonText">
				Create Subject
			</template>
		</SubjectForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import { useCreateSubject } from '@app/hooks/questions/subjects'
import SubjectForm from '@app/components/admin/questions/subjects/SubjectForm.vue'
export default defineComponent({
	name: 'CreateModalSubject',
	components: { SubjectForm },
	setup () {
		const { closeCreateModal } = useCreateModal()
		const { loading, createSubject, factory, error } = useCreateSubject()
		return {
			loading, createSubject, factory, error,
			closeCreateModal
		}
	}
})
</script>
