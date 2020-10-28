<template>
	<SubjectForm :submit="createSubject" :loading="loading" :factory="factory" :error="error">
		<template slot="title">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Create Subject
				</h4>
				<a @click.prevent="closeCreateModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		<template slot="buttonText">
			Create Subject
		</template>
	</SubjectForm>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/usecases/core/modals'
import { useCreateSubject } from '@app/usecases/courses/subjects'
import SubjectForm from '@app/components/courses/subjects/SubjectForm.vue'
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
