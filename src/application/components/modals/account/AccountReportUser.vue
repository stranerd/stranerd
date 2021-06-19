<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Report User
		</template>
		<ReportForm :factory="factory" :error="error" :loading="loading" :submit="createReport" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateReport } from '@app/hooks/forms/reports'
import ReportForm from '@app/components/forms/ReportForm.vue'
export default defineComponent({
	name: 'AccountReportUser',
	components: { ReportForm },
	setup () {
		const { factory, loading, error, message, createReport } = useCreateReport()
		return { factory, loading, error, message, createReport }
	}
})
</script>
