<template>
	<div class="d-flex flex-column gap-2">
		<UpgradeUserToTutor />
		<TutorsList />
	</div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import UpgradeUserToTutor from '@app/components/users/tutors/UpgradeUserToTutor.vue'
import TutorsList from '@app/components/users/tutors/AdminTutorsList.vue'

export default defineComponent({
	name: 'AdminUsersTutorsPage',
	components: {
		UpgradeUserToTutor,
		TutorsList
	},
	layout: 'tutor',
	setup () {
		useMeta(() => ({
			title: 'Tutors | Stranerd'
		}))
	},
	head: {}
})
</script>
