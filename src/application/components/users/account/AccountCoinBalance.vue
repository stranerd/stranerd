<template>
	<span class="w-100 mx-auto d-flex justify-content-between gap-0-5" style="max-width: 300px;">
		<span class="d-flex align-items-center position-relative">
			<Coins :size="28" style="z-index:1;" />
			<span class="rounded-pill ms-n1 px-1 ps-1-5 bg-tags border-line border text-text-main">
				{{ formatNumber(user.account.coins.bronze) }}
			</span>
		</span>
		<span class="d-flex align-items-center position-relative">
			<Coins :gold="true" :size="28" class="ms-n1" style="z-index:1;" />
			<span class="rounded-pill ms-n1 px-1 ps-1-5 bg-tags border-line border text-text-main">
				{{ formatNumber(user.account.coins.gold) }}

			</span>

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

<style lang="scss" scoped>
.border{
	width:fit-content;
	padding: 3px 0px;
	margin-right: 1rem;
    min-width: 3.4rem;}
.ms-n1{
	margin-left: -1.4rem !important;
}
</style>
