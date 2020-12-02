<template>
	<Modal>
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Edit Profile
				</h4>
				<a @click.prevent="closeEditModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useEditModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'EditAccountProfile',
	setup () {
		const { closeEditModal } = useEditModal()
		return {
			closeEditModal
		}
	}
})
</script>
