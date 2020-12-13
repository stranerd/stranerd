<template>
	<div>
		<TutorsListCard v-for="tutor in tutors" :key="tutor.id" :tutor="tutor" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useTutorList } from '@app/hooks/users/roles/tutors'
import TutorsListCard from '@app/components/admin/users/TutorsListCard.vue'
export default defineComponent({
	name: 'TutorsList',
	components: { TutorsListCard },
	setup () {
		const { loading, error, tutors } = useTutorList()
		return { loading, error, tutors }
	}
})
</script>
