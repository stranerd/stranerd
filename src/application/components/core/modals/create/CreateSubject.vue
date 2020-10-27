<template>
	<!-- <subject-form :submit="createSubject" :loading="loading" :factory="factory">
		<template slot="title">
			<div class="d-flex align-items-baseline justify-content-between my-3">
				<i></i>
				<h4>Create Subject</h4>
				<a @click.prevent="closeCreateModal"><i class="fas fa-times text-danger"></i></a>
			</div>
		</template>
		<template slot="buttonText">Create Subject</template>
	</subject-form> -->
	<div>
		<h1>Subject Modal</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCreateModal } from '@app/usecases/core/modals'
import { useCreateSubject } from '@app/usecases/courses/subjects'
export default defineComponent({
	name: 'CreateSubject',
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
