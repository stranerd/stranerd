<template>
	<div class="d-flex flex-column align-items-center my-1">
		<Avatar :src="user.avatar" :size="90" />
		<span class="text-18 font-weight-bold my-1">{{ user.firstName }}</span>
		<ShowRatings v-if="user.roles.isTutor" :rating="user.averageRating" />
		<button class="btn btn-outline-light-blue rounded-pill my-2 px-3" @click="openEditProfileModal">
			Edit Profile
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@utils/numbers'
import { useEditModal, useMenuModal } from '@app/hooks/core/modals'
import ShowRatings from '@app/components/core/ShowRatings.vue'
export default defineComponent({
	name: 'AccountHeadCard',
	components: { ShowRatings },
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
