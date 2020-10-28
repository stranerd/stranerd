<template>
	<div>
		<CreateModal />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CreateModal from '@app/components/core/modals/create/Index.vue'
export default defineComponent({
	name: 'ModalBase',
	components: {
		CreateModal
	}
})
</script>
