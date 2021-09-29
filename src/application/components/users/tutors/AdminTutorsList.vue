<template>
	<div class="d-flex flex-column gap-1">
		<TutorsListCard v-for="tutor in tutors" :key="tutor.hash" :tutor="tutor" />
		<DisplayWarning
			v-if="!loading && !error && tutors.length === 0"
			:message="`No tutors found${isTutor ? 'apart from you' : ''}`"
		/>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useTutorsList } from '@app/hooks/users/roles/tutors'
import TutorsListCard from '@app/components/users/tutors/AdminTutorsListCard.vue'
import { useAuth } from '@app/hooks/auth/auth'

export default defineComponent({
	name: 'AdminTutorsList',
	components: { TutorsListCard },
	setup () {
		const { isTutor } = useAuth()
		const { loading, error, adminTutors } = useTutorsList()
		return { isTutor, loading, error, tutors: adminTutors }
	}
})
</script>
