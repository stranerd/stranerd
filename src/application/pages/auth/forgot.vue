<template>
	<form>
		<h2 class="mb-7 text-center">
			Forgot Password
		</h2>
		<div class="form-group">
			<label for="email" class="label">Email</label>
			<input
				id="email"
				type="email"
				name="email"
				required
				class="form-control"
				autocomplete="email"
				autofocus
			>
		</div>
		<div class="mt-2">
			<button class="w-100 btn btn-dark py-2">
				Submit
			</button>
		</div>
		<div class="text-center mt-4">
			<BaseLink to="/auth/signin" class="label-sm">
				Back to Signin
			</BaseLink>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	layout: 'auth',
	middleware: 'isNotAuthenticated'
})
</script>

<style lang="scss" scoped>
h2{
	font-size: 2.0rem;
	color: $black;
	line-height: 1.2;
}
</style>
