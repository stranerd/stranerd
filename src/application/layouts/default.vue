<template>
	<section>
		<Nuxt />
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ModalBase from '@app/components/modals/Base.vue'
export default defineComponent({
	name: 'DefaultLayout',
	components: {
		ModalBase
	}
})
</script>

<style lang="scss" scoped>
section {
  min-height: 100vh;
}
</style>
