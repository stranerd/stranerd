<template>
	<div class="px-1 col-12 content_wrapper">
		<div class="d-flex flex-column col-lg-10 offset-lg-1">
			<div class="section">
				<div>
					<img src="@app/assets/images/homepage/ask-question.svg">
				</div>
				<div class="px-md-3 mt-3 mt-md-0">
					<Heading variant="1">
						Ask A Question
					</Heading>
					<div class="py-2">
						Ask questions on various subjects and make sure your question is very detailed. You get answers from other Nerds and go through all available answers to choose which answer is the best.
					</div>
					<NuxtLink to="/questions/create" class="btn btn-md btn-custom py-1">
						Ask A Question
					</NuxtLink>
				</div>
			</div>
			<div class="section flex-lg-row-reverse">
				<div>
					<img src="@app/assets/images/homepage/answer-question.svg">
				</div>
				<div>
					<Heading variant="1">
						Answer A Question
					</Heading>
					<div class="py-2">
						Answer questions on subjects that you are very good at. Make sure your answer is correct and detailed. You get a minimum reward for answering and get the full reward if your answer is chosen as the best.
					</div>
					<NuxtLink to="/questions/" class="btn btn-md btn-custom py-1">
						Answer A Question
					</NuxtLink>
				</div>
			</div>
			<div class="section">
				<div>
					<img src="@app/assets/images/homepage/meet-top-nerd.svg">
				</div>
				<div>
					<Heading variant="1">
						Meet Top Nerds
					</Heading>
					<div class="py-2">
						Get a more in-depth experience to better help with problems. Request or Accept a Session to chat with others; in order to collaborate better, get help for your problems and solve the problems of others.
					</div>
					<NuxtLink to="/nerds/" class="btn btn-md btn-custom py-1">
						Meet Top Nerds
					</NuxtLink>
				</div>
			</div>
			<div class="section flex-lg-row-reverse">
				<div>
					<img v-if="isNigerian" src="@app/assets/images/homepage/buy-coins-ng.svg">
					<img v-else src="@app/assets/images/homepage/buy-coins.svg">
				</div>
				<div>
					<Heading variant="1">
						Coin System
					</Heading>
					<div class="py-2">
						Buy affordable coins to be used for your interactions. You use Bronze coins as reward to get answers to your questions and Gold coins to request chat sessions with Top Nerds for an in-depth learning experience.
					</div>
					<NuxtLink to="/account/e-wallet" class="btn btn-md btn-custom py-1">
						Buy Coins
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useAuth } from '@app/hooks/auth/auth'
import { computed, defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'HowItWorks',
	setup () {
		const isNigerian = computed({
			get: () => useAuth().location.value?.countryCode === 'NG',
			set: () => {}
		})
		return { isNigerian }
	}
})
</script>

<style scoped lang="scss">
	h1 {
		color: $color-primary-dark;
	}

	a.btn-custom {
		display: inline-block;
		background-color: $color-primary;
		color: $color-white;
		border: 2px solid $color-primary;
		border-radius: 6px;
	}

	.content_wrapper {
		margin-bottom: 40px;
		margin-top: 100px;
	}

	.section {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		@media (min-width: $lg) { flex-direction: row; }

		& + & { margin-top: 10rem; }

		& > * {
			text-align: center;
			width: 100%;
			@media (min-width: $lg) {
				width: 50%;
			}
		}

		& > *:first-child {
			img {
				width: 85%;
			}
			@media (min-width: $md) and (max-width: $lg) { margin-bottom: 110px; }
		}

		& > *:last-child {
			margin-top: 3rem;
			@media (min-width: $md) {
				padding: 0 3rem;
				margin-top: 0;
			}
			@media (min-width: $lg) {
				text-align: left;
			}
		}
	}

</style>
