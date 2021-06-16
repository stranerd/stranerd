<template>
	<Modal :close="closeEditModal">
		<template slot="title">
			Edit Profile
		</template>
		<AccountProfileForm :cancel="closeEditModal" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from '@nuxtjs/composition-api'
import { setShowProfileModal } from '@app/hooks/auth/auth'
import { useEditModal } from '@app/hooks/core/modals'
import AccountProfileForm from '@app/components/users/account/AccountProfileForm.vue'
export default defineComponent({
	name: 'EditAccountProfile',
	components: { AccountProfileForm },
	setup () {
		const { closeEditModal } = useEditModal()
		onBeforeUnmount(() => setShowProfileModal(false))
		return { closeEditModal }
	}
})
</script>
