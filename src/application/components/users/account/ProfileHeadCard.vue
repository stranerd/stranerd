<template>
	<div class="d-flex flex-column align-items-center gap-0-5">
		<NuxtLink to="/account/e-wallet">
			<AccountCoinBalance :user="user" />
		</NuxtLink>
		<Avatar :src="user.avatar" :size="75" />
		<span class="text-18 fw-bold">{{ user.fullName }}</span>
		<ShowRatings v-if="user.roles.isTutor" :rating="user.averageRating" />
		<NuxtLink to="/account/" class="btn btn-blue rounded-pill">
			<span>View Profile</span>
			<i class="fas fa-arrow-right ms-0-5" />
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
