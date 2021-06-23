<template>
	<div>
		<div class="hero gap-1">
			<div class="text-con mt-3">
				<h1>Get Quick Help, For Homework And Study Problems</h1>
				<h4>Link up with smart students in various subjects.</h4>
				<p>We bring you the #1 Platform that gives you the opportunity to Collaborate, Innovate and get the Tools that make you excel in the student community and beyond.</p>
				<NuxtLink to="/auth/signup" class="btn btn-primary border border-light-blue py-0-75">
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
			<div class="details gap-0-5 gap-lg-1-5 py-1">
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
		<div class="sectionThird gap-2">
			<article>
				<img src="@app/assets/images/homepage/chat.svg" alt="">
				<h5>Chat Sessions</h5>
				<p>
					Spend quality time on Chat with Nerds who help you study, solve problems and explain solutions thoroughly.
				</p>
			</article>
			<article>
				<img src="@app/assets/images/homepage/green-tick.svg" alt="">
				<h5>Best Answers</h5>
				<p>
					Your questions get multiple answers and you’re able to choose which is best suitable for you.
				</p>
			</article>
			<article>
				<img src="@app/assets/images/homepage/nerd.svg" alt="">
				<h5>Become A Nerd</h5>
				<p>
					Answer Questions & Host Chat Sessions to help other students in the subject you are Very Good in.
				</p>
			</article>
		</div>
		<div class="bg-blue-grey thin mx-2 mx-md-3 mx-lg-5 my-0" />
		<div id="how-it-works" class="sectionFourth gap-3">
			<h1 class="text-center mx-auto my-0">
				How It Works
			</h1>
			<div class="d-flex gap-1 flex-lg-row-reverse">
				<div class="images">
					<div class="img-contain">
						<img src="@app/assets/images/homepage/tn2.svg" alt="">
					</div>
					<div class="img-contain">
						<img src="@app/assets/images/homepage/tn3.svg" alt="">
					</div>
				</div>
				<div class="text text-end">
					<h2>Meet A Nerd</h2>
					<p>
						Nerds are smart students who are very good in a particular subject and are always ready to help other students
						out with their difficulties in that subject. <br> Get access to a pool of Nerds and pick your choice, have a One on
						One Chat Session with them and get them to become your study buddy, explain difficult problems, guide you through homework and so on.
					</p>
				</div>
			</div>
			<div class="d-flex gap-1 flex-lg-row">
				<div class="images">
					<div class="img-contain">
						<img src="@app/assets/images/homepage/tn4.svg" alt="">
					</div>
					<div class="img-contain">
						<img src="@app/assets/images/homepage/tn5.svg" alt="">
					</div>
				</div>
				<div class="text">
					<h2>Ask A Question</h2>
					<p>
						Post a Question, the question public and all Nerds can see it.
						You will get answers from multiple Nerds and will be able to rate the answers,
						choose which is best and Tip Nerds for their effort.
					</p>
				</div>
			</div>
			<div class="d-flex gap-1 flex-lg-row-reverse">
				<div class="img-contain">
					<img src="@app/assets/images/homepage/tn6.svg" alt="">
				</div>
				<div class="text text-end">
					<h2>Coin System</h2>
					<p>
						Purchase affordable coins to interact on the website. Bronze coins are used to Ask A Question, for as low as 4 coins per question.
						Gold coins are used to have One on One Chat Sessions with Nerds & used to Tip Nerds.
					</p>
				</div>
			</div>
		</div>
		<div class="sectionFifth">
			<h4 class="text-center">
				The solutions to your problems are just one Click away.
			</h4>
			<NuxtLink to="/auth/signup" class="btn-secondary font-weight-bold">
				Sign up Today
			</NuxtLink>
		</div>
		<div id="contact-us" class="sectionSixth gap-2 gap-lg-3">
			<h1 class="text-center mx-auto my-0">
				Contact Us
			</h1>
			<div class="d-flex flex-column flex-lg-row align-items-lg-center gap-2">
				<div class="text d-flex flex-column flex-grow-1">
					<h2>Send A Message</h2>
					<MessageForm />
				</div>
				<div class="text-left d-flex flex-column gap-1 align-items-end flex-grow-1">
					<h2 class="mb-0">
						Get In Touch
					</h2>
					<div class="d-flex gap-1 align-items-center">
						<p class="mb-0">
							+1 800 STRANERD
						</p>
						<img src="@app/assets/images/homepage/phone.svg">
					</div>
					<div class="d-flex gap-1 align-items-center">
						<p class="mb-0">
							support@stranerd.com
						</p>
						<img src="@app/assets/images/homepage/mail.svg">
					</div>
					<div class="d-flex gap-1 align-items-center">
						<p class="mb-0">
							favour@stranerd.com
						</p>
						<img src="@app/assets/images/homepage/mail.svg">
					</div>
					<div class="d-flex justify-content-end gap-1 gap-md-2">
						<a target="__blank" href="https://facebook.com/officialstranerd">
							<i class="fab fa-facebook" />
						</a>
						<a target="__blank" href="https://instagram.com/officialstranerd">
							<i class="fab fa-instagram" />
						</a>
						<a target="__blank" href="https://twitter.com/stranerds">
							<i class="fab fa-twitter" />
						</a>
					</div>
				</div>
			</div>
		</div>
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
.hero {
	min-height: calc(50vh - 60px);
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
		min-height: calc(90vh - 60px);
	}
	.text-con{
		p { margin-bottom: 0.5rem; }
		h1 { font-size: 1.5rem; }
		h4 { font-size: 1.125rem; }
		p { font-size: 1rem; }
		a { font-size: 1rem; }
		@media (min-width) {
			h1 { font-size: 1.5rem; }
		}
		@media (min-width: $lg) {
			h1 { font-size: 2.5rem; }
			h4 { font-size: 1.875rem; }
			p { font-size: 1.5rem; }
			a { font-size: 1.5rem; }
		}
	}
}

.sectionTwo {
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

.thin { height: 1.5px; }

.sectionThird {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem;
	@media (min-width: $md) {
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		padding: 3rem;
		margin: 0 auto;
	}
	@media (min-width: $lg) { padding: 5rem; }
	article {
		@media (min-width: $md) { max-width: 30%; }
		flex-grow: 1;
		text-align: center;
		img {
			margin-bottom: 0.5rem;
			width: 90px;
			height: 90px;
		}
		h5 {
			font-size: 1.25rem;
			@media (min-width: $lg) { font-size: 1.875rem; }
		}
		p {
			max-width: 40ch;
			font-size: 1rem;
			@media (min-width: $md) { font-size: 1.125rem; }
		}
	}
}

.sectionFourth {
	display: flex;
	flex-direction: column;
	padding: 2rem;
	@media (min-width: $md) { padding: 3rem; }
	@media (min-width: $lg) { padding: 5rem; }
	& > .d-flex {
		flex-direction: column;
		align-items: center;
		& > * { flex: 1; }
		.images {
			display: flex;
			flex-direction: column;
			align-items: center;
			@media (min-width: $md) { flex-direction: row; }
		}
	}
	h2 {
		font-size: 1.875rem;
		@media (min-width: $md) { font-size: 3rem; }
	}
	p {
		font-size: 1rem !important;
		@media (min-width: $md) { font-size: 1.5rem !important; }
	}
}

.sectionFifth {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: $color-blue;
	color: $color-white;
	min-height: 300px;
	padding: 1rem;
	@media (min-width: $md) { padding: 2.5rem; }
	@media (min-width: $lg) { padding: 5rem; }
	h4{
		margin: 0 0 1rem;
		font-weight: normal !important;
		font-size: 1.125rem;
		@media (min-width: $md) { font-size: 2.25rem; }
		@media (min-width: $lg) { font-size: 3rem; }
	}

	.btn-secondary{
		font-size: 2rem;
		padding: 13px 85px;
		@media (max-width: $sm) {

			font-size: 1rem;
			padding: 13px 30px;
		}
	}
}

.sectionSixth{
	display: flex;
	flex-direction: column;
	padding: 1rem;
	@media (min-width: $md) { padding: 2.5rem; }
	@media (min-width: $lg) { padding: 5rem; }
	img {
		width: 32px;
	}
	i {
		font-size: 42px;
		@media (min-width: $md) { font-size: 84px; }
	}
}

p {
	margin-bottom: 0;
	font-size: 1.125rem;
	@media (min-width: $md) { font-size: 1.875rem; }
}
h1 {
	font-size: 2.25rem;
	@media (min-width: $md) { font-size: 3rem; }
	@media (min-width: $lg) { font-size: 4rem; }
}
h2 {
	font-weight: 400 !important;
	font-size: 1.5rem;
	@media (min-width: $md) { font-size: 2.25rem; }
	@media (min-width: $lg) { font-size: 3rem; }
}
</style>
