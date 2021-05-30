<template>
	<div>
		<h2>Nerd Applications</h2>
		<div class="thick" />
		<div v-for="application in applications" :key="application.hash">
			<TutorApplicationListCard :application="application" />
			<div class="thick" />
		</div>
		<div v-if="hasMore" class="text-center text-18">
			<div class="thick my-0" />
			<a class="fw-bold text-grey" @click.prevent="fetchOlderApplications">LOAD MORE</a>
		</div>
		<DisplayWarning v-if="!loading && !error && applications.length === 0" message="No new nerd application found" />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { useTutorApplicationList } from '@app/hooks/users/tutorApplication'
import TutorApplicationListCard from '@app/components/users/tutorApplication/TutorApplicationListCard.vue'
export default defineComponent({
	name: 'TutorApplicationList',
	components: { TutorApplicationListCard },
	setup () {
		const { loading, error, hasMore, listener, fetchOlderApplications, applications } = useTutorApplicationList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { loading, error, hasMore, fetchOlderApplications, applications }
	}
})
</script>
