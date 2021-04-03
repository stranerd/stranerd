<template>
	<NuxtLink :to="`/messages/${user.id}`">
		<Avatar :src="user.avatar" :size="60" />
		<span class="font-weight-bold lead mx-1">{{ user.name.fullName }}</span>
	</NuxtLink>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserBio } from '@modules/users'
export default defineComponent({
	name: 'UserChatCard',
	props: {
		user: {
			type: Object as PropType<UserBio & { id: string }>,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
a {
	padding: 0.5rem;
	display: flex;
	align-items: center;
}
a:hover {
	transform: none;
	font-size: inherit;
	color: inherit;
	text-decoration: none;
	background: darken($color-light-blue, 2);
}
</style>
