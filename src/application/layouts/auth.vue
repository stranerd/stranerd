<template>
	<div class="body w-100 d-flex justify-content-center align-items-center flex-wrap">
		<div class="content pt-8 pb-4 px-2 px-sm-8">
			<Nuxt />
		</div>
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ModalBase from '@app/components/core/modals/Base.vue'
export default defineComponent({
	name: 'AuthLayout',
	components: {
		ModalBase
	}
})
</script>

<style lang="scss" scoped>
	.body{
		min-height: 100vh;
		background: url('../assets/images/auth/bg.jpg') center no-repeat;
		background-size: cover;
		padding: .25rem;
	}
	.content{
		width: 100%;
		max-width: 720px;
		background: $white;
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
