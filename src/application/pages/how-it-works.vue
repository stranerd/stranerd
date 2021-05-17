<template>
	<div>
		<div class="d-flex flex-column align-items-center mb-0-5">
			<i class="fas fa-circle text-blue border border-light-blue rounded-pill" style="font-size: 0.5rem; border-width: 0.2rem !important;" />
			<span class="simple-text">Simple &<br>Straightforward</span>
		</div>
		<div class="d-flex flex-column flex-md-row text-blue flex-wrap">
			<div class="meet-a-nerd">
				<div class="meet-a-nerd-blob">
					<h1>How it works</h1>
					<p>- One On One chat session.</p>
					<p>- Share files and documents.</p>
					<p>- Give a Tip to Nerds who help you out.</p>
				</div>
				<div class="people">
					<img src="@app/assets/images/blobs/people.svg" alt="">
				</div>
			</div>
			<div class="ask-a-question">
				<div class="girl">
					<img src="@app/assets/images/blobs/girl.svg" alt="">
				</div>
				<div class="ask-a-question-blob">
					<h1>Ask A Question</h1>
					<p>Post a question to all Nerds who can answer -</p>
					<p>Choose the answer you like best -</p>
					<p>Give a Tip to Nerds who answer -</p>
				</div>
			</div>
		</div>
		<div class="coins text-blue">
			<div class="coin">
				<img src="@app/assets/images/blobs/coins.svg" alt="">
			</div>
			<div class="coins-blob">
				<h1>Coin System</h1>
				<p>- Buy the very cheap coins to interact.</p>
				<p>- Bronze Coins will be used to ask questions.</p>
				<p>- Gold Coins will be used to Tip & have 1 on 1 sessions.</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'HowItWorksPage',
	layout: 'home'
})
</script>

<style lang="scss" scoped>
.simple-text {
	color: $color-light-blue;
	text-align: center;
	font-weight: 600;
	font-size: 1rem;
	@media (min-width: $md) { font-size: 1.25rem; }
	@media (min-width: $lg) { font-size: 1.75rem; }
}
h1 {
	font-size: 1.5rem;
	font-weight: 600;
	margin: 0 0 1rem;
	z-index: 1;
	@media (min-width: $md) { font-size: 2.25rem; }
	@media (min-width: $lg) { font-size: 3rem; }
}
p {
	font-size: 1rem;
	font-weight: 500;
	margin: 0 0 0.5rem;
	z-index: 1;
	@media (min-width: $md) { font-size: 1.25rem; }
	@media (min-width: $lg) { font-size: 1.5rem; }
}
.meet-a-nerd {
	display: flex;
	flex-direction: column;
	@media (min-width: $md) {
		flex-grow: 1;
		max-width: 50%;
	}
	margin-bottom: 1rem;
	.meet-a-nerd-blob {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		background: url('../assets/images/blobs/meet-a-nerd-blob.svg') center right no-repeat;
		background-size: cover;
		padding: 2rem 6rem 2rem 1rem;
		min-height: vh(100 * 407.919/681.384);
		@media (min-width: $md) {
			padding: 2rem 6rem 2rem 2rem;
		}
		@media (min-width: $lg) {
			padding: 2rem 6rem 2rem 4rem;
		}
	}
	.people {
		align-self: flex-end;
		width: 50%;
		display: flex;
		img { width: 100%; }
		transform: rotateY(180deg);
		margin-top: -25%;
		@media (min-width: $md) {
			transform: rotateY(0);
			align-self: flex-start;
			margin-top: -45%;
		}
	}
}
.ask-a-question {
	display: flex;
	margin-top: -20%;
	margin-bottom: 1rem;
	@media (min-width: $md) {
		flex-grow: 1;
		max-width: 50%;
		margin-top: 0;
	}
	flex-direction: column;
	.ask-a-question-blob {
		text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		background: url('../assets/images/blobs/ask-a-question-blob.svg') center left no-repeat;
		background-size: cover;
		min-height: vh(100 * 407.919/739.945);
		padding: 1rem 1rem 1rem 2rem;
		@media (min-width: $md) { padding: 2rem 2rem 2rem 6rem; }
		@media (min-width: $lg) { padding: 2rem 4rem 2rem 6rem; }
	}
	.girl {
		align-self: flex-start;
		width: 50%;
		display: flex;
		img { width: 100%; }
		transform: rotateY(180deg);
		margin-bottom: -25%;
		@media (min-width: $md) {
			transform: rotateY(0);
			align-self: flex-end;
			margin-bottom: -25%;
		}
	}
}
.coins {
	width: 100%;
	@media (min-width: $md) {
		flex-grow: 1;
		margin: 0 auto 1rem;
	}
	display: flex;
	margin-bottom: 1rem;
	flex-direction: column;

	.coins-blob {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		text-align: right;
		background: url('../assets/images/blobs/coins-blob.svg') center no-repeat;
		background-size: cover;
		min-height: vh(100 * 450.107/862.736);
		padding: 6rem 1rem;
		@media (min-width: $md) { padding: 1rem 2rem; }
		@media (min-width: $lg) { padding: 1rem 4rem; }
	}
	.coin {
		align-self: flex-end;
		margin-right: 4rem;
		width: 50%;
		display: flex;
		img { width: 100%; }
		margin-bottom: -15%;
		z-index: 1;
		@media (min-width: $md) { width: 30%; }
	}
}
</style>
