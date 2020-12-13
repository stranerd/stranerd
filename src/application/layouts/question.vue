<template>
	<div>
		<DefaultTopNavigation class="shadowed" />
		<div class="content px-1">
			<Nuxt />
		</div>
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DefaultTopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import ModalBase from '@app/components/modals/Base.vue'
export default defineComponent({
	name: 'RootQuestionsSingleLayout',
	components: {
		DefaultTopNavigation,
		ModalBase
	}
})
</script>

<style lang="scss" scoped>
.shadowed {
	box-shadow: 0 3px 10px rgba($color-black, 0.1);
}
.content {
	margin: 0 auto;
	max-width: $lg;
}
</style>
