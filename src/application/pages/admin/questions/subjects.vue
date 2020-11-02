<template>
	<div>
		<div class="d-flex justify-content-end mb-4">
			<button class="btn btn-lg btn-success" @click="setCreateModalSubject">
				Add New Subject
			</button>
		</div>
		<hr>
		<div class="grid mb-4">
			<AdminSubjectCard v-for="subject in subjects" :key="subject.hash" :subject="subject" />
		</div>
		<PageLoading v-if="loading" />
		<p v-if="error" class="my-3 text-danger lead text-center">
			{{ error }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSubjectList } from '@app/usecases/questions/subjects'
import { useCreateModal } from '@app/usecases/core/modals'
import AdminSubjectCard from '@app/components/admin/questions/subjects/SubjectCard.vue'
export default defineComponent({
	name: 'AdminSubjectsPage',
	components: {
		AdminSubjectCard
	},
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
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 2rem;
}
@media (min-width: $md) {
	.grid{
		grid-template-columns: repeat(3, 1fr);
	}
}
@media (min-width: $lg) {
	.grid{
		grid-template-columns: repeat(4, 1fr);
	}
}
</style>
