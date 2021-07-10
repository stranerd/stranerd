<template>
	<div class="py-md-3 d-flex flex-column">
		<PageLoading v-if="loading" />
		<div class="mb-2 d-flex flex-row" style="justify-content:center;align-items:center;">
			<div>
				<button :class="selectedTab == 'questions' ? 'btn btn btn-lg btn-custom px-1' : 'btn btn btn-lg btn-custom-outlined-white px-1'" @click="selectedTab = 'questions'">
					Questions
				</button>
			</div>
			<div>
				<button :class="selectedTab == 'answers' ? 'btn btn btn-lg btn-custom px-1' : 'btn btn btn-lg btn-custom-outlined-white px-1'" @click="selectedTab = 'answers'">
					Answers
				</button>
			</div>
			<div>
				<button :class="selectedTab == 'reviews' ? 'btn btn btn-lg btn-custom px-1' : 'btn btn btn-lg btn-custom-outlined-white px-1'" @click="selectedTab = 'reviews'">
					Reviews
				</button>
			</div>
		</div>
		<template v-if="true">
			<!-- <UserHeadCard :key="user.hash" :user="user" /> -->
			<!-- <DisplayError v-if="error" :error="error" /> -->
			<div v-if="selectedTab == 'questions'">
				<UserQuestionList />
			</div>
			<div v-if="selectedTab == 'answers'">
				<UserAnswerList />
			</div>
			<div v-if="selectedTab == 'reviews'">
				<UserReviewList />
			</div>
		</template>
		<div v-else class="page-content">
			<DisplayError error="No such user exists!" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useUser } from '@app/hooks/users/user'
// import UserHeadCard from '@app/components/users/user/UserHeadCard.vue'
import UserQuestionList from '@app/components/questions/questions/UserQuestionsList.vue'
import UserAnswerList from '@app/components/questions/answers/UserAnswersList.vue'
import UserReviewList from '@app/components/users/reviews/ReviewList.vue'
export default defineComponent({
	name: 'UserPage',
	components: { UserQuestionList, UserAnswerList, UserReviewList },
	layout: 'profile',
	middleware: [
		({ redirect, route }) => {
			const { userId } = route.params
			const { isLoggedIn, id } = useAuth()
			if (isLoggedIn.value && id.value === userId) redirect('/account')
		}
	],
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	},
	 data () {
		return {
			selectedTab: 'questions'
		}
	}
})
</script>
<style lang="scss" scoped>

	.btn-custom-outlined-white {
	 background-color: #fff;
		border-radius: 6px;
		border: 1px solid $color-line;
		font-size: 15px;
		color: $color-text-sub;
		width: 100%;
		font-weight: bold;
	}
	.btn-custom {
		background-color: $color-btn;
		color: #fff;
		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}
</style>
