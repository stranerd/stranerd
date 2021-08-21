<template>
	<div class="d-flex flex-column col-lg-10 offset-lg-1 px-1 py-7-5">
		<div class="section">
			<div>
				<img src="@app/assets/images/homepage/ask-question.svg">
			</div>
			<div class="px-md-3 mt-3 mt-md-0">
				<Heading variant="1">
					Ask A Question
				</Heading>
				<div class="py-2 d-flex flex-column gap-0-5">
					<span>- Ask questions on various subjects to clear your doubts</span>
					<span>- Go through all available answers from smart students</span>
					<span>- Choose your best answers and ask another question</span>
				</div>
				<NuxtLink class="btn btn-md btn-custom py-1" to="/questions/create">
					Ask A Question
				</NuxtLink>
			</div>
		</div>
		<div class="section flex-md-row-reverse">
			<div>
				<img src="@app/assets/images/homepage/answer-question.svg">
			</div>
			<div>
				<Heading variant="1">
					Answer A Question
				</Heading>
				<div class="py-2 d-flex flex-column gap-0-5">
					<span>- Answer questions in subjects you are very good at</span>
					<span>- Get rewarded if your answer is chosen as one of the best answers</span>
				</div>
				<NuxtLink class="btn btn-md btn-custom py-1" to="/dashboard">
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
				<div class="py-2 d-flex flex-column gap-0-5">
					<span>- Get in-depth answers to homework questions</span>
					<span>- Request sessions to help out with homework</span>
					<span>- Collaborate to solve problems and earn rewards</span>
				</div>
				<NuxtLink class="btn btn-md btn-custom py-1" to="/nerds/">
					Meet Top Nerds
				</NuxtLink>
			</div>
		</div>
		<div class="section flex-md-row-reverse">
			<div>
				<img v-if="isNigerian" src="@app/assets/images/homepage/buy-coins-ng.svg">
				<img v-else src="@app/assets/images/homepage/buy-coins.svg">
			</div>
			<div>
				<Heading variant="1">
					Coin System
				</Heading>
				<div class="py-2 d-flex flex-column gap-0-5">
					<span>- Buy or gain affordable coins to interact on the site</span>
					<span>- Bronze Coins are used to Ask Questions while</span>
					<span>- Gold Coins are used for Booking Sessions with Nerds</span>
				</div>
				<NuxtLink class="btn btn-md btn-custom py-1" to="/account/e-wallet">
					Buy Coins
				</NuxtLink>
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
			set: () => {
			}
		})
		return { isNigerian }
	}
})
</script>

<style lang="scss" scoped>
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

	.section {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		@media (min-width: $md) {
			flex-direction: row;
		}

		& + & {
			margin-top: 10rem;
		}

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
		}

		& > *:last-child {
			margin-top: 3rem;
			@media (min-width: $md) {
				padding: 0 3rem;
				margin-top: 0;
				text-align: left;
			}
		}
	}

</style>
