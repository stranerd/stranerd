<template>
	<div class="question">
		<div class="question-body px-5 py-2">
			<h1>Ask Your Question</h1>

			<div class="question-casing">
				<span class="title">
					Body
				</span>
				<span class="sub-title">
					Write your question here and make sure it is explained in full detail
				</span>
				<textarea placeholder="Example: Derive ax2 + bx + c = 0" />
			</div>

			<div class="question-casing">
				<span class="title">
					Subject
				</span>
				<span class="sub-title">
					Select the subject of the question you asked
				</span>
				<select type="search">
					<option selected>
						List of Subjects
					</option>
					<option v-for="key in ['English', 'Math']" :key="key" :value="key">
						{{ key }}
					</option>
				</select>
			</div>

			<div class="question-casing">
				<span class="title">
					Tags
				</span>
				<span class="sub-title">
					Add up to 3 tags to describe what your question is about
				</span>
				<input placeholder="Example: Algebra, quadratic-equation, linear-equation"></input>
			</div>

			<div class="question-casing">
				<span class="title">
					Reward
				</span>
				<span class="sub-title">
					Choose how much bronze coins to give the Nerd with the best answer. Consider the questions’ difficulty
				</span>
				<select type="search">
					<option selected>
						Bronze Coins Quotas
					</option>
					<option v-for="key in ['5', '10']" :key="key" :value="key">
						{{ key }}
					</option>
				</select>
			</div>

			<button class="sidebar-btn btn mt-2">
				<span>Post Question</span>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Ranking',
	layout: 'justified'
})
</script>

<style lang="scss" scoped>
	.question {
		padding-top: 60px;
		margin-right: 1.4rem;

		.question-body {
			width: 960px;
			background: $color-tags;
			border: 1px solid $color-line;

			h1 {
				color: $color-dark;
				font-size: 36px;
			}

			.question-casing {
				display: flex;
				flex-direction: column;
				margin-top: 1.3rem;

				.title {
					color: $color-dark;
					font-size: 1.5rem;
					font-weight: 600;
				}

				.sub-title {
					color: $color-dark;
					font-size: 1.125rem;
					font-weight: 500;
				}

				textarea, select, input {
					box-sizing: border-box;
					background: $color-white;
					border: 1px solid $color-line;
					border-radius: 6px;
					padding: 16px 24px;
					margin-top: 6px;

					&::placeholder {
						color: $color-dark;
					}
				}

				textarea {
					height: 6.48rem;
				}
			}
		}
	}
</style>
