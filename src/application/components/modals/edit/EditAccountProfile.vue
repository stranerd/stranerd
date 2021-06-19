<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Edit Profile
		</template>
		<AccountProfileForm :cancel="closeAccountProfile" />
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
		const { closeAccountProfile } = useEditModal()
		onBeforeUnmount(() => setShowProfileModal(false))
		return { closeAccountProfile }
	}
})
</script>
