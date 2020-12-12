<template>
	<div class="container">
		<div class="text-center">
			<Logo />
			<h1 class="title">
				application root
			</h1>
			<div v-if="isLoggedIn">
				<button class="d-block mx-auto btn btn-danger mt-4" @click="signout">
					Sign Out
				</button>
				<DisplayError :error="error" />
				<PageLoading v-if="loading" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSessionSignout } from '@app/hooks/auth/session'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'RootIndexPage',
	middleware: 'isNotAuthenticated',
	setup () {
		const { isLoggedIn } = useAuth()
		const { loading, signout, error } = useSessionSignout()
		return { isLoggedIn, loading, signout, error }
	}
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
