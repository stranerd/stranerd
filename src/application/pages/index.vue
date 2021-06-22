<template>
	<div>
		<div class="hero gap-1">
			<div class="text-con mt-3">
				<h3>Get Quick Help, For Homework And Study Problems</h3>
				<h4>Link up with smart students in various subjects.</h4>
				<p>We bring you the #1 Platform that gives you the opportunity to Collaborate, Innovate and get the Tools that make you excel in the student community and beyond.</p>
				<NuxtLink to="/auth" class="btn btn-primary border border-light-blue py-0-75">
					Join Today
				</NuxtLink>
			</div>
			<div>
				<img src="@app/assets/images/homepage/hero-image.png" alt="" class="w-100">
			</div>
		</div>
		<div class="sectionTwo gap-1">
			<div class="phone-img">
				<img src="@app/assets/images/homepage/phone.png" alt="" class="w-100">
			</div>
			<div class="details gap-0-5 gap-lg-1-5">
				<p>
					<span class="d-block">Already Trusted By</span>
					<span class="num d-block bold">30,000+</span>
					<span class="d-block">Students On Social Media</span>
				</p>
				<div>
					<img src="@app/assets/images/homepage/tick.svg" alt="" class="tick">
				</div>
			</div>
		</div>
		<div class=" py-3">
			<div class=" sectionThird d-flex w-100">
				<div class="d-flex flex-column justify-content-center align-items-center  flex-md-row">
					<article class="col-30 col-md-100 p-1 text-center">
						<img src="@app/assets/images/homepage/chat.svg" alt="">
						<h5>Chat Sessions</h5>
						<p>
							Spend quality time on Chat with Nerds who help you study, solve problems and explain solutions thoroughly.
						</p>
					</article>
					<article class="col-30 col-md-100 p-1 text-center">
						<img src="@app/assets/images/homepage/green-tick.svg" alt="">
						<h5>Best Answers</h5>
						<p>
							Your questions get multiple answers and you’re able to choose which is best suitable for you.
						</p>
					</article>
					<article class="col-30 col-md-100 p-1 text-center">
						<img src="@app/assets/images/homepage/nerd.svg" alt="">
						<h5>Become A Nerd</h5>
						<p>
							Answer Questions & Host Chat Sessions to help other students in the subject you are Very Good in.
						</p>
					</article>
				</div>
			</div>
			<div class="thick mx-5 bg-white" />

			<div class="sectionFourth d-flex flex-column w-100">
				<h1 class="text-center mx-auto my-3">
					How It Works
				</h1>

				<div class="d-flex align-items-center">
					<div class="text">
						<h1>Meet A Nerd</h1>
						<p>
							Nerds are smart students who are very good in a particular subject and are always ready to help other students
							out with their difficulties in that subject. <br> Get access to a pool of Nerds and pick your choice, have a One on
							One Chat Session with them and get them to become your study buddy, explain difficult problems, guide you through homework and so on.
						</p>
					</div>
					<div class="img-contain">
						<img src="@app/assets/images/homepage/tn2.svg" alt="">
					</div>
					<div class="img-contain">
						<img src="@app/assets/images/homepage/tn3.svg" alt="">
					</div>
				</div>

				<div class="d-flex align-items-center mt-2">
					<div class="img-contain">
						<img src="@app/assets/images/homepage/tn4.svg" alt="">
					</div>
					<div class="img-contain">
						<img src="@app/assets/images/homepage/tn5.svg" alt="">
					</div>

					<div class="text">
						<h1>Ask A Question</h1>
						<p>
							Post a Question, the question public and all Nerds can see it.
							You will get answers from multiple Nerds and will be able to rate the answers,
							choose which is best and Tip Nerds for their effort.
						</p>
					</div>
				</div>

				<div class="d-flex align-items-center mt-2">
					<div class="text">
						<h1>Coin System</h1>
						<p>
							Purchase affordable coins to interact on the website. Bronze coins are used to Ask A Question, for as low as 4 coins per question.
							Gold coins are used to have One on One Chat Sessions with Nerds & used to Tip Nerds.
						</p>
					</div>

					<div class="img-contain">
						<img src="@app/assets/images/homepage/tn6.svg" alt="">
					</div>
				</div>
			</div>
		</div>
		<div class="sectionFifth p-3">
			<h4 class="text-center text-white">
				The solutions to your problems are just one Click away.
			</h4>
			<NuxtLink to="/auth" class="btn-secondary mx-1 font-weight-bold">
				Sign up Today
			</NuxtLink>
		</div>

		<div class="sectionSixth d-flex flex-column w-100 pb-4">
			<h1 class="text-center mx-auto my-3">
				Contact Us
			</h1>

			<div class="d-flex  justify-content-around">
				<div class="text d-flex flex-column">
					<h1>Send A Message</h1>
					<input type="text" placeholder="Email..." class="my-1">
					<textarea id="" name="text" rows="4" class="mb-1" placeholder="Write Message..." />
					<button class="btn-primary">
						Send
					</button>
				</div>
				<div class="text-left d-flex flex-column align-items-end contact">
					<h1>Get In Touch</h1>
					<div class="d-flex align-items-center ">
						<p class="mr-2 mb-0">
							+1 800 STRANERD
						</p>
						<img src="@app/assets/images/homepage/phone.svg">
					</div>
					<div class="d-flex align-items-center">
						<p class="mr-2 mb-0">
							support@stranerd.com
						</p>
						<img src="@app/assets/images/homepage/mail.svg">
					</div>
					<div class="d-flex align-items-center">
						<p class="mr-2 mb-0">
							favour@stranerd.com
						</p>
						<img src="@app/assets/images/homepage/mail.svg">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'IndexPage',
	layout: 'home'
})
</script>

<style scoped lang="scss">
.mx-5{
	margin: 0px 80px;
}
.hero{
	min-height: calc(50vh - 60px);
	color: #214A73;
	display: flex;
	flex-direction: column;
	padding: 2rem;
	@media (min-width: $md) {
		flex-direction: row;
		align-items: center;
		padding: 4rem;
	}
	@media (min-width: $lg) {
		padding: 6rem;
		min-height: calc(100vh - 60px);
	}
	.text-con{
		h3, h4 { font-weight: bold; }
		p { margin-bottom: 0.5rem; }
		h3 { font-size: 1.5rem; }
		h4 { font-size: 1.125rem; }
		p { font-size: 1rem; }
		a { font-size: 1rem; }
		@media (min-width: $lg) {
			h3 { font-size: 2.5rem; }
			h4 { font-size: 1.875rem; }
			p { font-size: 1.5rem; }
			a { font-size: 1.5rem; }
		}
	}
}

.sectionTwo{
	display: flex;
	align-items: center;
	background: $color-blue;
	flex-direction: column-reverse;
	padding: 2rem 2rem 0;
	@media (min-width: $md) {
		flex-direction: row;
		padding: 4rem 4rem 0;
	}
	@media (min-width: $lg) {
		padding: 6rem 6rem 0;
	}
	.details{
		flex-grow: 1;
		display: flex;
		justify-content: center;
		flex-direction: column;
		@media (min-width: $lg) {
			flex-direction: row;
			align-items: center;
		}
		p {
			margin: 0;
			color: $color-white;
			font-size: 1.5rem;
			span.num{
				font-size: 4rem;
				line-height: 4rem;
			}
			@media (min-width: $lg) {
				font-size: 2rem;
				span.num {
					font-size: 7.5rem;
					line-height: 7.5rem;
				}
			}
		}
	}
	.phone-img {
		flex: 35%;
	}
	.tick {
		width: 96px;
		height: 96px;
		@media (min-width: $lg) {
			width: 260px;
			height: 260px;
		}
	}
}
.sectionThird{
	max-width: 89vw;
	margin: 10px 60px;
	@media (max-width: $md) {
		max-width: 100%;
		margin: 0;
		padding: 2rem 3rem;

	}
article{
	width: 30%;
	@media (max-width: $md) {
		width: 100%;
	}
	img{
	margin-bottom: 1rem;
}
}
}
.sectionFourth{
	max-width: 89vw;
	margin: 10px 60px;
		@media (max-width: $md) {
		max-width: 100%;
		margin: 0;
		padding: 2rem 3rem;
	}
		@media (max-width: $sm) {
			padding: 1rem;
		}

	.d-flex{
		@media (max-width: $md) {
			flex-wrap: wrap;
		}
		@media (max-width: $sm) {
			flex-wrap: nowrap;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
	h1{
		color: $color-tint-blue;
		// text-align: center;
	}

	.text{

		@media (max-width: $md) {
			order: 3;
			margin-left: 1rem;
		}
		width: 70%;
			@media (max-width: $md) {
			width: 100%;
		}
		h1{
			font-size: 2rem;
			text-align: end;

		}
	}
}
.sectionFifth{
	background: $color-blue;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 300px;
	h4{
		font-weight: normal !important;
		font-size: 230%;
		@media (max-width: $sm) {
			font-size: 170%;
		}
	}

	.btn-secondary{
		color: $color-dim-blue;
		font-weight: 600;
		margin-top: 2rem;
		font-size: 2rem;
		padding: 13px 85px;
		@media (max-width: $sm) {

			font-size: 1rem;
			padding: 13px 30px;
		}
	}
}

.sectionSixth{
	max-width: 89vw;
	margin: 10px 60px;
		@media (max-width: $md) {
		max-width: 100%;
		margin: 0;
		padding: 2rem 3rem;
	}
		@media (max-width: $sm) {
			padding: 1rem;
		}
			.contact{
			@media (max-width: $md) {
			margin-top: 4rem;

		}
		.d-flex{
			margin: 5px 0px;
				p{
			font-size: 1.8rem;

				@media (max-width: $sm) {
			font-size: 1.2rem;

		}
		}
		}
	}

	.d-flex{
		@media (max-width: $md) {
			flex-wrap: wrap;
			justify-content: center;
			// align-items: center;
		}
		@media (max-width: $sm) {
			// flex-wrap: nowrap;

		}
		img{
			width: 32px;
			margin-left: 1rem;
		}

	}
	h1{
		color: $color-tint-blue;
		font-weight: normal;
	}
	input{
		padding: 7px 12px;
		border: 2px solid #AFC4D9;
		border-radius: 6px;
		width: 400px;
		max-width: 89vw;
	}
	textarea{
		padding: 7px 12px;
		border: 2px solid #AFC4D9;
		border-radius: 6px;
		width: 400px;
		max-width: 89vw;
	}
	button{
		max-width: 130px;
		padding: 11px 0px;
	}
}
</style>
