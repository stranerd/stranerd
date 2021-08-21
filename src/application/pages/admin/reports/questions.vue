<template>
	<QuestionReportsList />
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import QuestionReportsList from '@app/components/reports/questions/QuestionReportsList.vue'

export default defineComponent({
	name: 'QuestionReportsAdminPage',
	components: { QuestionReportsList },
	setup () {
		useMeta(() => ({
			title: 'Question Reports | Stranerd'
		}))
	},
	head: {}
})
</script>
