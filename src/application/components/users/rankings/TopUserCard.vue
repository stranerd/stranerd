<template>
	<div class="d-flex align-items-center my-1">
		<span>{{ rank }}.&nbsp;</span>
		<NuxtLink :to="`/users/${user.id}`">
			<Avatar :src="user.avatar" :size="30" />
		</NuxtLink>
		<NuxtLink :to="`/users/${user.id}`" class="mx-1">
			<span>{{ user.fullName }}</span>
		</NuxtLink>
		<span class="ml-auto">
			{{ formatNumber(user.rankings[period]) }} xp
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@utils/numbers'
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
		},
		rank: {
			required: true,
			type: [Number, String]
		}
	},
	setup () {
		return { formatNumber }
	}
})
</script>
