<template>
	<div class="container">
		<div class="text-center">
			<Logo />
			<h1 class="title">
				application root
			</h1>
			<BaseLink to="/page" :root="true">
				Page
			</BaseLink>
			<button class="d-block mx-auto btn btn-danger mt-4" @click="signout">
				Sign Out
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSessionSignout } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'RootIndexPage',
	setup () {
		const { loading, signout, error } = useSessionSignout()
		return { loading, signout, error }
	}
})
</script>

<style>
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
