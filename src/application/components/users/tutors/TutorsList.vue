<template>
	<div>
		<div class="d-flex flex-column align-items-center">
			<h1>Find Top Nerds to have One-On-One Chat Sessions with, for help with your homework and study problems.</h1>
			<div class="search-container mt-2 mb-4">
				<SelectSubject :subject-id.sync="subjectId" />
			</div>
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
	.search-container {
		display: flex;
		border-radius: 12px;
		box-shadow: -5px 5px 15px rgba($color-primary, 0.1);

		select, /deep/ select {
			flex-grow: 1;
			color: $color-sub;
			height: 64px;
			border-radius: 12px 0 0 12px !important;
			box-sizing: border-box;
			padding: 0 32px;
			border: 0;
			background-color: $color-white;
			appearance: none;
			outline: 0 !important;
			-webkit-appearance: none;
		}
	}

	h1 {
		color: $color-dark;
		text-align: center;
		font-size: 1.5rem;
		max-width: 80%;
		line-height: 32px;
		margin: 0;
	}
</style>
