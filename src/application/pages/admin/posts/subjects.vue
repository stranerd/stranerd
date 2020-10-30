<template>
	<div>
		<div class="d-flex justify-content-end mb-4">
			<button class="btn btn-lg btn-success" @click="setCreateModalSubject">
				Add New Subject
			</button>
		</div>
		<hr>
		<div class="grid">
			<div v-for="subject in subjects" :key="subject.hash" :subject="subject" class="d-flex flex-column align-items-center">
				<img v-if="subject.icon" :src="subject.icon" :alt="subject.name" width="50">
				<h5 class="text-capitalize">
					{{ subject.name }}
				</h5>
				<div class="d-flex justify-content-center small flex-wrap">
					<a class="text-warning mr-2" @click.prevent="">
						<span>Edit</span>
						<i class="fas fa-pen" />
					</a>
					<a class="text-danger" @click.prevent="deleteSubject(subject)">
						<span>Delete</span>
						<i class="fas fa-trash" />
					</a>
				</div>
			</div>
		</div>
		<PageLoading v-if="subLoading || delLoading" />
		<p v-if="subError" class="my-3 text-danger lead text-center">
			{{ subError }}
		</p>
		<p v-if="delError" class="my-3 text-danger lead text-center">
			{{ delError }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useDeleteSubject, useSubjectList } from '@app/usecases/posts/subjects'
import { useCreateModal } from '@app/usecases/core/modals'
export default defineComponent({
	name: 'AdminSubjectsPage',
	layout: 'admin',
	setup () {
		const { loading: subLoading, error: subError, subjects } = useSubjectList()
		const { loading: delLoading, error: delError, deleteSubject } = useDeleteSubject()
		return {
			subLoading, subError, subjects,
			delLoading, delError, deleteSubject,
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
