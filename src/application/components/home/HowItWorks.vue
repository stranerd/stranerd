<template>
	<div class="works gap-2 gap-md-2-5 gap-lg-4">
		<h1>How it works</h1>
		<div class="d-flex flex-column gap-2 gap-md-3 gap-lg-4">
			<div class="feature gap-1 gap-md-2">
				<h2>Ask A Question</h2>
				<div class="list">
					<div class="d-flex flex-row gap-1 align-items-center">
						<i class="fa fa-circle main-background-text" />
						<span>Ask questions on various subjects</span>
					</div>
					<div class="d-flex flex-row gap-1 align-items-center">
						<i class="fa fa-circle main-background-text" />
						<span>Go through all available answers</span>
					</div>
					<div class="d-flex flex-row gap-1 align-items-center">
						<i class="fa fa-circle main-background-text" />
						<span>Choose your best answer (Leave a tip!)</span>
					</div>
				</div>
				<div class="images">
					<span>
						<img src="@app/assets/images/homepage/ask_question.png">
					</span>
					<span>
						<img src="@app/assets/images/homepage/answers.png">
					</span>
				</div>
			</div>
			<div class="feature gap-1 gap-md-2">
				<h2>Be A Nerd</h2>
				<div class="list">
					<div class="d-flex flex-row gap-1 align-items-center">
						<i class="fa fa-circle main-background-text" />
						<span>Help others in subject you're adept at</span>
					</div>
					<div class="d-flex flex-row gap-1 align-items-center">
						<i class="fa fa-circle main-background-text" />
						<span>Collaborate and learn with other Nerds</span>
					</div>
					<div class="d-flex flex-row gap-1 align-items-center">
						<i class="fa fa-circle main-background-text" />
						<span>Share relevant files to aid learning</span>
					</div>
				</div>
				<div class="images">
					<span>
						<img src="@app/assets/images/homepage/top_nerd.png">
					</span>
					<span>
						<img src="@app/assets/images/homepage/chat_view.png">
					</span>
				</div>
			</div>
			<div class="feature gap-1 gap-md-2">
				<h2>Coin System</h2>
				<div class="list">
					<div class="d-flex flex-row gap-1 align-items-center">
						<i class="fa fa-circle main-background-text" />
						<span>Buy affordable coins to interact</span>
					</div>
					<div class="d-flex flex-row gap-1 align-items-center">
						<i class="fa fa-circle main-background-text" />
						<span>Bronze Coins are used to Ask Questions</span>
					</div>
					<div class="d-flex flex-row gap-1 align-items-center">
						<i class="fa fa-circle main-background-text" />
						<span>Gold Coins are used for Tipping</span>
					</div>
				</div>
				<div class="images">
					<span>
						<img src="@app/assets/images/homepage/buy_coin_new.svg">
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'HowItWorks'
})
</script>

<style scoped lang="scss">
	.works {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		@media (min-width: $lg) { width: 68%; }

		.feature {
			display: flex;
			flex-direction: column;
			align-items: center;
			border: 1px solid #a4b1a8;
			border-radius: 13px;
			box-shadow: 0 4px 14px #0000;
			background: #fbfbfb 0% 0% no-repeat padding-box;
			color: $color-sub;
			padding: 1rem;
			@media (min-width: $md) { padding: 2rem; }
			@media (min-width: $lg) { padding: 3rem; }
			&:hover { box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2); }

			& > h2 {
				color: $main-background-color;
				margin: 0;
				font-weight: bold;
				font-size: 20px;
				@media (min-width: $md) { font-size: 35px; }
				@media (min-width: $lg) { font-size: 40px; }
			}

			.list {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 80%;
				margin: 0 auto;

				i {
					font-size: 0.5em;
				}

				span {
					font-size: 16px;
					@media (min-width: $md) { font-size: 25px; }
					@media (min-width: $lg) { font-size: 26px; }
				}
			}

			.images {
				width: 100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				& > * { flex-grow: 1; }
				img { width: 100%; }
				@media (min-width: $lg) {
					flex-direction: row;
					align-items: center;
				}
			}
		}
	}

	.main-background-text {
		color: $main-background-color;
	}

	h1 {
		text-align: center;
		margin-bottom: 0;
		font-size: 24px;
		@media (min-width: $md) { font-size: 42px; }
		@media (min-width: $lg) { font-size: 52px; }
	}
</style>
