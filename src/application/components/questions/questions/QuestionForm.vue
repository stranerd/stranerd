<template>
	<form @submit.prevent="submit">
		<div class="form-group">
			<span class="title">Body</span>
			<span class="sub-title">
				Write your question here and make sure it is explained in full detail
			</span>
			<QuestionEditor :model.sync="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')" />
		</div>

		<div class="form-group">
			<span class="title">Subject</span>
			<span class="sub-title">
				Select the subject of the question you asked
			</span>
			<SelectSubject class="form-select" :show-all="false" :subject-id.sync="factory.subjectId" />
			<span v-if="factory.errors.subjectId" class="text-danger small">{{ factory.errors.subjectId }}</span>
		</div>

		<div class="form-group">
			<span class="title">Tags</span>
			<span class="sub-title">
				Add up to 3 tags to describe what your question is about
			</span>
			<input
				v-model="tag"
				type="text"
				class="form-control"
				placeholder="Example: Algebra, quadratic-equation, linear-equation"
			>
			<p class="my-0-5 d-flex gap-0-5 flex-wrap">
				<span
					v-for="tag in factory.tags"
					:key="tag"
					class="p-0-5 d-flex gap-0-5 cursor-pointer btn-dark rounded-3"
					@click="removeTag(tag)"
				>
					<span class="text-white">
						<DynamicText :text="tag" />
					</span>
					<span class="text-danger">&times;</span>
				</span>
			</p>
			<span v-if="factory.errors.tags" class="text-danger small">{{ factory.errors.tags }}</span>
		</div>

		<div class="form-group">
			<span class="title">Reward</span>
			<span class="sub-title">
				Choose how much bronze coins to give the Nerd with the best answer. Consider the questions’ difficulty
			</span>
			<select v-model="factory.coins" class="form-select">
				<option disabled value="0">
					Bronze Coins Quotas
				</option>
				<option v-for="coin in coins" :key="coin" :value="coin">
					{{ coin }}
				</option>
			</select>
			<span v-if="factory.errors.coins" class="text-danger small mt-0-5">{{ factory.errors.coins }}</span>
			<div class="text-end mt-0-5">
				<span>Out of coins?&nbsp;</span>
				<a class="fw-bold text-decoration-underline" @click="openBuyCoins">Buy more coins</a>
			</div>
		</div>

		<button class="btn btn-primary px-2 py-1 mt-2" type="submit" :disabled="loading || !factory.valid">
			<slot name="buttonText">
				Submit
			</slot>
		</button>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionFactory } from '@modules/questions'
import QuestionEditor from '@app/components/core/editor/QuestionEditor.vue'
import { useAccountModal } from '@app/hooks/core/modals'
import { useTags } from '@app/hooks/core/forms'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
export default defineComponent({
	name: 'QuestionForm',
	components: { QuestionEditor, SelectSubject },
	props: {
		factory: {
			type: Object as PropType<QuestionFactory>,
			required: true
		},
		coins: {
			type: Array,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { openBuyCoins } = useAccountModal()
		const { tag, removeTag } = useTags(
			(tag: string) => props.factory.addTag(tag),
			(tag: string) => props.factory.removeTag(tag)
		)
		return { openBuyCoins, tag, removeTag }
	}
})
</script>

<style lang="scss" scoped>
	.form-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 1.5rem;

		.title {
			color: $color-dark;
			font-size: 1.5rem;
			font-weight: 600;
			margin-bottom: 8px;
		}

		.sub-title {
			color: $color-dark;
			font-size: 1.125rem;
			font-weight: 500;
			margin-bottom: 8px;
		}

		input {
			box-sizing: border-box;
			background: $color-white;
			border: 1px solid $color-line;
			border-radius: 6px;
			padding: 16px 24px;

			&::placeholder {
				color: $color-dark;
			}
		}

		select {
			min-height: 3rem;
		}
	}
</style>
