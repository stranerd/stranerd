<template>
	<div>
		<div class="d-flex flex-column align-items-center">
			<h1>
				Find Top Nerds to have One-On-One Chat Sessions with, for help with your homework and study
				problems.
			</h1>
			<SelectSubject :subject-id.sync="subjectId" class="select mt-1 mt-md-2 mb-2 mb-md-4" />
		</div>
		<TutorsListCard v-for="tutor in tutors" :key="tutor.hash" :tutor="tutor" />
		<DisplayWarning v-if="!loading && !error && tutors.length === 0" message="No nerds found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { useTutorsList } from '@app/hooks/users/roles/tutors'
import TutorsListCard from '@app/components/users/tutors/TutorsListCard.vue'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'

export default defineComponent({
	name: 'TutorsList',
	components: { TutorsListCard, SelectSubject },
	setup () {
		const { subjectId, filteredTutors: tutors, listener, loading, error } = useTutorsList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { subjectId, tutors, loading, error }
	}
})
</script>

<style lang="scss" scoped>
	.select {
		flex-grow: 1;
		color: $color-sub;
		box-sizing: border-box;
		max-width: 400px;
		margin: 0 auto;
		border-radius: 12px;
		box-shadow: -5px 5px 15px rgba($color-primary, 0.1);
		border: 1px solid $color-line;
		background-color: $color-white;
		padding: 0.5rem;
	}

	h1 {
		color: $color-dark;
		text-align: center;
		margin: 0;
		font-size: 18px;
		line-height: 1.35em;
		@media (min-width: $md) {
			max-width: 80%;
			font-size: 1.5rem;
		}
	}
</style>
