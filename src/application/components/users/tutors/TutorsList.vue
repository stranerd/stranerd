<template>
	<div>
		<section class="d-flex align-items-center text-center">
			<h2 class="font-weight-bold">
				Top Nerds
			</h2>
			<form class="d-flex ml-auto">
				<select v-model="subjectId" class="form-control form-control-sm my-1">
					<option value="">
						All Subjects
					</option>
					<option v-for="subject in subjects" :key="subject.hash" :value="subject.id">
						{{ subject.name }}
					</option>
				</select>
			</form>
		</section>
		<div class="thick" />
		<div v-for="(tutor, index) in tutors" :key="tutor.hash">
			<TutorsListCard :tutor="tutor" :rank="index + 1" />
			<div class="thick" />
		</div>
		<DisplayWarning v-if="!loading && !error && tutors.length === 0" message="No tutors found." />
		<DisplayError :error="error" />
		<DisplayError :error="subError" />
		<PageLoading v-if="loading" />
		<PageLoading v-if="subLoading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { useSubjectList } from '@app/hooks/questions/subjects'
import { useTutorsList } from '@app/hooks/users/roles/tutors'
import TutorsListCard from '@app/components/users/tutors/TutorsListCard.vue'
export default defineComponent({
	name: 'TutorsList',
	components: { TutorsListCard },
	setup () {
		const { subjects, error: subError, loading: subLoading } = useSubjectList()
		const { subjectId, filteredTutors, listener, loading, error } = useTutorsList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			subjects, subError, subLoading,
			subjectId, tutors: filteredTutors, loading, error
		}
	}
})
</script>
