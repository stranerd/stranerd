<template>
	<div>
		<div class="page-content">
			<div class="d-flex justify-content-end">
				<button class="btn btn-lg btn-blue text-white" @click="openSubject">
					Add New Subject
				</button>
			</div>
			<div class="thick mx-n2 mb-2" />
			<SubjectsList />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SubjectsList from '@app/components/questions/subjects/AdminSubjectsList.vue'
import { useCreateModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AdminQuestionsSubjectsPage',
	components: { SubjectsList },
	layout: 'admin',
	setup () {
		return { openSubject: useCreateModal().openSubject }
	}
})
</script>
