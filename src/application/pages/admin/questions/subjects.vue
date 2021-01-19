<template>
	<div class="page-content">
		<div class="d-flex justify-content-end">
			<button class="btn btn-lg btn-accent text-white" @click="setCreateModalSubject">
				Add New Subject
			</button>
		</div>
		<hr class="thick mb-4">
		<SubjectsList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SubjectsList from '@app/components/admin/questions/subjects/AdminSubjectsList.vue'
import { useCreateModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AdminQuestionsSubjectsPage',
	components: { SubjectsList },
	layout: 'admin',
	setup () {
		return { setCreateModalSubject: useCreateModal().setCreateModalSubject }
	}
})
</script>
