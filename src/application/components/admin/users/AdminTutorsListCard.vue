<template>
	<div :id="tutor.id" class="text-truncate mb-3">
		<div class="d-flex">
			<Avatar :src="tutor.avatar" :size="60" />
			<div class="ms-1">
				<p class="lead mb-0 text-wrap">
					{{ tutor.fullName }}
				</p>
				<p class="small mb-1 text-wrap">
					{{ tutor.email }}
				</p>
				<div class="d-flex flex-wrap small">
					<a class="text-blue mb-1 me-2" @click.prevent="openEditModal">
						<span>Manage tutor's subjects</span>
						<i class="fas fa-cog" />
					</a>
					<a class="text-danger mb-1" @click.prevent="removeTutor">
						<span>Remove from tutors list</span>
						<i class="fas fa-trash" />
					</a>
				</div>
			</div>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { setCurrentTutor, useTutorRoles } from '@app/hooks/users/roles/tutors'
import { useEditModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AdminTutorsListCard',
	props: {
		tutor: {
			type: Object as PropType<UserEntity>,
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
