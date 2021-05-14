<template>
	<div>
		<div class="grid my-2">
			<SubjectCard v-for="subject in subjects" :key="subject.hash" :subject="subject" />
		</div>
		<DisplayWarning v-if="!loading && !error && subjects.length === 0" message="No subjects found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSubjectList } from '@app/hooks/questions/subjects'
import SubjectCard from '@app/components/admin/questions/subjects/AdminSubjectsListCard.vue'
export default defineComponent({
	name: 'AdminSubjectsList',
	components: { SubjectCard },
	layout: 'admin',
	setup () {
		const { loading, error, subjects } = useSubjectList()
		return { loading, error, subjects }
	}
})
</script>

<style lang="scss" scoped>
.grid{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 2rem 1rem;
}
@media (min-width: $sm) {
	.grid{
		grid-template-columns: repeat(3, 1fr);
	}
}
@media (min-width: $md) {
	.grid{
		grid-template-columns: repeat(4, 1fr);
	}
}
</style>
