<template>
	<Modal :show-separator="false">
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Report User
				</h4>
				<a @click.prevent="closeAccountModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		<ReportForm :factory="factory" :error="error" :loading="loading" :submit="createReport" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import { useCreateReport } from '@app/hooks/forms/reports'
import ReportForm from '@app/components/forms/ReportForm.vue'
export default defineComponent({
	name: 'AccountBuyCoins',
	components: { ReportForm },
	setup () {
		const { factory, loading, error, message, createReport } = useCreateReport()
		const { closeAccountModal } = useAccountModal()
		return {
			factory, loading, error, message, createReport,
			closeAccountModal
		}
	}
})
</script>
