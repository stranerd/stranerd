<template>
	<nav role="navigation">
		<div class="px-md-2 p-1 py-md-1 d-flex align-items-center">
			<NuxtLink to="/">
				<Logo :secondary="true" class="d-lg-inline-block d-none" />
				<Logo class="d-lg-none" />
			</NuxtLink>
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
			<div class="ms-auto flex-row-reverse d-inline-flex align-items-center d-lg-none">
				<span class="cursor-pointer" @click="show = !show">
					<i
						class="text-white fas"
						:class="show ? 'fa-times' : 'fa-bars'"
						style="font-size: 28px;"
					/>
				</span>
			</div>
		</div>
		<transition name="slide-fade">
			<template v-if="show">
				<div class="menuBackground d-lg-none d-flex flex-column text-center" @click="show = false">
					<img src="@app/assets/images/homepage/ig_session_sm.svg" class="bgImageNav">
					<div class="px-2 d-flex flex-column text-center position-relative">
						<NuxtLink class="py-1 mt-2 smallScreenLink link-custom-sm" style="width: 100%;" to="/">
							Home
						</NuxtLink>
						<NuxtLink class="smallScreenLink py-1 link-custom-sm" to="/#how-it-works">
							How it works
						</NuxtLink>
						<NuxtLink class="smallScreenLink py-1 link-custom-sm" to="/#contact-us">
							Contact
						</NuxtLink>
						<NuxtLink
							class="btn btn-lg btn-custom-sm mx-auto my-1 w-100"
							style="max-width: 400px;"
							to="/auth/signin"
						>
							Sign In
						</NuxtLink>
						<NuxtLink
							class="btn btn-lg white-btn-custom mx-auto my-1 w-100"
							style="max-width: 400px;"
							to="/auth/signup"
						>
							Sign Up
						</NuxtLink>
						<div class="bottomLogo d-flex flex-row align-items-center justify-content-center">
							<!--  TODO: Add social links -->
							<div class="me-1">
								<NuxtLink to="#">
									<img src="@app/assets/images/homepage/instagram_white.svg" height="30">
								</NuxtLink>
							</div>
							<div class="me-1">
								<NuxtLink to="#">
									<img src="@app/assets/images/homepage/twitter_white.svg" height="30">
								</NuxtLink>
							</div>
							<div class="me-1">
								<NuxtLink to="#">
									<img src="@app/assets/images/homepage/facebook_white.svg" height="30">
								</NuxtLink>
							</div>
							<div class="me-1">
								<NuxtLink to="#">
									<img src="@app/assets/images/homepage/youtube_white.svg" height="30">
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</template>
		</transition>
		<img src="@app/assets/images/homepage/sm_top_bg.svg" class="floatImage d-md-none">
		<img src="@app/assets/images/homepage/top_bar_md.svg" class="floatImage d-none d-md-block d-lg-none">
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

	.menuBackground {
		position: fixed;
		width: 100%;
		left: 0;
		top: 7%;
		bottom: 0;
	}

	.bgImageNav {
		position: absolute;
		width: 100%;
		left: 0%;
		top: 0%;
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

	.floatImage {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: -1;
	}

	.customPadding {
		padding-top: 10px;
	}
</style>
