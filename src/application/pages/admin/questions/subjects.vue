<template>
	<div class="d-flex flex-column gap-1 gap-md-2">
		<SubjectForm :submit="createSubject" :loading="loading" :factory="factory" :error="error">
			<template slot="buttonText">
				Add
			</template>
		</SubjectForm>
		<SubjectsList />
	</div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import SubjectsList from '@app/components/questions/subjects/AdminSubjectsList.vue'
import { useCreateSubject } from '@app/hooks/questions/subjects'
import SubjectForm from '@app/components/questions/subjects/SubjectForm.vue'
export default defineComponent({
	name: 'AdminQuestionsSubjectsPage',
	components: { SubjectsList, SubjectForm },
	layout: 'admin',
	setup () {
		const { loading, createSubject, factory, error } = useCreateSubject()
		useMeta(() => ({
			title: 'List of Subjects | Stranerd'
		}))
		return { loading, createSubject, factory, error }
	},
	head: {}
})
</script>
