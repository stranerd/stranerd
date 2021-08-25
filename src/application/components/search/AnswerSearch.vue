<template>
	<Search :transform-results="transformResults" collection="answers">
		<template #item="{ item }">
			<NuxtLink :to="`/questions/${item.model.questionId}#${item.model.id}`">
				<DynamicText class="lead">
					{{ extractTextFromHTML(item.model.body) }}
				</DynamicText>
				<div class="d-flex gap-0-5 align-items-center">
					<Avatar :size="30" :src="item.model.avatar" />
					<DynamicText :truncate="true">
						{{ item.model.userName }}
					</DynamicText>
				</div>
			</NuxtLink>
		</template>
	</Search>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { AnswerTransformer } from '@modules/questions/data/transformers/answer'
import { AnswerFromModel } from '@modules/questions/data/models/answer'
import Search from '@app/components/search/Search.vue'
import { extractTextFromHTML } from '@utils/commons'

export default defineComponent({
	name: 'AnswerSearch',
	components: { Search },
	setup () {
		return {
			extractTextFromHTML,
			transformResults: (items: any[]) => items
				.map((item) => {
					item.model = (new AnswerTransformer()).fromJSON({
						id: item.objectID,
						...item.answer
					} as AnswerFromModel)
					return item
				})
		}
	}
})
</script>
