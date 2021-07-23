<template>
	<Modal :modal="$attrs.modal" :hide-separator="true">
		<template slot="title">
			Report User
		</template>
		<ReportForm :factory="factory" :error="error" :loading="loading" :submit="createReport" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateReport } from '@app/hooks/reports/users'
import ReportForm from '@app/components/reports/users/UserReportForm.vue'
export default defineComponent({
	name: 'ReportUser',
	components: { ReportForm },
	setup () {
		const { factory, loading, error, message, createReport } = useCreateReport()
		return { factory, loading, error, message, createReport }
	}
})
</script>
