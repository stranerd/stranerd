<template>
	<div class="d-flex flex-column align-items-center gap-0-5 px-2 py-1 balance">
		<h1>Balance</h1>
		<NuxtLink class="d-block w-100" to="/account/e-wallet">
			<AccountCoinBalance class="justify-content-center" :user="user" />
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
	.balance {
		background: $color-tags;
		border: 1px solid $color-line;
		width: -webkit-fill-available;
	}

	.py-1 {
		padding-top: 30px !important;
		padding-bottom: 30px !important;
	}

	h1 {
		font-size: 24px;
		color: $color-text-main;
	}

	.w-100 {
		width: 92% !important;
	}
</style>
