<template>
	<nav role="navigation">
		<div
			class="col-12 px-md-2 card px-1 py-1 maincolor d-flex flex-row"
			style="align-items: center; border-radius: 0;"
		>
			<Logo />
			<div
				class="ml-auto flex-row-reverse d-lg-flex d-none"
				style="align-items: center; width: 100%;"
			>
				<!-- navigators -->
				<div>
					<NuxtLink
						class="btn btn-lg white-btn-custom px-3"
						style="font-size: 15px;"
						to="/auth/signup"
					>
						Sign Up
					</NuxtLink>
				</div>
				<div class="px-2">
					<NuxtLink
						class="btn btn-lg btn-custom px-3"
						style="font-size: 15px;"
						to="/auth/signin"
					>
						Log In
					</NuxtLink>
				</div>
				<div class="pl-1">
					<NuxtLink class="link-custom px-1" to="/contact-us">
						Contact
					</NuxtLink>
				</div>
				<div class="px-1">
					<NuxtLink class="link-custom px-1" to="/how-it-works">
						How it works
					</NuxtLink>
				</div>
				<div class="px-1">
					<NuxtLink class="link-custom px-1" to="/">
						Home
					</NuxtLink>
				</div>
				<!-- ends -->
			</div>
			<div
				class="ml-auto d-flex flex-row-reverse d-inline-block d-lg-none"
				style="align-items: center; width: 100%;"
			>
				<!-- navigators -->
				<div style="cursor: pointer;" @click="show = !show">
					<i
						:class="show ? 'fas fa-times' : 'fas fa-bars'"
						style="color: white; font-size: 28px;"
					/>
				</div>
				<!-- ends -->
			</div>
		</div>
		<transition name="slide-fade">
			<template v-if="show">
				<div
					class="
                        menuBackground
                        d-lg-none d-flex
                        flex-column
                        text-center
                    "
				>
					<NuxtLink
						class="py-1 mt-2 smallScreenLink"
						style="width: 100%;"
						to="/"
					>
						<div class="link-custom px-1" style="font-size: 15px;">
							Home
						</div>
					</NuxtLink>
					<NuxtLink
						class="py-1 smallScreenLink"
						style="width: 100%;"
						to="/how-it-works"
					>
						<div class="link-custom px-1" style="font-size: 15px;">
							How it works
						</div>
					</NuxtLink>
					<NuxtLink
						class="py-1 smallScreenLink"
						style="width: 100%;"
						to="/contact-us"
					>
						<div class="link-custom px-1" style="font-size: 15px;">
							Contact
						</div>
					</NuxtLink>
					<div class="py-1" style="width: 100%;">
						<NuxtLink
							class="btn btn-lg btn-custom mx-auto"
							style="
	font-size: 15px;
	width: 100%;
	max-width: 260px;
"
							to="/auth/signin"
						>
							Log In
						</NuxtLink>
					</div>
					<div class="py-1" style="width: 100%;">
						<NuxtLink
							class="btn btn-lg white-btn-custom mx-auto"
							style="
	font-size: 15px;
	width: 100%;
	max-width: 260px;
"
							to="/auth/signup"
						>
							Sign Up
						</NuxtLink>
					</div>
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
	nav {
		min-height: 76px;
	}

	.maincolor {
		background-color: #354da3;
		color: white;
	}

	.white-btn-custom {
		background-color: white;
		color: #354da3;
		border: 2px solid #fff;
		border-radius: 6px;
	}

	.btn-custom {
		background-color: #354da3;
		color: #fff;
		border: 2px solid #fff;
		font-weight: $font-weight-bold;
		border-radius: 6px;
	}

	.link-custom {
		color: #fff;
		font-weight: $font-weight-bold;
		font-size: 16px;
	}

	.menuBackground {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: $main-background-color;
		align-items: center;
	}

	.smallScreenLink:hover {
		background-color: rgba($color: #fff, $alpha: 0.2);
	}
</style>
