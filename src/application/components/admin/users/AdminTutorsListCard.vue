<template>
	<div :id="tutor.id" class="text-truncate mb-1-5">
		<div class="d-flex gap-0-5">
			<Avatar :src="tutor.avatar" :size="60" />
			<div>
				<p class="lead mb-0 text-wrap">
					{{ tutor.fullName }}
				</p>
				<p class="small mb-0-5 text-wrap">
					{{ tutor.email }}
				</p>
				<div class="d-flex flex-wrap small gap-0-5">
					<a class="text-blue" @click.prevent="openEditModal">
						<span>Manage nerd's subject</span>
						<i class="fas fa-cog" />
					</a>
					<a class="text-danger" @click.prevent="removeTutor">
						<span>Remove from nerds list</span>
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
