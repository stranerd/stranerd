<template>
	<header class="bg-dark">
		<nav class="navbar navbar-expand-md container bg-dark navbar-dark d-flex flex-row">
			<NuxtLink class="navbar-brand" to="/admin/">
				<img src="@app/assets/images/stranerd_logo.png" alt="Stranerd" height="40">
			</NuxtLink>
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
						<NuxtLink class="nav-link" to="/admin/">
							Dashboard
						</NuxtLink>
					</li>
					<li class="nav-item">
						<NuxtLink class="nav-link" to="/" :root="true" :different="true">
							Main site
						</NuxtLink>
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
import { useSessionSignout } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'AdminTopNavigation',
	setup () {
		const { signout, loading, error } = useSessionSignout()
		return { signout, loading, error }
	}
})
</script>
