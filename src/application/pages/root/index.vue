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
			<span v-if="error" class="text-danger">{{ error }}</span>
			<PageLoading v-if="loading" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSessionSignout } from '@app/usecases/auth/signout'
export default defineComponent({
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
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
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
