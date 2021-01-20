<template>
	<Modal>
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Edit Profile
				</h4>
				<a @click.prevent="closeEditModal">
					<i class="fas fa-times text-danger fa-lg" />
				</a>
			</div>
		</template>
		<AccountProfileForm :cancel="closeEditModal" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useEditModal } from '@app/hooks/core/modals'
import AccountProfileForm from '@app/components/users/user/AccountProfileForm.vue'
export default defineComponent({
	name: 'EditAccountProfile',
	components: { AccountProfileForm },
	setup () {
		const { closeEditModal } = useEditModal()
		return { closeEditModal }
	}
})
</script>
