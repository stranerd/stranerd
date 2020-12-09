<template>
	<div>
		<AdminTopNavigation />
		<Banner />
		<div class="container">
			<Nuxt />
		</div>
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AdminTopNavigation from '@app/components/layouts/AdminTopNavigation.vue'
import ModalBase from '@app/components/modals/Base.vue'
export default defineComponent({
	name: 'AdminLayout',
	components: {
		AdminTopNavigation,
		ModalBase
	},
	middleware: ['isAdmin']
})
</script>
