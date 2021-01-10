<template>
	<div>
		<Nuxt class="content" />
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ModalBase from '@app/components/modals/Base.vue'
export default defineComponent({
	name: 'DashboardLayout',
	components: {
		ModalBase
	}
})
</script>

<style lang="scss" scoped>
.content {
	margin: 0 auto;
	max-width: 2000px;
}
</style>
