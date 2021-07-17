<template>
	<nav role="navigation">
		<div class="px-md-2 p-1 bg-primary-dark d-flex flex-row align-items-center">
			<Logo />
			<div class="ms-auto gap-2 flex-row-reverse d-lg-flex d-none align-items-center">
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
			<div class="ms-auto flex-row-reverse d-inline-flex align-items-center d-lg-none py-0-25">
				<span class="cursor-pointer" @click="show = !show">
					<i
						:class="show ? 'fas fa-times' : 'fas fa-bars'"
						style="color: white; font-size: 28px;"
					/>
				</span>
			</div>
		</div>
		<transition name="slide-fade">
			<template v-if="show">
				<div class="menuBackground d-lg-none d-flex flex-column text-center" @click="show = false">
					<NuxtLink class="py-1 mt-2 smallScreenLink" style="width: 100%;" to="/">
						Home
					</NuxtLink>
					<NuxtLink class="smallScreenLink py-1 link-custom" to="/#how-it-works">
						How it works
					</NuxtLink>
					<NuxtLink class="smallScreenLink py-1 link-custom" to="/#contact-us">
						Contact
					</NuxtLink>
					<NuxtLink
						class="btn btn-lg btn-custom mx-auto my-1 w-100"
						style="max-width: 400px;"
						to="/auth/signin"
					>
						Sign In
					</NuxtLink>
					<NuxtLink
						class="btn btn-lg btn-custom mx-auto my-1 w-100"
						style="max-width: 400px;"
						to="/auth/signup"
					>
						Sign Up
					</NuxtLink>
				</div>
			</template>
		</transition>
	</nav>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'HomeTopNavigation',
	setup () {
		const show = ref(false)
		return { show }
	}
})
</script>

<style lang="scss" scoped>
	.white-btn-custom {
		background-color: $color-white;
		color: $color-primary-dark;
		font-size: 15px;
		border: 2px solid $color-white;
		border-radius: 6px;
	}

	.btn-custom {
		background-color: $color-primary-dark;
		color: $color-white;
		font-size: 15px;
		border: 2px solid $color-white;
		font-weight: $font-weight-bold;
		border-radius: 6px;
	}

	.link-custom {
		color: $color-white;
		font-weight: $font-weight-bold;
		font-size: 15px;
	}

	.menuBackground {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: $color-primary-dark;
	}

	.smallScreenLink:hover {
		background-color: rgba($color-white, 0.2);
	}
</style>
