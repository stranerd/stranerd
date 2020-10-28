<template>
	<div>
		<div class="container">
			<Nuxt />
		</div>
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ModalBase from '@app/components/core/modals/Base.vue'
export default defineComponent({
	name: 'AdminLayout',
	components: {
		ModalBase
	}
})
</script>
