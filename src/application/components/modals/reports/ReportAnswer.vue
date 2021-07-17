<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Report Answer
		</template>
		<ReportForm :factory="factory" :error="error" :loading="loading" :submit="createReport" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateReport } from '@app/hooks/reports/answers'
import ReportForm from '@app/components/reports/AnswerReportForm.vue'
export default defineComponent({
	name: 'ReportAnswer',
	components: { ReportForm },
	setup () {
		const { factory, loading, error, message, createReport } = useCreateReport()
		return { factory, loading, error, message, createReport }
	}
})
</script>
