<template>
	<Modal :close="closeAccountModal">
		<template slot="title">
			Tip {{ nerdBioAndId.bio.name.first }}
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
