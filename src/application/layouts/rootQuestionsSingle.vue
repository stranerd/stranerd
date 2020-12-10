<template>
	<section>
		<DefaultTopNavigation class="shadowed" />
		<Nuxt />
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ModalBase from '@app/components/modals/Base.vue'
export default defineComponent({
	name: 'RootQuestionsSingleLayout',
	components: {
		ModalBase
	}
})
</script>

<style lang="scss" scoped>
.shadowed {
	box-shadow: 0 3px 10px rgba($color-black, 0.1);
}
</style>
