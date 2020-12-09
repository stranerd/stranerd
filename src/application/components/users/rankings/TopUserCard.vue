<template>
	<div class="d-flex my-1">
		<img :src="user.image" alt="" class="profile-image" style="width:24px;height:24px;">
		<span class="mx-1">{{ user.name }}</span>
		<span class="ml-auto d-flex align-items-center">
			<span>{{ user.rankings[period] }}</span>
			<img src="@/assets/images/icons/credits.svg" width="16" height="16" alt="">
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
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
	}
})
</script>
