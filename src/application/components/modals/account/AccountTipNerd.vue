<template>
	<Modal :show-separator="false">
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Tip {{ nerdBioAndId.bio.name.first }}
				</h4>
				<a @click.prevent="closeAccountModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		{{ nerdBioAndId }}
		<h1>How far</h1>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import { useTipNerd } from '@app/hooks/users/account'
export default defineComponent({
	name: 'AccountTipNerd',
	setup () {
		const { loading, error, tip, nerdBioAndId, tipNerd } = useTipNerd()
		const { closeAccountModal } = useAccountModal()
		return {
			loading, error, tip, nerdBioAndId,
			tipNerd, closeAccountModal
		}
	}
})
</script>
