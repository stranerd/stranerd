<template>
	<div>
		<h1>Single</h1>
		<Nuxt />
		<ModalBase />
	</div>
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
