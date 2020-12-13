<template>
	<div :id="tutor.id" class="text-truncate mb-3">
		<p class="lead mb-0 text-wrap">
			{{ tutor.name }}
		</p>
		<p class="small mb-1 text-wrap">
			{{ tutor.email }}
		</p>
		<div class="d-flex flex-wrap small">
			<a class="text-warning mb-1 mr-2" @click.prevent="openEditModal">
				<span>Manage tutor's subjects</span>
				<i class="fas fa-cog" />
			</a>
			<a class="text-danger mb-1" @click.prevent="removeTutor">
				<span>Remove from tutor's list</span>
				<i class="fas fa-trash" />
			</a>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { TutorEntity } from '@modules/users'
import { setCurrentTutor, useTutorRoles } from '@app/hooks/users/roles/tutors'
import { useEditModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'TutorsListCard',
	props: {
		tutor: {
			type: Object as PropType<TutorEntity>,
			required: true
		}
	},
	setup (props) {
		const { loading, error, removeTutor } = useTutorRoles()
		const openEditModal = () => {
			setCurrentTutor(props.tutor)
			useEditModal().setEditModalTutorSubjects()
		}
		return {
			loading, error,
			openEditModal,
			removeTutor: () => removeTutor(props.tutor)
		}
	}
})
</script>
