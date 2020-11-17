<template>
	<div class="mx-auto" style="max-width:75ch;">
		<UpgradeUserToTutor />
		<AdminTutorCard v-for="tutor in tutors" :key="tutor.hash" :tutor="tutor" />
		<PageLoading v-if="loading" />
		<p v-if="error" class="text-danger text-center my-3">
			{{ error }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useTutorList } from '@app/hooks/users/roles/tutors'
import UpgradeUserToTutor from '@app/components/admin/users/UpgradeUserToTutor.vue'
import AdminTutorCard from '@app/components/admin/users/TutorCard.vue'
export default defineComponent({
	name: 'AdminUsersTutorsPage',
	components: {
		UpgradeUserToTutor,
		AdminTutorCard
	},
	layout: 'admin',
	setup () {
		const { loading, error, tutors } = useTutorList()
		return { loading, error, tutors }
	}
})
</script>
