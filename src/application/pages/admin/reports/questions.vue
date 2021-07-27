<template>
	<QuestionReportsList />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionReportsList from '@app/components/reports/questions/QuestionReportsList.vue'
export default defineComponent({
	name: 'QuestionReportsAdminPage',
	components: { QuestionReportsList }
})
</script>
