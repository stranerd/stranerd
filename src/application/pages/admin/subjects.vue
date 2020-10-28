<template>
	<div>
		<div class="d-flex justify-content-end mb-4">
			<button class="btn btn-lg btn-success" @click="setCreateModalSubject">
				Add New Subject
			</button>
		</div>
		<hr>
		<PageLoading v-if="loading" />
		<div class="grid">
			<div v-for="subject in subjects" :key="subject.hash" :subject="subject">
				{{ subject }}
			</div>
		</div>
		<p v-if="error" class="mt-4 text-danger lead text-center">
			{{ error }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSubjectList } from '@app/usecases/courses/subjects'
import { useCreateModal } from '@app/usecases/core/modals'
export default defineComponent({
	name: 'AdminSubjectsPage',
	layout: 'admin',
	setup () {
		const { loading, error, subjects } = useSubjectList()
		return {
			loading, error, subjects,
			setCreateModalSubject: useCreateModal().setCreateModalSubject
		}
	}
})
</script>

<style lang="scss" scoped>
.grid{
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 2rem;
}
@media (min-width: $lg) {
	.grid{
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
