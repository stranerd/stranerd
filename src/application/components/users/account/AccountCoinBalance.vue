<template>
	<span class="w-100 mx-auto d-flex justify-content-between gap-0-5" style="max-width: 300px;">
		<span class="d-flex align-items-center position-relative">
			<Coins :size="28" style="z-index:1;" />
			<span class="rounded-pill ms-n1 px-0-5 ps-1-5 bg-blue-grey text-light-blue">
				{{ formatNumber(user.account.coins.bronze) }}
			</span>
		</span>
		<span class="d-flex align-items-center position-relative">
			<span class="rounded-pill px-0-5 pe-1-5 bg-blue-grey text-light-blue">
				{{ formatNumber(user.account.coins.gold) }}
			</span>
			<Coins :gold="true" :size="28" class="ms-n1" style="z-index:1;" />
		</span>
	</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { formatNumber } from '@utils/commons'
import { UserEntity } from '@modules/users'
export default defineComponent({
	name: 'AccountCoinBalance',
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
