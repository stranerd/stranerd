<template>
	<Modal :close="closeEditModal">
		<template slot="title">
			Edit Tutor Subjects
		</template>
		<div>
			<h4>Currently Teaching</h4>
			<div class="d-flex flex-wrap">
				<div v-for="subject in tutorSubjects" :key="subject.subject.hash" class="d-flex flex-column align-items-center mb-3 me-3">
					<img v-if="subject.subject.icon" :src="subject.subject.icon" alt="" height="40px">
					<h5 class="text-capitalize">
						{{ subject.subject.name }}
					</h5>
					<h6>
						Level {{ subject.level }}
					</h6>
					<a class="text-danger" @click.prevent="removeSubject(subject.id)">Remove</a>
				</div>
			</div>
			<hr>
			<h4>Currently Not Teaching</h4>
			<div class="d-flex flex-wrap">
				<div v-for="subject in nonTutorSubjects" :key="subject.hash" class="d-flex flex-column align-items-center me-3 mb-3">
					<img v-if="subject.icon" :src="subject.icon" alt="" height="40px">
					<h5 class="text-capitalize">
						{{ subject.name }}
					</h5>
					<a class="text-success" @click.prevent="addSubject(subject.id)">Add To List</a>
				</div>
			</div>
		</div>
		<PageLoading v-if="subLoading || tutLoading" />
		<p v-if="tutError" class="text-danger text-center my-3">
			{{ tutError }}
		</p>
		<p v-if="subError" class="text-danger text-center my-3">
			{{ subError }}
		</p>
	</Modal>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useEditModal } from '@app/hooks/core/modals'
import { useSubjectList } from '@app/hooks/questions/subjects'
import { useSingleTutor } from '@app/hooks/users/roles/tutors'
export default defineComponent({
	name: 'EditModalTutorSubject',
	setup () {
		const { loading: subLoading, subjects, error: subError } = useSubjectList()
		const {
			loading: tutLoading, tutor, error: tutError,
			addSubject, removeSubject
		} = useSingleTutor()
		const tutorSubjects = computed({
			get: () => tutor.value?.subjects?.map?.((c) => {
				const subject = subjects.value.find((s) => c.id === s.id)
				if (!subject) return null
				return { ...c, subject }
			})?.filter?.((c) => !!c) ?? [],
			set: () => {}
		})
		const nonTutorSubjects = computed({
			get: () => subjects.value.filter((s) => !tutor
				.value?.subjects?.find?.((c) => c.id === s.id)
			), set: () => {}
		})
		const { closeEditModal } = useEditModal()
		return {
			tutLoading, tutError, addSubject, removeSubject,
			subLoading, subError, tutorSubjects, nonTutorSubjects,
			closeEditModal
		}
	}
})
</script>
