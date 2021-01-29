<template>
	<div class="d-flex flex-column align-items-center">
		<h2 class="mb-3">
			Current Balance
		</h2>
		<div class="bg-light-grey d-inline-block px-8 py-6" style="border-radius: 1.25rem;">
			<span class="font-weight-bold display-3">${{ formatNumber(user.account.coins) }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@app/hooks/core/numbers'
export default defineComponent({
	name: 'UserCreditBalanceCard',
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup () {
		return { formatNumber }
	}
})
</script>
