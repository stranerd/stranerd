<template>
	<AnswerReportsList />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AnswerReportsList from '@app/components/reports/answers/AnswerReportsList.vue'
export default defineComponent({
	name: 'AnswerReportsAdminPage',
	components: { AnswerReportsList }
})
</script>
