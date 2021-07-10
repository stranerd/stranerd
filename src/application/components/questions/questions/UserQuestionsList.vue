<template>
	<div>
		<div class="mb-1 d-flex flex-row" style="justify-content: center; align-items: center;">
			<div style="margin-right: 4px;">
				<button class="btn btn btn-lg btn-custom-outlined ">
					Unanswered <img src="@app/assets/images/icons/down-arrow.svg" style="margin-left: 3px;" alt="">
				</button>
			</div>
			<div>
				<button class="btn btn btn-lg btn-custom-outlined ">
					Subject <img src="@app/assets/images/icons/down-arrow.svg" style="margin-left: 3px;" alt="">
				</button>
			</div>
		</div>
		<div class="mb-1">
			<QuestionCard />
		</div>
		<div class="mb-1">
			<QuestionCard />
		</div>
		<div class="mb-1">
			<QuestionCard />
		</div>
		<div class="mb-1">
			<QuestionCard />
		</div>
		<div class="mb-1">
			<QuestionCard />
		</div>
		<div v-if="hasMore" class="text-center py-0-5 text-18">
			<a class="fw-bold" @click.prevent="fetchOlderQuestions">LOAD MORE</a>
		</div>
		<!-- <DisplayWarning v-if="!loading && !error && questions.length === 0" message="This user has not asked any questions yet." /> -->
		<!-- <DisplayError :error="error" /> -->
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/UserQuestionsListCard.vue'
import { useUserQuestionList } from '@app/hooks/users/user/questions'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'UserQuestionsList',
	components: { QuestionCard },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { questions, error, loading, hasMore, fetchOlderQuestions } = useUserQuestionList(props.userId)
		return {
			id,
			questions, error, loading, hasMore,
			fetchOlderQuestions
		}
	}
})
</script>
<style lang="scss" scoped>
	.btn-custom-outlined {
		background-color: $color-tags;
		border-radius: 6px;
		border: 1px solid $color-line;
		font-size: 15px;
		color: $color-text-sub;
		width: 100%;
		font-weight: bold;
	}
</style>
