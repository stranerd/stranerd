<template>
	<div class="mx-auto" style="max-width:75ch;">
		<UpgradeUserToTutor />
		<div v-for="tutor in tutors" :key="tutor.id" class="mb-3">
			<div class="d-flex flex-wrap justify-content-between align-items-center">
				<div class="text-truncate mb-1">
					<p class="lead mb-0 text-wrap">
						{{ tutor.name }}
					</p>
					<p class="small mb-0 text-wrap">
						{{ tutor.email }}
					</p>
				</div>
				<button class="btn btn-sm text-nowrap btn-danger" @click="removeTutor(tutor)">
					Remove tutor
				</button>
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
import { useTutorList, useTutorRoles } from '@app/usecases/users/roles/tutors'
import UpgradeUserToTutor from '@app/components/admin/users/UpgradeUserToTutor.vue'
export default defineComponent({
	name: 'AdminUsersTutorsPage',
	components: {
		UpgradeUserToTutor
	},
	layout: 'admin',
	setup () {
		const { loading: listLoading, error: listError, tutors } = useTutorList()
		const { loading: roleLoading, error: roleError, removeTutor } = useTutorRoles()
		return {
			listLoading, listError, tutors,
			roleLoading, roleError, removeTutor
		}
	}
})
</script>
