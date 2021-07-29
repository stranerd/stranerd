<template>
	<section class="layout-page">
		<div class="d-flex pt-1 p-1 px-2 py-md-2">
			<NuxtLink to="/" class="ms-auto">
				<img src="@app/assets/images/icons/close.svg" width="24" alt="" class="d-md-none">
				<img src="@app/assets/images/icons/close.svg" width="30" alt="" class="d-none d-md-inline">
			</NuxtLink>
		</div>
		<section class="layout-body gap-3">
			<main class="layout-main">
				<Nuxt />
			</main>
		</section>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'AuthLayout'
})
</script>

<style lang="scss" scoped>
	.layout-body {
		max-width: 1200px;
	}
</style>
