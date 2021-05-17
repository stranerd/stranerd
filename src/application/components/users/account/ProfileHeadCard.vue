<template>
	<div class="d-flex flex-column align-items-center">
		<div class="w-100 d-flex justify-content-between mb-0-5 gap-0-5" style="max-width: 250px;">
			<div class="d-flex align-items-center position-relative">
				<Coins :size="24" style="z-index:1;" />
				<span class="rounded-pill ms-n1 px-0-5 ps-1-5 bg-blue-grey text-light-blue">
					{{ formatNumber(user.account.coins.bronze) }}
				</span>
			</div>
			<div class="d-flex align-items-center position-relative">
				<span class="rounded-pill px-0-5 pe-1-5 bg-blue-grey text-light-blue">
					{{ formatNumber(user.account.coins.gold) }}
				</span>
				<Coins :gold="true" :size="24" class="ms-n1" style="z-index:1;" />
			</div>
		</div>
		<Avatar :src="user.avatar" :size="75" />
		<span class="text-18 fw-bold">{{ user.fullName }}</span>
		<ShowRatings v-if="user.roles.isTutor" :rating="user.averageRating" class="my-0-5" />
		<NuxtLink to="/account/" class="btn btn-blue rounded-pill my-0-5">
			<span>View Profile</span>
			<i class="fas fa-arrow-right ms-0-5" />
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@utils/commons'
export default defineComponent({
	name: 'ProfileHeadCard',
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
