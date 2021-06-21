<template>
	<div>
		<div class="bg-white py-3">
			<div class=" sectionOne d-flex w-100">
				<div class="text-con">
					<h3>
						Get Quick Help, <br> For Homework And Study Problems
					</h3>
					<h4>Link up with smart students in various subjects.</h4>
					<p>We bring you the #1 Platform that gives you the opportunity to Collaborate, Innovate and get the Tools that make you excel in the student community and beyond.</p>
					<NuxtLink to="/auth" class="btn btn-primary mt-1-5 border border-light-blue px-3 py-1">
						Join Today
					</NuxtLink>
				</div>
				<div class="img-contain">
					<img src="@app/assets/images/homepage/hero-image.png" alt="" class="img">
				</div>
			</div>
		</div>
		<div class="sectionTwo">
			<div class="img-contain">
				<img src="@app/assets/images/homepage/phone.png" alt="" class="img">
			</div>
			<div class="details">
				<div>
					<p>Already Trusted By <br> <span class="bold">30,000+</span> <br>Students On Social Media</p>
				</div>
				<div class="img-contain">
					<img src="@app/assets/images/homepage/tick.svg" alt="" class="tick">
				</div>
			</div>
		</div>
		<div class="bg-white py-3">
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
			<div class="thick mx-5" />

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
.sectionOne{
	color: #214A73;
	display: flex;
	align-items: center;
	padding: 5rem;
		@media (max-width: $lg) {
				padding: 0rem;

			align-items: flex-start;
		}
		@media (max-width: $md) {
			flex-direction: column;
		}
	.text-con{
		flex-basis: 50%;

		h3{
			font-size: 260%;
			width: 400px;
			margin-left: 60px;
			max-width: 80vw;
			@media (max-width: $md) {
			margin-left: 30px;
			font-size: 24px;
			margin-top: 2.4rem;
		}
		}
		h4{
			margin: 28px 0px 28px 60px;
			font-size: 19px;
			width: 380px;
			max-width: 80vw;
			@media (max-width: $md) {
			margin: 18px 0px 18px 30px;
			font-size: 18px;
			width: 400px;
		}
		}
		p{
			margin-left: 60px;
			width: 450px;
			max-width: 80vw;
			font-size: 18px;
			@media (max-width: $md) {
			margin-left: 30px;
			font-size: 18px;
		}
		}
		.btn{
			margin-left: 60px;
			background: $color-tint-blue;
			@media (max-width: $md) {
			margin-left: 30px;
			padding: 6px 28px !important;
			margin-top: 0 !important;
			margin-bottom: 36px;
			color: white;
		}

		}
	}
}

.sectionTwo{
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 5rem;
		@media (max-width: $md) {
			flex-direction: column;

		}
	.details{
		flex-basis: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		@media (max-width: $lg) {
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
		}
		@media (max-width: $md) {
			padding: 1rem;
			align-items: flex-start;
		order: 1;
		flex-direction: row;
		flex-wrap: wrap;
		}
	}
	p{
		font-size: 30px;
		color: $color-white;
		line-height: 56px;
		margin-right: 2rem;
			@media (max-width: $sm) {
		margin: 0;
		}
		span{
			font-size: 75px;
		}
	}
	@media (max-width: $lg) {
				padding: 0rem;
	}
	.img-contain{
		flex-basis: 30%;
			@media (max-width: $md) {
		order: 2;
		}
		.tick{
			max-width: 200px;
			height: auto;
			@media (max-width: $lg) {
				max-width: 180px;
			}
		}
		.img{
		width: 400px;
		height: auto;
		margin: 60px 80px 0px 60px;
			@media (max-width: $md) {
		margin: 0;
		}
	}
	}
}
.img-contain {
	flex-basis: 50%;
	width: 100%;
		flex-grow: 1;
		align-self: center;
		margin-top: 0;
		@media (max-width: $md) {
			display: flex;
			justify-content: center;
		}
	.img{
			margin: 0px auto;
		width: 80%;
		max-width: 85vw;
		@media (max-width: $lg) {
			width: 100%
		}
		@media (max-width: $md) {
			width: 400px;
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
</style>
