<template>
	<div class="mb-1 px-1 py-1 d-flex flex-row wrapper" style="align-items:center;">
		<div class="subject-custom">
			Mathematics
		</div>
		<div style="margin-left:auto;font-size:14px;" class="text-danger">
			Delete
		</div>
	</div>
	<!-- <div :id="subject.id" class="d-flex flex-column align-items-center">
		<img v-if="subject.icon" :src="subject.icon" :alt="subject.name" width="50">
		<h5 class="text-capitalize">
			{{ subject.name }}
		</h5>
		<div class="d-flex justify-content-center small flex-wrap">
			<a class="text-success me-1" @click.prevent="openEditModal">
				<span>Edit</span>
				<i class="fas fa-pen" />
			</a>
			<a class="text-danger" @click.prevent="deleteSubject">
				<span>Delete</span>
				<i class="fas fa-trash" />
			</a>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div> -->
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { SubjectEntity } from '@modules/questions'
import { setCurrentSubject, useDeleteSubject } from '@app/hooks/questions/subjects'
import { useEditModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AdminSubjectsListCard',
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
			useEditModal().openSubject()
		}
		return { loading, error, deleteSubject, openEditModal }
	}
})
</script>
<style lang="scss" scoped>
.subject-custom {
	font-weight: bold;
	font-size: 17px;
	color: $color-text-main;
}

.wrapper {
	border: 1px solid $color-line;
	border-radius: 5px;
	background-color: $color-tags;
}
</style>
