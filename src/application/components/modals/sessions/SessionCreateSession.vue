<template>
	<Modal :show-separator="false">
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Request Session
				</h4>
				<a @click.prevent="closeSessionModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		<h1>Request</h1>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSessionModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'SessionCreateSession',
	setup () {
		const { closeSessionModal } = useSessionModal()
		return { closeSessionModal }
	}
})
</script>
