<template>
	<div class="col-12 py-0 px-0 pt-2 pb-1" style="background:#191C29;">
		<div class="col-lg-10 offset-lg-1 col-12 d-flex flex-row flex-wrap py-3 px-0">
			<div class="col-lg-6 col-12 d-flex flex-row py-2 px-0">
				<div class="col-6 d-flex flex-row px-0" style="align-items:center; justify-content:center;">
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
				<div class="col-6 d-flex flex-row px-0" style="align-items:center; justify-content:center;">
					<div class="d-flex flex-column">
						<div>
							<h5 class="sessionHead">
								Community
							</h5>
						</div>
						<div class="text-left">
							<NuxtLink class="linkText" to="/#">
								Become A Nerd
							</NuxtLink>
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
			</div>
			<div class="col-lg-6 col-12 d-flex px-0 flex-row py-2">
				<div class="col-6 d-flex flex-row px-0" style="align-items:center; justify-content:center;">
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
								Contact
							</NuxtLink>
						</div>
					</div>
				</div>
				<div class="col-6 d-flex flex-row px-0" style="align-items:center; justify-content:center;">
					<div class="d-flex flex-column">
						<div>
							<h5 class="sessionHead">
								Contact
							</h5>
						</div>
						<div>
							<img src="@app/assets/images/homepage/phone_icon.png" height="18"><NuxtLink class="linkText" style="padding-right:3px;" to="/#">
								+1 800 STRANERD
							</NuxtLink>
						</div>
						<div>
							<img src="@app/assets/images/homepage/mail_icon.png" height="16"><NuxtLink class="linkText" style="padding-right:3px;" to="/#">
								support@stranerd.com
							</NuxtLink>
						</div>
						<div>
							<img src="@app/assets/images/homepage/mail_icon.png" height="16"><NuxtLink class="linkText" style="padding-right:3px;" to="/#">
								favour@stranerd.com
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 mt-2 d-flex flex-column" style="border-top:1px solid #ffffff;align-items:center;justify-content:center;">
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
				<div class="linkText" style="font-size:14px;">
					&copy; 2020 - 2021 | Stranerd LLC. All rights reserved.
				</div>
				<div class="linkText">
					<NuxtLink style="font-size:14px;" to="/#">
						Nerds Terms & Conditions
					</NuxtLink>
				</div>
				<div class="linkText">
					<NuxtLink style="font-size:14px;" to="/#">
						Terms & Conditions
					</NuxtLink>
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
	color:white;
	font-family:BoldFont;
}

.linkText {
	font-size:13px;
	color:white;
}
</style>
