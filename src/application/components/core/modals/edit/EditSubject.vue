<template>
	<Modal>
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Edit Subject
				</h4>
				<a @click.prevent="closeEditModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
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
import { useEditModal } from '@app/usecases/core/modals'
import { useEditSubject } from '@app/usecases/posts/subjects'
import SubjectForm from '@app/components/posts/subjects/SubjectForm.vue'
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
