<template>
	<div class="d-flex flex-column">
		<nav role="navigation" class="d-flex justify-content-center align-items-center pb-1">
			<button :class="selectedTab == 'questions' ? 'px-md-2 px-1 pcustom link_active' : 'px-md-2 px-1 pcustom'" @click.prevent="selectedTab = 'questions'">
				Questions
			</button>
			<button :class="selectedTab == 'answers' ? 'px-md-2 px-1 pcustom link_active' : 'px-md-2 px-1 pcustom'" @click.prevent="selectedTab = 'answers'">
				Answers
			</button>
			<button :class="selectedTab == 'reviews' ? 'px-md-2 px-1 pcustom link_active' : 'px-md-2 px-1 pcustom'" @click.prevent="selectedTab = 'reviews'">
				Users
			</button>
		</nav>
		<template v-if="selectedTab == 'questions'">
			<QuestionsList />
		</template>
		<template v-else-if="selectedTab == 'answers'">
			<AnswersList />
		</template>
		<template v-else-if="selectedTab == 'reviews'">
			<UsersReportList />
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AnswersList from '@app/components/users/reports/answers/AnswersList.vue'
import QuestionsList from '@app/components/users/reports/questions/QuestionsList.vue'
import UsersReportList from '@app/components/users/reports/users/ReportsList.vue'
export default defineComponent({
	name: 'ReportAdminsPage',
	components: {
		QuestionsList,
		AnswersList,
		UsersReportList
	},
	layout: 'admin',
	data () {
		return {
			selectedTab: 'questions'
		}
	}
})
</script>
<style lang="scss" scoped>
	button {
		border: 1px solid $color-line;
		color: $color-sub;
		background: #fff;
	}

	.link_active {
		background: $color-primary;
		border: 1px solid $color-primary;
		color: $color-white;
	}

	.pcustom {
		padding-top: 8px;
		font-weight: bold;
		padding-bottom: 8px;
	}
</style>
