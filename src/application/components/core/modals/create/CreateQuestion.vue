<template>
	<Modal>
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Create Question
				</h4>
				<a @click.prevent="closeCreateModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		<h1>Questions</h1>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'CreateModalQuestion',
	components: {},
	setup () {
		const { closeCreateModal } = useCreateModal()
		return {
			closeCreateModal
		}
	}
})
</script>
