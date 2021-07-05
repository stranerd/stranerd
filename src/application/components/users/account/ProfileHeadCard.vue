<template>
	<div class="d-flex flex-column align-items-center gap-0-5 p-2 ">
		<h1>Balance</h1>
		<NuxtLink class="d-block w-100" to="/account/e-wallet">
			<AccountCoinBalance class="justify-content-between" :user="user" />
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import AccountCoinBalance from '@app/components/users/account/AccountCoinBalance.vue'
export default defineComponent({
	name: 'ProfileHeadCard',
	components: { AccountCoinBalance },
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	}
})
</script>

<style lang="scss" scoped>
	h1 {
		font-size: 24px;
		color: $color-text-main;
	}

	.w-100 {
		width: 92% !important;
	}
</style>
