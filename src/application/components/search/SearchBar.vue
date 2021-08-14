<template>
	<form class="gap-1 d-flex">
		<div />
		<QuestionSearch v-if="search === SEARCH_TYPES.Questions" :key="search" />
		<AnswerSearch v-else-if="search === SEARCH_TYPES.Answers" :key="search" />
		<UserSearch v-else-if="search === SEARCH_TYPES.Users" :key="search" />
		<select v-model="search" class="form-select form-select-sm ms-auto" type="search">
			<option v-for="key in searchTerms" :key="key" :value="key">
				<DynamicText>{{ key }}</DynamicText>
			</option>
		</select>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import UserSearch from '@app/components/search/UserSearch.vue'
import QuestionSearch from '@app/components/search/QuestionSearch.vue'
import AnswerSearch from '@app/components/search/AnswerSearch.vue'
enum SEARCH_TYPES {
	Users = 'Users',
	Questions = 'Questions',
	Answers = 'Answers'
}
export default defineComponent({
	name: 'SearchBar',
	components: { UserSearch, QuestionSearch, AnswerSearch },
	setup () {
		const search = ref(SEARCH_TYPES.Users)
		const searchTerms = Object.keys(SEARCH_TYPES)
		return { search, SEARCH_TYPES, searchTerms }
	}
})
</script>

<style lang="scss" scoped>
	form {
		flex-grow: 1;
		border: 1px solid $color-line;
		background-color: $color-tags;
		border-radius: 12px;
		font-size: 14px;
		color: $color-sub;

		select {
			width: auto;
			padding: 4px 32px 4px 21px;
			border-left: 1px solid $color-line;
			background-color: $color-tags;
			border-radius: 12px;
			color: $color-dark;
		}

		select:focus {
			box-shadow: none;

			option {
				background: $color-dark;
				color: $color-white;
			}
		}
	}
</style>
