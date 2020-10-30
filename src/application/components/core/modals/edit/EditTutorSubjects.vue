<template>
	<Modal>
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Edit Tutor Subjects
				</h4>
				<a @click.prevent="closeEditModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		<h4>Hi</h4>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useEditModal } from '@app/usecases/core/modals'
export default defineComponent({
	name: 'EditModalTutorSubject',
	setup () {
		const { closeEditModal } = useEditModal()
		return {
			closeEditModal
		}
	}
})
</script>
