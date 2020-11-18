<template>
	<div class="container">
		<div class="text-center">
			<Logo />
			<h1 class="title">
				Page 2
			</h1>
			<BaseLink to="/page" :root="true">
				Page 1
			</BaseLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSessionSignout } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'RootPage2Page',
	middleware: 'isAuthenticated',
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
