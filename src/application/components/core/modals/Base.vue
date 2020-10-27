<template>
	<div>
		<CreateModal />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CreateModal from '@app/components/core/modals/create/Index.vue'
export default defineComponent({
	components: {
		CreateModal
	}
})
</script>
