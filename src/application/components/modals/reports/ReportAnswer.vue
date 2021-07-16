<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Report Answer
		</template>
		<!-- TODO: fill in report form -->
		<span>Hello</span>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'ReportAnswer'
})
</script>
