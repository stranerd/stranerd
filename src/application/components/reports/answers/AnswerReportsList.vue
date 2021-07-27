<template>
	<div class="d-flex flex-column gap-1">
		<AnswerReportCard />
		<AnswerReportCard />
		<AnswerReportCard />
		<AnswerReportCard />
		<!-- <DisplayWarning v-if="!loading && !error && answers.length === 0" message="No Answers found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AnswerReportCard from '@app/components/reports/answers/AnswerReportCard.vue'
export default defineComponent({
	name: 'AnswerReportsList',
	components: { AnswerReportCard }
})
</script>
