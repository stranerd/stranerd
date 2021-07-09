<template>
	<div class="py-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 d-flex flex-column" style="margin-top:45px;">
		<div class="d-flex flex-row col-12 py-0 px-0">
			<form class="col-md-6 d-flex flex-column mt-md-5 px-1 col-12">
				<div class=" col-12 d-md-block d-none">
					<h1>
						Verify Your Email Address
					</h1>
				</div>
				<div class=" col-12 d-md-none d-block text-center">
					<h1>
						Verify Your Email Address
					</h1>
				</div>
				<div class="py-1 pe-3 d-md-block d-none">
					<span class="textStyle">
						An email was just sent to <b>{{ email }}</b>. Follow the link to verify your account.
						If an error occured or you didn't recieve the email, click the button below to resend the email.
					</span>
				</div>
				<div class="py-1 text-center d-md-none d-block">
					<span class="textStyle">
						An email was just sent to <b>{{ email }}</b>. Follow the link to verify your account.
						If an error occured or you didn't recieve the email, click the button below to resend the email.
					</span>
				</div>
				<div class="pb-2 text-center">
					<button class="btn btn btn-lg btn-custom py-1 " style="width: 100%;" @click="verifyEmail">
						Resend Mail
					</button>
				</div>
				<div class="pb-2 d-flex flex-row" style="align-items:center;justify-content:center;">
					<div class="textStyle">
						Return to
					</div>
					<div style="text-decoration:underline;margin-left:4px;">
						<NuxtLink to="/auth/signin">
							Sign In
						</NuxtLink>
					</div>
				</div>
				<div class="mb-2">
					<DisplayError :error="error" />
					<PageLoading v-if="loading" />
				</div>
			</form>
			<div class="col-md-6 text-center py-0 px-3 d-md-block d-none">
				<img src="@app/assets/images/auth/verify.svg" style="width:100%;height:400px;">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useVerifyEmail } from '@app/hooks/auth/session'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AuthVerifyPage',
	layout: 'auth',
	middleware: [
		({ redirect }) => {
			const { auth } = useAuth()
			if (!auth.value) redirect('/auth/signin')
		}
	],
	setup () {
		const { email, loading, error, message, verifyEmail } = useVerifyEmail()
		onMounted(verifyEmail)
		return { email, loading, error, message, verifyEmail }
	}
})
</script>
<style lang="scss" scoped>
.headerStyle {
		font-weight: bolder;
		text-transform: none;
		color: $color-text-main;
	}

	.btn-custom {
		background-color: $color-btn;
		color: #fff;
		border: 2px solid ;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}
	.textStyle {
		color:$faded-text;
	}
</style>
