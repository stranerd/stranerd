<template>
	<div class="mx-auto" style="max-width:75ch;">
		<UpgradeUserToTutor />
		<div v-for="tutor in tutors" :key="tutor.hash" class="text-truncate mb-3">
			<p class="lead mb-0 text-wrap">
				{{ tutor.name }}
			</p>
			<p class="small mb-1 text-wrap">
				{{ tutor.email }}
			</p>
			<div class="d-flex flex-wrap small">
				<a class="text-warning mb-1 mr-2" @click.prevent="openEditModal(tutor)">
					<span>Manage tutor's subjects</span>
					<i class="fas fa-cog" />
				</a>
				<a class="text-danger mb-1" @click.prevent="removeTutor(tutor)">
					<span>Remove from tutor's list</span>
					<i class="fas fa-trash" />
				</a>
			</div>
		</div>
		<PageLoading v-if="listLoading || roleLoading" />
		<p v-if="listError" class="text-danger text-center my-3">
			{{ listError }}
		</p>
		<p v-if="roleError" class="text-danger text-center my-3">
			{{ roleError }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { setCurrentTutor, useTutorList, useTutorRoles } from '@app/usecases/users/roles/tutors'
import UpgradeUserToTutor from '@app/components/admin/users/UpgradeUserToTutor.vue'
import { useEditModal } from '@app/usecases/core/modals'
import { TutorEntity } from '@modules/users/domain/entities/tutor'
export default defineComponent({
	name: 'AdminUsersTutorsPage',
	components: {
		UpgradeUserToTutor
	},
	layout: 'admin',
	setup () {
		const { loading: listLoading, error: listError, tutors } = useTutorList()
		const { loading: roleLoading, error: roleError, removeTutor } = useTutorRoles()
		const openEditModal = (tutor: TutorEntity) => {
			setCurrentTutor(tutor)
			useEditModal().setEditModalTutorSubjects()
		}
		return {
			listLoading, listError, tutors,
			roleLoading, roleError, removeTutor,
			openEditModal
		}
	}
})
</script>
