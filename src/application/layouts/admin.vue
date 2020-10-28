<template>
	<div>
		<div class="container">
			<Nuxt />
		</div>
		<Base />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Base from '@app/components/core/modals/Base.vue'
export default defineComponent({
	name: 'AdminLayout',
	components: {
		Base
	}
})
</script>
