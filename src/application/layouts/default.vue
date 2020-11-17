<template>
	<div>
		<Nuxt />
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ModalBase from '@app/components/core/modals/Base.vue'
export default defineComponent({
	name: 'DefaultLayout',
	components: {
		ModalBase
	}
})
</script>
