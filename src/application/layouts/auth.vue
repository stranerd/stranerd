<template>
	<section class="layout-page">
		<div class="d-flex py-1 py-md-1-25 py-lg-1-5 px-1 px-md-2 px-lg-3 align-items-center bg-primary-dark">
			<NuxtLink class="logo" to="/">
				<Logo />
			</NuxtLink>
			<NuxtLink class="ms-auto icons" to="/">
				<img alt="" class="d-md-none" src="@app/assets/images/icons/close.svg" width="20">
				<img alt="" class="d-none d-md-inline" src="@app/assets/images/icons/close.svg" width="30">
			</NuxtLink>
		</div>
		<section class="layout-body">
			<main class="layout-main px-lg-4 py-md-2-5">
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
		max-width: 800px;
	}

	.logo {
		/deep/ img {
			// height: 24px !important;
			@media (min-width: $md) {
				height: 25px !important;
			}
			@media (min-width: $lg) {
				height: 32px !important;
			}
		}
	}

	.icons {
		filter: brightness(500%);
	}
</style>
