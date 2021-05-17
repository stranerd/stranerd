<template>
	<section class="body bg-blue-grey w-100 d-flex justify-content-center align-items-center flex-wrap">
		<div class="content bg-light-blue text-blue pt-4 pb-2 px-1 px-sm-4">
			<Nuxt />
		</div>
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
	.body{
		min-height: vh(100);
		padding: .25rem;
	}
	.content{
		width: 100%;
		max-width: 720px;
		background: $color-white;
		border-radius: .75rem;
	}
	@media (min-width: $md) {
		.body{ padding: 4rem; }
		.content {
			padding-left: 7rem;
			padding-right: 7rem;
		}
	}
</style>
