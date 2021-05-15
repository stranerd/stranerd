<template>
	<Modal :close="closeEditModal">
		<template slot="title">
			{{ tutorSubject ? 'Modify' : 'Assign' }} Nerd's Subject
		</template>
		<div v-if="tutorSubject">
			<div class="d-flex flex-column align-items-center gap-1">
				<img v-if="tutorSubject.icon" :src="tutorSubject.icon" alt="" height="50px">
				<p class="text-capitalize text-center mb-0">
					Currently Teaching <b>{{ tutorSubject.name }}</b>
				</p>
				<p class="text-center mb-0">
					Level {{ tutor.tutor.subject.level }}
				</p>
				<a class="text-danger" @click.prevent="removeSubject()">Remove</a>
			</div>
		</div>
		<div v-else>
			<div class="d-flex flex-wrap gap-3">
				<div v-for="subject in nonTutorSubjects" :key="subject.hash" class="d-flex flex-column align-items-center gap-1">
					<img v-if="subject.icon" :src="subject.icon" alt="" height="40px">
					<h5 class="text-capitalize mb-0">
						{{ subject.name }}
					</h5>
					<a class="text-success" @click.prevent="addSubject(subject.id)">Assign to Nerd</a>
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
		const tutorSubject = computed({
			get: () => subjects.value.find((s) => tutor.value?.subject?.id === s.id),
			set: () => {}
		})
		const nonTutorSubjects = computed({
			get: () => subjects.value.filter((s) => tutor.value?.subject?.id !== s.id),
			set: () => {}
		})
		const { closeEditModal } = useEditModal()
		return {
			tutLoading, tutError, addSubject, removeSubject,
			subLoading, subError, tutorSubject, nonTutorSubjects,
			tutor, closeEditModal
		}
	}
})
</script>
