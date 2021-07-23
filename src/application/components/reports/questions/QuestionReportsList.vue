<template>
	<div class="d-flex flex-column gap-1">
		<QuestionReportCard />
		<QuestionReportCard />
		<QuestionReportCard />
		<QuestionReportCard />
		<!-- <DisplayWarning v-if="!loading && !error && questions.length === 0" message="No questions found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionReportCard from '@app/components/reports/questions/QuestionReportCard.vue'
export default defineComponent({
	name: 'QuestionReportsList',
	components: { QuestionReportCard }
})
</script>
