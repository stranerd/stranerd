<template>
	<div class="d-flex flex-column gap-1 gap-md-2">
		<button type="button" class="btn btn-auth" @click="googleSignin">
			<img src="@app/assets/images/icons/google.svg" alt="">
			<span>Google</span>
		</button>
		<DisplayError :error="googleError" />
		<PageLoading v-if="googleLoading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useGoogleSignin } from '@app/hooks/auth/signin'
export default defineComponent({
	setup () {
		const { loading: googleLoading, signin: googleSignin, error: googleError } = useGoogleSignin()
		return { googleError, googleLoading, googleSignin }
	}
})
</script>

<style lang="scss" scoped>
	.btn-auth {
		color: $color-dark;
		background: $color-white;
		width: 100%;
		font-size: 18px;
		border: 1px solid $color-dark;
		display: flex;
		border-radius: 5px;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		padding: 0.75rem 0;
		transition: all 0.4s;

		img {
			height: 30px;
			margin-right: 0.5rem;
		}
	}

</style>
