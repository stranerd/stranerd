<template>
	<div>
		<div class="page-content">
			<UpgradeUserToTutor />
			<TutorsList />
		</div>
		<div class="page-content">
			<TutorApplicationList />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UpgradeUserToTutor from '@app/components/admin/users/UpgradeUserToTutor.vue'
import TutorsList from '@app/components/admin/users/AdminTutorsList.vue'
import TutorApplicationList from '@app/components/users/tutorApplication/TutorApplicationList.vue'
export default defineComponent({
	name: 'AdminUsersTutorsPage',
	components: {
		UpgradeUserToTutor,
		TutorsList,
		TutorApplicationList
	},
	layout: 'admin'
})
</script>
