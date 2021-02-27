<template>
	<div class="d-flex flex-column align-items-center">
		<div class="w-100 d-flex justify-content-between mb-1">
			<div class="d-flex align-items-center position-relative ml-1">
				<Coins :size="24" style="z-index:1;" />
				<span class="rounded-pill ml-n2 px-1 pl-3 bg-blue-grey text-light-blue">
					{{ formatNumber(user.account.coins.bronze) }}
				</span>
			</div>
			<div class="d-flex align-items-center position-relative ml-1">
				<span class="rounded-pill px-1 pr-3 bg-blue-grey text-light-blue">
					{{ formatNumber(user.account.coins.gold) }}
				</span>
				<Coins :gold="true" :size="24" class="ml-n2" style="z-index:1;" />
			</div>
		</div>
		<img :src="user.avatar" alt="" class="profile-image" style="width:75px;height:75px;">
		<span class="text-18 font-weight-bold">{{ user.fullName }}</span>
		<NuxtLink to="/account/" class="btn btn-blue rounded-pill my-1">
			<span>View Profile</span>
			<i class="fas fa-arrow-right ml-1" />
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@app/hooks/core/numbers'
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
