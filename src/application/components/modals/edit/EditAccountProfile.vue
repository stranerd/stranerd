<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Edit Profile
		</template>
		<AccountProfileForm :cancel="() => removeFromStack($attrs.modal)" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useModal } from '@app/hooks/core/modals'
import AccountProfileForm from '@app/components/users/account/AccountProfileForm.vue'
export default defineComponent({
	name: 'EditAccountProfile',
	components: { AccountProfileForm },
	setup () {
		const { removeFromStack } = useModal()
		return { removeFromStack }
	}
})
</script>
