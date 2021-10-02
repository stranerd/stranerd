<template>
	<section>
		<div class="d-flex w-100 justify-content-center">
			<div class="coin_tab active">
				Find a tutor
			</div>
			<div class="coin_tab ">
				Explore tutors
			</div>
		</div>

		<p class="text-center mt-3-5 text-18">
			Fill the form below to get requests from tutors who can help.
		</p>

		<div class="d-flex flex-column box px-3 py-4-5 mt-1-5">
			<span>
				<span class="formLabel text-18 fw-bold text-dark">Message</span>
			</span>
			<textarea
				id="message"
				class="form-control"
				placeholder="Explain your problem and add any necessary files that may help below."
				rows="4"
			/>
		</div>
		<!-- <TutorsList /> -->
	</section>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
// import TutorsList from '@app/components/users/tutors/TutorsList.vue'

export default defineComponent({
	name: 'NerdsPage',
	// components: { TutorsList },
	layout: 'dashboard',
	setup () {
		useMeta(() => ({
			title: 'Meet a Nerd | Stranerd'
		}))
		return {}
	},
	head: {}
})
</script>

<style lang="scss" scoped>
	.box{
		border: 0.502px solid $color-line;
	}
	.coin_tab {
		border: 1px solid $color-line;
		width: 50%;
		max-width: 17.625rem;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.9rem;
		border-radius: 6px;
		font-weight: 700;
		font-size: 1.125rem;

		&:hover {
			background: $color-primary;
			color: $color-white;
		}
	}

	.active {
		background: $color-primary;
		color: $color-white;
	}

</style>
