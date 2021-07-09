<template>
	<div class="col-12">
		<!-- first session -->
		<!-- large screen -->
		<div
			class="col-10 offset-lg-1 py-4 flex-row flex-wrap d-none d-lg-flex"
			style="margin-top: 40px; margin-bottom: 30px; align-items: center;"
		>
			<div class="d-flex flex-column col-6 px-1">
				<div class="mb-1">
					<h1 class="headerStyle main-background-text">
						Get quick help for homework and study problems
					</h1>
				</div>
				<div class="mb-1">
					<span
						class="paragraphStyle"
						style="color: grey;"
					>Leverage a large community of smart student for your academic needs
						while make connections that would impact you for life.</span>
				</div>
				<div>
					<NuxtLink
						class="btn btn-lg btn-custom px-3"
						style="font-size: 18px; font-weight:bold;"
						to="/auth/signin"
					>
						Join Today
					</NuxtLink>
				</div>
			</div>
			<div
				class="d-flex flex-row col-6 px-1"
				style="align-items: center; justify-content: center;"
			>
				<div style="width: 100%;" class="text-center mt-4">
					<img src="@app/assets/images/homepage/home_image.svg" height="330">
				</div>
			</div>
		</div>
		<!-- ends -->
		<!-- small and medium -->
		<div
			class="col-12 px-md-3 px-2 d-flex py-2 flex-column d-lg-none"
			style="
	margin-top: 30px;
	margin-bottom: 50px;
	align-items: center;
	justify-content: center;
"
		>
			<div
				class="d-flex flex-row col-12 px-1 mb-2"
				style="align-items: center; justify-content: center;"
			>
				<div style="width: 100%;" class="text-center mt-4">
					<img src="@app/assets/images/homepage/home_image.svg" height="250">
				</div>
			</div>
			<div
				class="d-flex flex-column col-12 px-1"
				style="align-items: center; justify-content: center;"
			>
				<div class="mb-1 text-center">
					<h2 class="headerStyle main-background-text">
						Get quick help for homework and study problems
					</h2>
				</div>
				<div class="mb-1 text-center">
					<span
						class="paragraphStyle"
						style="color: grey;"
					>Leverage a large community of smart student for your academic needs
						while make connections that would impact you for life.</span>
				</div>
				<div class="text-center">
					<NuxtLink
						class="btn btn-md btn-custom px-2"
						style="font-size: 18px;"
						to="/auth/signin"
					>
						Join Today
					</NuxtLink>
				</div>
			</div>
		</div>
		<!-- ends -->
		<!-- ends -->
		<!-- Trusted by session -->
		<div
			class="col-12 px-0 py-0 pt-4 main-background"
			style=" margin-bottom: 20px;"
		>
			<div
				class="col-lg-10 offset-lg-1 d-lg-flex d-none flex-row flex-wrap py-0"
				style="align-items: center; justify-content: center; height: 100%;"
			>
				<img
					src="@app/assets/images/homepage/phone.png"
					height="500"
					style="margin-bottom: 0 !important;"
				>
				<div class="px-2 d-flex flex-column" style="color: white;">
					<div style="font-size: 25px;">
						Already trusted by
					</div>
					<div style="font-size: 57px; font-weight: bolder;">
						30,000+
					</div>
					<div style="font-size: 35px;">
						Students on social media
					</div>
				</div>
			</div>
			<div
				class="col-lg-10 offset-lg-1 d-lg-none d-flex flex-row flex-wrap py-0"
				style="align-items: center; justify-content: center; height: 100%;"
			>
				<div
					class="px-2 d-flex flex-column"
					style="color: white; align-items: center; justify-content: center;"
				>
					<div style="font-size: 20px;">
						Already trusted by
					</div>
					<div style="font-size: 50px; font-weight: bold;">
						30,000+
					</div>
					<div style="font-size: 20px;">
						Students on social media
					</div>
					<div class="mt-3">
						<img src="@app/assets/images/homepage/phone.png" height="300">
					</div>
				</div>
			</div>
		</div>
		<!-- ends -->
		<!-- Features -->
		<div class="col-12 px-0 py-0 pt-2" style="margin-bottom: 20px;">
			<div
				class="col-lg-10 offset-lg-1 d-flex flex-column py-0 px-0"
				style="align-items: center; height: 100%;"
			>
				<div class="col-12 text-center">
					<h1 style="color: #000;">
						Features
					</h1>
				</div>
				<div
					class="col-12 px-1 d-flex flex-row flex-wrap"
					style="align-items: center;"
				>
					<div class="col-md-4 py-2 px-0 px-md-2">
						<div class="card py-5 px-0 cardCurves">
							<img
								src="@app/assets/images/homepage/corner.svg"
								style="position: absolute; top: 0%; left: -1px;"
							>
							<div
								class="col-12 px-1 d-flex flex-column"
								style="align-items: center; justify-content: center;"
							>
								<div class="py-1">
									<img src="@app/assets/images/homepage/question.svg">
								</div>
								<div>
									<h4 style="color: #000; font-weight: bolder;">
										Chat sessions
									</h4>
								</div>
								<div class="text-center pt-1">
									<span
										style="color: gray; font-size: 15px;"
									>Spend quality of time on Chat with Nerd who help you study,
										solve problems, and explain solutions thoroughly.</span>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-4 py-2 px-0 px-md-2">
						<div class="card py-5 px-0 cardCurves">
							<img
								src="@app/assets/images/homepage/corner.svg"
								style="position: absolute; top: 0%; left: -1px;"
							>
							<div
								class="col-12 px-1 d-flex flex-column"
								style="align-items: center; justify-content: center;"
							>
								<div class="py-1">
									<img src="@app/assets/images/homepage/mark2.svg">
								</div>
								<div>
									<h4 style="color: #000; font-weight: bolder;">
										Best Answers
									</h4>
								</div>
								<div class="text-center pt-1">
									<span
										style="color: gray; font-size: 15px;"
									>Your question get multiple answers and you are able to
										choose which is best for you.</span>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-4 py-2 px-0 px-md-2">
						<div class="card py-5 px-0 cardCurves">
							<img
								src="@app/assets/images/homepage/corner.svg"
								style="position: absolute; top: 0%; left: -1px;"
							>
							<div
								class="col-12 px-1 d-flex flex-column"
								style="align-items: center; justify-content: center;"
							>
								<div class="py-1">
									<img src="@app/assets/images/homepage/user1.svg">
								</div>
								<div>
									<h4
										style="color: #000; font-weight: bold;"
									>
										Become a Nerd
									</h4>
								</div>
								<div class="text-center pt-1">
									<span
										style="color: gray; font-size: 15px;"
									>Answer Questions and Host Chat Sessions to help other
										students in the subject you are Very Good in.</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- ends -->
		<!-- how it works -->
		<div class="col-12 px-md-0 px-1 py-0 pt-2" style="margin-bottom: 40px;">
			<div
				class="
          col-lg-8
          offset-lg-2
          col-md-10
		  px-0
          offset-md-1
          d-flex
          flex-column
          py-0
        "
				style="align-items: center; height: 100%;"
			>
				<div class="col-12 text-center mb-1">
					<h1 style="color: #000;">
						How it works
					</h1>
				</div>
				<div
					class="col-12 px-0 d-flex flex-column mt-3 px-2 py-2 px-md-4 greyWrapper"
					style="align-items: center;"
				>
					<div class="text-center mb-2">
						<h4 style="font-weight: bold;" class="main-background-text">
							Ask A Question
						</h4>
					</div>
					<div class="d-flex flex-column">
						<div class="d-flex flex-row" style="align-items: center;">
							<div class="mr-1 main-background-text">
								<i class="fa fa-dot-circle" />
							</div>
							<div class="px-1">
								<span
									style="font-size: 16px;"
								>Ask questions on various subjects</span>
							</div>
						</div>
						<div class="d-flex flex-row" style="align-items: center;">
							<div class="mr-1 main-background-text">
								<i class="fa fa-dot-circle" />
							</div>
							<div class="px-1">
								<span
									style="font-size: 16px;"
								>Go through all available answers</span>
							</div>
						</div>
						<div class="d-flex flex-row" style="align-items: center;">
							<div class="mr-1 main-background-text">
								<i class="fa fa-dot-circle" />
							</div>
							<div class="px-1">
								<span
									style="font-size: 16px;"
								>Choose your best answer (Leave a tip!)</span>
							</div>
						</div>
					</div>
					<div
						class="my-2 d-flex flex-row flex-wrap"
						style="align-items: center; justify-content: center;"
					>
						<div class="col-md-6 text-center px-1">
							<img src="@app/assets/images/homepage/ask_question.png">
						</div>
						<div class="col-md-6 text-center px-1">
							<img src="@app/assets/images/homepage/answers.png">
						</div>
					</div>
				</div>
				<div
					class="col-12 px-1 d-flex flex-column mt-3 px-0 py-2 py-md-4 greyWrapper"
					style="align-items: center;"
				>
					<div class="text-center mb-2">
						<h4 style=" font-weight: bolder;" class="main-background-text">
							Be A Nerd
						</h4>
					</div>
					<div class="d-flex flex-column">
						<div class="d-flex flex-row" style="align-items: center;">
							<div class="mr-1 main-background-text">
								<i class="fa fa-dot-circle" />
							</div>
							<div class="px-1">
								<span
									style="font-size: 16px;"
								>Help others in subject you're adept at</span>
							</div>
						</div>
						<div class="d-flex flex-row" style="align-items: center;">
							<div class="mr-1 main-background-text">
								<i class="fa fa-dot-circle" />
							</div>
							<div class="px-1">
								<span
									style="font-size: 16px;"
								>Collaborate and learn with other Nerds</span>
							</div>
						</div>
						<div class="d-flex flex-row" style="align-items: center;">
							<div class="mr-1 main-background-text">
								<i class="fa fa-dot-circle" />
							</div>
							<div class="px-1">
								<span
									style="font-size: 16px;"
								>Share relevant files to aid learning</span>
							</div>
						</div>
					</div>
					<div
						class="my-2 d-flex flex-row flex-wrap"
						style="align-items: center; justify-content: center;"
					>
						<div class="col-md-6 text-center px-1">
							<img src="@app/assets/images/homepage/top_nerd.png">
						</div>
						<div class="col-md-6 text-center px-1">
							<img src="@app/assets/images/homepage/chat_view.png">
						</div>
					</div>
				</div>
				<div
					class="col-12 px-1 d-flex flex-column mt-3 px-0 py-2 py-md-4 greyWrapper"
					style="align-items: center;"
				>
					<div class="text-center mb-2">
						<h4 style="font-weight: bolder;" class="main-background-text">
							Coin System
						</h4>
					</div>
					<div class="d-flex flex-column">
						<div class="d-flex flex-row" style="align-items: center;">
							<div class="mr-1 main-background-text">
								<i class="fa fa-dot-circle" />
							</div>
							<div class="px-1">
								<span
									style="font-size: 16px;"
								>Buy affordable coins to interact</span>
							</div>
						</div>
						<div class="d-flex flex-row" style="align-items: center;">
							<div class="mr-1 main-background-text">
								<i class="fa fa-dot-circle" />
							</div>
							<div class="px-1">
								<span
									style="font-size: 16px;"
								>Bronze Coins are used to Ask Questions</span>
							</div>
						</div>
						<div class="d-flex flex-row" style="align-items: center;">
							<div class="mr-1 main-background-text">
								<i class="fa fa-dot-circle " />
							</div>
							<div class="px-1">
								<span
									style="font-size: 16px;"
								>Gold Coins are used for Tipping</span>
							</div>
						</div>
					</div>
					<div
						class="my-2 d-flex flex-row flex-wrap"
						style="align-items: center;"
					>
						<div class="col-12 d-lg-block d-none px-1 text-center">
							<img
								src="@app/assets/images/homepage/buy_coin_new.svg"
								width="60%"
							>
						</div>

						<div class="col-12 d-block d-lg-none px-1 text-center">
							<img
								src="@app/assets/images/homepage/buy_coin_new.svg"
								width="100%"
							>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- ends -->
		<!-- Join community -->
		<div class="col-12 px-2 py-0 pt-2 main-background">
			<div
				class="col-lg-10 offset-lg-1 d-flex flex-column py-4"
				style="align-items: center; justify-content: center; height: 100%;"
			>
				<img src="@app/assets/images/homepage/globe.svg" height="300">
				<div class="px-2 text-center my-2" style="color: white;">
					<span
						style="font-size: 17px; font-weight: bold;"
					>Join a community of smart students just like you</span>
				</div>
				<div class="text-center">
					<NuxtLink
						class="btn btn-lg white-btn-custom px-3"
						style="font-size: 15px;"
						to="/auth/signup"
					>
						Sign Up Today
					</NuxtLink>
				</div>
			</div>
		</div>
		<!-- ends -->
		<!-- contact form -->
		<div class="col-12 px-2 py-0 pt-2" style="margin-bottom: 10px;">
			<div
				class="col-lg-10 offset-lg-1 d-flex flex-row py-4"
				style="align-items: center; justify-content: center; height: 100%;"
			>
				<div class="col-md-1 d-lg-inline-block d-none" />
				<div class="col-md-4 py-0 px-0">
					<message-form />
				</div>
				<div class="col-md-1 d-lg-inline-block d-none" />
				<div class="col-md-5 py-0 text-center d-lg-inline-block d-none">
					<img src="@app/assets/images/homepage/contact.svg" height="300">
				</div>
				<div class="col-md-1 d-lg-inline-block d-none" />
			</div>
		</div>
		<!-- ends -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import MessageForm from '@app/components/forms/MessageForm.vue'
export default defineComponent({
	name: 'IndexPage',
	components: { MessageForm },
	layout: 'home'
})
</script>

<style scoped lang="scss">
	.paragraphStyle {
		font-size: 17px;
	}

	.headerStyle {
		font-weight: bolder;
		text-transform: none;
	}

	.main-background {
		background: $main-background-color;
	}

	.main-background-text {
		color: $main-background-color;
	}

	.white-btn-custom {
		background-color: white;
		color: $main-background-color;
		border: 2px solid #fff;
		border-radius: 6px;
		font-weight: bold;
	}

	.btn-custom {
		background-color: $main-background-color;
		color: #fff;
		border: 2px solid $main-background-color;
		border-radius: 6px;
		font-weight: bold;
	}

	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
	}

	.card:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}

	.cardCurves {
		border: 1px solid #fff;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		width: 100%;
		border-bottom-left-radius: 10px;
	}

	.greyWrapper {
		border: 1px solid #c5c5c5;
		background-color: whitesmoke;
		border-radius: 13px;
		color: grey;
	}
</style>
