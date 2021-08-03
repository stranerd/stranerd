<template>
	<nav role="navigation" :class="{'fixed-nav':show}">
		<div class="px-md-2 p-1 d-flex align-items-center">
			<NuxtLink to="/" class="me-auto">
				<Logo :secondary="true" class="d-lg-inline-block d-none" />
				<Logo class="d-lg-none" />
			</NuxtLink>
			<div class="gap-2 flex-row-reverse d-lg-flex d-none align-items-center">
				<NuxtLink class="btn btn-lg white-btn-custom px-3" to="/auth/signup">
					Sign Up
				</NuxtLink>
				<NuxtLink class="btn btn-lg btn-custom px-3" to="/auth/signin">
					Sign In
				</NuxtLink>
				<NuxtLink class="link-custom px-1" to="/#contact-us">
					Contact
				</NuxtLink>
				<NuxtLink class="link-custom px-1" to="/#how-it-works">
					How it works
				</NuxtLink>
				<NuxtLink class="link-custom px-1" to="/">
					Home
				</NuxtLink>
			</div>
			<div class="d-lg-none">
				<span class="cursor-pointer" @click="toggleMenu">
					<i
						class="fas"
						:class="show ? 'fa-times' : 'fa-bars'"
						style="font-size: 28px;"
					/>
				</span>
			</div>
		</div>
		<div v-if="show" class="flex-grow-1 d-lg-none px-2 d-flex flex-column text-center mt-2">
			<NuxtLink class="mb-2 smallScreenLink link-custom-sm" to="/">
				Home
			</NuxtLink>
			<NuxtLink class="mb-2 smallScreenLink link-custom-sm" to="/#how-it-works">
				How it works
			</NuxtLink>
			<NuxtLink class="mb-2 smallScreenLink link-custom-sm" to="/#contact-us">
				Contact
			</NuxtLink>
			<NuxtLink
				class="btn btn-lg btn-custom-sm mx-auto mb-1 w-100"
				style="max-width: 400px;"
				to="/auth/signin"
			>
				Sign In
			</NuxtLink>
			<NuxtLink
				class="btn btn-lg btn-custom-sm mx-auto w-100"
				style="max-width: 400px;"
				to="/auth/signup"
			>
				Sign Up
			</NuxtLink>
			<div class="bottomLogo d-flex flex-row align-items-center justify-content-center gap-1">
				<a href="https://instagram.com/officialstranerd" target="_blank">
					<img src="@app/assets/images/homepage/instagram_white.svg" height="30" alt="">
				</a>
				<a href="https://twitter.com/stranerds" target="_blank">
					<img src="@app/assets/images/homepage/twitter_white.svg" height="30" alt="">
				</a>
				<a href="https://facebook.com/officialstranerd" target="_blank">
					<img src="@app/assets/images/homepage/facebook_white.svg" height="30" alt="">
				</a>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { disableScroll, enableScroll } from '@utils/html'
export default defineComponent({
	name: 'HomeTopNavigation',
	setup () {
		const show = ref(false)
		const toggleMenu = () => {
			show.value ? enableScroll() : disableScroll()
			show.value = !show.value
		}
		return { show, toggleMenu }
	}
})
</script>

<style lang="scss" scoped>
	nav {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: $color-primary;
		color: $color-white;
		z-index: 2;
		@media (min-width: $lg) {
			background-color: $color-white;
			color: $color-primary;
		}
	}

	.fixed-nav {
		position: fixed;
		background: $color-primary;
		top: 0;
		bottom: 0;
	}

	.white-btn-custom {
		font-size: 16px;
		border: 2px solid $color-primary;
		border-radius: 6px;
	}

	.btn-custom {
		background-color: $color-primary;
		color: $color-white;
		font-size: 16px;
		border: 2px solid $color-primary;
		font-weight: $font-weight-bold;
		border-radius: 6px;
	}

	.btn-custom-sm {
		background-color: $color-primary;
		color: $color-white;
		font-size: 15px;
		border: 2px solid  $color-white;
		font-weight: $font-weight-bold;
		border-radius: 6px;
	}

	.link-custom {
		color: $color-primary;
		font-weight: $font-weight-bold;
		font-size: 16px;
	}

	.link-custom-sm {
		color: $color-white;
		font-weight: $font-weight-bold;
		font-size: 14px;
	}

	.smallScreenLink:hover {
		background-color: rgba($color-white, 0.2);
	}

	.bottomLogo {
		position: fixed;
		bottom: 2%;
		width: 100%;
		left: 0%;
	}
</style>
