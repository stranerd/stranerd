<template>
	<div>
		<div class="text-center">
			<Logo />
		</div>
		<div class="d-flex justify-content-center mt-2 mb-4 text-light-grey">
			<i class="fas fa-circle mx-1" />
			<i class="fas fa-circle mx-1" />
			<i class="fas fa-circle mx-1" />
		</div>
	</div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'SidebarLogo'
})
</script>
