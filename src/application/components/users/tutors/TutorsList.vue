<template>
	<div>
		<h2 class="mb-0">
			Top Nerds
		</h2>
		<div class="thick" />
		<div v-for="(tutor, index) in tutors.slice(0, 10)" :key="tutor.hash">
			<TutorsListCard :tutor="tutor" :rank="index + 1" />
		</div>
		<div v-if="tutors.length > 10" class="text-center py-0-5 text-18">
			<NuxtLink class="fw-bold" to="/nerds">
				VIEW MORE
			</NuxtLink>
		</div>
		<DisplayWarning v-if="!loading && !error && tutors.length === 0" message="No nerds found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { useTutorsList } from '@app/hooks/users/roles/tutors'
import TutorsListCard from '@app/components/users/tutors/TutorsListCard.vue'
export default defineComponent({
	name: 'TutorsList',
	components: { TutorsListCard },
	setup () {
		const { subjectId, tutors, listener, loading, error } = useTutorsList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { subjectId, tutors, loading, error }
	}
})
</script>
