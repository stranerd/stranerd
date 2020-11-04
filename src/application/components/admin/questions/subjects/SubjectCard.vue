<template>
	<div class="d-flex flex-column align-items-center">
		<img v-if="subject.icon" :src="subject.icon" :alt="subject.name" width="50">
		<h5 class="text-capitalize">
			{{ subject.name }}
		</h5>
		<div class="d-flex justify-content-center small flex-wrap">
			<a class="text-warning mr-2" @click.prevent="openEditModal">
				<span>Edit</span>
				<i class="fas fa-pen" />
			</a>
			<a class="text-danger" @click.prevent="deleteSubject">
				<span>Delete</span>
				<i class="fas fa-trash" />
			</a>
		</div>
		<PageLoading v-if="loading" />
		<p v-if="error" class="my-3 text-danger lead text-center">
			{{ error }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { SubjectEntity } from '@modules/questions'
import { setCurrentSubject, useDeleteSubject } from '@app/usecases/questions/subjects'
import { useEditModal } from '@app/usecases/core/modals'
export default defineComponent({
	props: {
		subject: {
			type: Object as PropType<SubjectEntity>,
			required: true
		}
	},
	setup (props) {
		const { loading, error, deleteSubject } = useDeleteSubject(props.subject)
		const openEditModal = () => {
			setCurrentSubject(props.subject)
			useEditModal().setEditModalSubject()
		}
		return { loading, error, deleteSubject, openEditModal }
	}
})
</script>
