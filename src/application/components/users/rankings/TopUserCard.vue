<template>
	<div class="d-flex align-items-center my-1">
		<NuxtLink :to="`/users/${user.id}`">
			<img :src="user.image" alt="" class="profile-image" style="width:24px;height:24px;">
		</NuxtLink>
		<NuxtLink :to="`/users/${user.id}`" class="mx-1">
			<span>{{ user.fullName }}</span>
		</NuxtLink>
		<span class="ml-auto d-flex align-items-center">
			<span class="mr-half">{{ formatNumber(user.rankings[period]) }}</span>
			<Credits :size="16" />
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@app/hooks/core/numbers'
export default defineComponent({
	name: 'TopUserCard',
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		},
		period: {
			required: true,
			type: String
		}
	},
	setup () {
		return { formatNumber }
	}
})
</script>
