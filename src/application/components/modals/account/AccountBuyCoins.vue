<template>
	<Modal :show-separator="false">
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Buy Coins
				</h4>
				<a @click.prevent="closeAccountModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		<h1>How far</h1>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AccountBuyCoins',
	setup () {
		const { closeAccountModal } = useAccountModal()
		return { closeAccountModal }
	}
})
</script>
