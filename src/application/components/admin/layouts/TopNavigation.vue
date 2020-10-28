<template>
	<header class="bg-dark">
		<nav class="navbar navbar-expand container bg-dark navbar-dark d-flex flex-row align-items-center">
			<BaseLink class="navbar-brand" to="/admin/">
				<img src="@app/static/images/stranerd_logo.png" alt="Stranerd" height="40">
			</BaseLink>
			<button
				class="navbar-toggler border border-white"
				type="button"
				data-toggle="collapse"
				data-target="#navbar"
				aria-controls="navbar"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div id="navbar" class="collapse navbar-collapse flex-grow-0 font-weight-bold ml-auto">
				<ul class="navbar-nav">
					<li class="nav-item d-none d-sm-inline">
						<BaseLink class="nav-link" to="/admin/">
							Dashboard
						</BaseLink>
					</li>
					<li class="nav-item">
						<BaseLink class="nav-link" to="/" :root="true" :different="true">
							Main site
						</BaseLink>
					</li>
					<li class="nav-item">
						<a class="nav-link text-danger" @click.prevent="signout">Signout</a>
						<PageLoading v-if="loading" />
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSessionSignout } from '@app/usecases/auth/signout'
export default defineComponent({
	name: 'AdminTopNavigation',
	setup () {
		const { signout, loading, error } = useSessionSignout()
		return { signout, loading, error }
	}
})
</script>

<style lang="scss" scoped>
.nav-link{
	padding: 0.5rem 0;
}
</style>
