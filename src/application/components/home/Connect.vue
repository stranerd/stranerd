<template>
	<div class="bg-primary px-1  text-white col-span-12 grid grid-cols-12 py-16">
		<div class="col-span-12 lg:col-start-3 lg:col-end-11 grid grid-cols-2">
			<div class="col-span-2 md:col-span-1 flex flex-row justify-center items-center">
				<img src="@app/assets/images/homepage/stress_free.png" class="md:w-9/12 w-8/12">
			</div>
			<div class="col-span-2 md:col-span-1 px-3 py-8 md:py-0  flex flex-col justify-center md:items-start items-center">
				<div class="text-white w-5/6 md:text-xl text-sm md:text-left text-center">
					Do away with academic stress because you can share all your problems here!
				</div>
				<div class="mt-9">
					<NuxtLink class=" md:px-8 md:py-4 py-3 px-4 bg-white text-primary font-bold md:text-lg text-sm rounded-md" to="/auth/signup">
						Sign Up
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
	name: 'Connect'
})
</script>

<style lang="scss" scoped>

	a.btn-custom {
		display: inline-block;
		background-color: $color-white;
		color: $color-primary-dark;
		border: 2px solid $color-white;
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
