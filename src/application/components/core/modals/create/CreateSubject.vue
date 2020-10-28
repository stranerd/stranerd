<template>
	<SubjectForm :submit="createSubject" :loading="loading" :factory="factory">
		<template slot="title">
			<div class="d-flex align-items-baseline justify-content-between my-3">
				<i />
				<h4>Create Subject</h4>
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
export default defineComponent({
	name: 'CreateModalSubject',
	setup () {
		const { closeCreateModal } = useCreateModal()
		const { loading, createSubject, factory } = useCreateSubject()
		return {
			loading, createSubject, factory,
			closeCreateModal
		}
	}
})
</script>
