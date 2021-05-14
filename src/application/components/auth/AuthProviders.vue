<template>
	<div class="grid">
		<div>
			<button type="button" class="btn btn-auth" @click="googleSignin">
				<img src="@app/assets/images/icons/google.svg" alt="">Google
			</button>
			<DisplayError :error="googleError" />
			<PageLoading v-if="googleLoading" />
		</div>
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
.grid{
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-gap: 1rem;
}
@media (min-width: $sm) {
	.grid{ grid-template-columns: repeat(1, 1fr);}
}
.btn-auth{
	color: $color-white;
	background: $color-blue;
	width: 100%;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.75rem 0;
	transition: all 0.4s;
	z-index: 1;
	img {
		height: 30px;
		margin-right: .5rem;
	}
}
.btn-auth:hover {
	background: darken($color-blue, 10);
}
</style>
