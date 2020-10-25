<template>
	<div class="my-4 text-center">
		<PageLoading v-if="loading" />
		<div class="d-flex justify-content-center">
			<span v-for="dev in devs" :key="dev" class="mr-2">
				<input v-model="id" type="radio" :value="dev" class="mr-1">
				<label class="text-capitalize">{{ dev }}</label>
			</span>
		</div>
		<button :disabled="!id" type="button" class="btn btn-info w-100" @click="signin">
			<i class="fas fa-user-cog text-white mr-1" />
			<span>Sign In as dev user</span>
		</button>
		<span v-if="error" class="text-danger">{{ error }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useDevSignin } from '@app/usecases/auth/signin'
export default defineComponent({
	setup () {
		const { loading, signin, id, devs, error } = useDevSignin()
		return { id, devs, error, signin, loading }
	}
})
</script>
