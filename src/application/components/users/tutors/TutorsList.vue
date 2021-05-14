<template>
	<div>
		<div class="d-flex align-items-center text-center">
			<h2 class="fw-bold mb-0">
				Top Nerds
			</h2>
			<form class="d-flex ms-auto">
				<SelectSubject :subject-id.sync="subjectId" class="form-control-sm my-1" />
			</form>
		</div>
		<div class="thick" />
		<div v-for="(tutor, index) in tutors" :key="tutor.hash">
			<TutorsListCard :tutor="tutor" :rank="index + 1" />
			<div class="thick" />
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
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
export default defineComponent({
	name: 'TutorsList',
	components: { SelectSubject, TutorsListCard },
	setup () {
		const { subjectId, filteredTutors, listener, loading, error } = useTutorsList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { subjectId, tutors: filteredTutors, loading, error }
	}
})
</script>
