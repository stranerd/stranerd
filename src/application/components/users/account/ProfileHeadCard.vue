<template>
	<div class="d-flex flex-column align-items-center gap-0-5">
		<NuxtLink class="d-block w-100" to="/account/e-wallet">
			<AccountCoinBalance class="justify-content-between" :user="user" />
		</NuxtLink>
		<Avatar :src="user.avatar" :size="75" />
		<span class="text-18 fw-bold">{{ user.fullName }}</span>
		<span class="text-18 sub">High School</span>
		<ShowRatings v-if="user.roles.isTutor" :rating="user.averageRating" />
		<button to="/account/" class="btn btn-blue rounded" @click="openEditProfileModal">
			<span>Edit Profile</span>
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import AccountCoinBalance from '@app/components/users/account/AccountCoinBalance.vue'
import { useEditModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'ProfileHeadCard',
	components: { AccountCoinBalance },
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup () {
		const openEditProfileModal = () => {
			useEditModal().setEditModalAccountProfile()
		}
		return { openEditProfileModal }
	}
})
</script>

<style scoped>
.sub{
	color: "#395C7F";
	font-size: 16px;
	margin-top: -12px;
}
</style>
