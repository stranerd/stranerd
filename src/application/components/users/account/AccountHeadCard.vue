<template>
	<div class="d-flex flex-column align-items-center my-1">
		<img :src="user.avatar" alt="" class="profile-image" style="width:90px;height:90px;">
		<span class="text-18 font-weight-bold">{{ user.firstName }}</span>
		<button class="btn btn-outline-light-blue rounded-pill mt-1" @click="openEditProfileModal">
			Edit Profile
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@app/hooks/core/numbers'
import { useEditModal, useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AccountHeadCard',
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup () {
		const openEditProfileModal = () => {
			useMenuModal().closeMenuModal()
			useEditModal().setEditModalAccountProfile()
		}
		return { formatNumber, openEditProfileModal }
	}
})
</script>
