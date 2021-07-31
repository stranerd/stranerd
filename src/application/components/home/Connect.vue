<template>
	<div class="bg-primary px-1 py-5 text-white">
		<div class="d-flex flex-row flex-wrap justify-content-center inner-wrapper align-items-center col-lg-10 offset-lg-1">
			<div class="section">
				<div>
					<img src="@app/assets/images/homepage/stress_free.png">
				</div>
				<div>
					<div class="paragraph mb-1">
						Do away with academic stress because you can share all your problems here!
					</div>
					<NuxtLink to="/auth/signup" class="btn btn-custom btn-lg py-0-75 px-1-5">
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

<style scoped lang="scss">
	.paragraph {
		font-size: 16px;
		@media (min-width: $md) { font-size: 20px; }
		@media (min-width: $lg) { font-size: 20px; }
	}

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
		@media (min-width: $md) { flex-direction: row; }

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
