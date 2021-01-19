<template>
	<div class="page-content">
		<UpgradeUserToTutor />
		<TutorsList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UpgradeUserToTutor from '@app/components/admin/users/UpgradeUserToTutor.vue'
import TutorsList from '@app/components/admin/users/TutorsList.vue'
export default defineComponent({
	name: 'AdminUsersTutorsPage',
	components: {
		UpgradeUserToTutor,
		TutorsList
	},
	layout: 'admin'
})
</script>
