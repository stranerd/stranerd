<template>
	<div class="col-12 py-0 px-0 pt-2 pb-1 content_wrapper">
		<img src="@app/assets/images/homepage/bottom_bg.svg" class="bgImage d-lg-block d-none">
		<img src="@app/assets/images/homepage/bottom_bg_sm.svg" class="bgImage d-block d-md-none">
		<img src="@app/assets/images/homepage/bottom_md.svg" class="bgImage d-md-block d-lg-none d-none">
		<div class="col-lg-10 offset-lg-1 col-12 d-flex flex-row flex-wrap py-3 px-0 inner-wrapper">
			<div class="col-lg-6 col-12 d-flex flex-row py-2 px-0">
				<div class="col-6 d-flex flex-row px-0" style="align-items: center; justify-content: center;">
					<div class="d-flex flex-column">
						<div>
							<h5 class="sessionHead">
								Company
							</h5>
						</div>
						<div class="text-left">
							<NuxtLink class="linkText" to="/#">
								About Us
							</NuxtLink>
						</div>
						<div class="text-left">
							<NuxtLink class="linkText" to="/#">
								Term of Use
							</NuxtLink>
						</div>
						<div class="text-left">
							<NuxtLink class="linkText" to="/#">
								Privacy Policy
							</NuxtLink>
						</div>
					</div>
				</div>
				<div class="col-6 d-flex flex-row px-0" style="align-items: center; justify-content: center;">
					<div class="d-flex flex-column">
						<div>
							<h5 class="sessionHead">
								<i class="fas fa-circle" style="margin-left:3px;font-size:15px;" />
								<i class="fas fa-circle" style="margin-left:3px;font-size:15px;" />
								<i class="fas fa-circle" style="margin-left:3px;font-size:15px;" />
							</h5>
						</div>
						<div class="text-left">
							<NuxtLink class="linkText" to="/#">
								Terms & Conditions
							</NuxtLink>
						</div>
						<div class="text-left">
							<NuxtLink class="linkText" to="/#">
								Terms of Service
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-6 col-12 d-flex px-0 flex-row py-2">
				<div class="col-6 d-flex flex-row px-0" style="align-items: center; justify-content: center;">
					<div class="d-flex flex-column">
						<div>
							<h5 class="sessionHead">
								Community
							</h5>
						</div>
						<div class="text-left">
							<NuxtLink class="linkText" to="/#">
								Blog
							</NuxtLink>
						</div>
						<div class="text-left">
							<NuxtLink class="linkText" to="/#">
								Honor Code
							</NuxtLink>
						</div>
					</div>
				</div>

				<div class="col-6 d-flex flex-row px-0" style="align-items: center; justify-content: center;">
					<div class="d-flex flex-column">
						<div>
							<h5 class="sessionHead">
								Help
							</h5>
						</div>
						<div>
							<NuxtLink class="linkText" to="/#">
								FAQ
							</NuxtLink>
						</div>
						<div>
							<NuxtLink class="linkText" to="/#">
								Customer Care
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 mt-2 d-flex flex-column class border-top border-white align-items-center justify-content-center">
				<div class="py-1 d-flex flex-row">
					<div class="px-1">
						<NuxtLink class="linkText" to="/#">
							<img src="@app/assets/images/homepage/facebook_icon.png" height="21">
						</NuxtLink>
					</div>
					<div class="px-1">
						<NuxtLink class="linkText" to="/#">
							<img src="@app/assets/images/homepage/instagram_icon.png" height="21">
						</NuxtLink>
					</div>
					<div class="px-1">
						<NuxtLink class="linkText" to="/#">
							<img src="@app/assets/images/homepage/twitter_icon.png" height="21">
						</NuxtLink>
					</div>
					<div class="px-1">
						<NuxtLink class="linkText" to="/#">
							<img src="@app/assets/images/homepage/youtube_icon.png" height="21">
						</NuxtLink>
					</div>
				</div>
				<div class="linkText" style="font-size: 14px;">
					&copy; 2020 - 2021 | Stranerd LLC. All rights reserved.
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'HomeBottomNavigation'
})
</script>

<style lang="scss" scoped>
	.sessionHead {
		color: white;
		font-weight: $font-weight-bold;
	}

	.linkText {
		font-size: 13px;
		color: white;
	}

	.bgImage {
		position:absolute;
		width:100%;
		height: auto;
	}

	  .content_wrapper {
	   height: auto;
	   position: relative;
   }

     .inner-wrapper {
	    position:relative;
		height: 500px;
		  @media (min-width: $md) { height: 700px;}
	    @media (min-width: $lg) { height: 500px;}
   }
</style>
