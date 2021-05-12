<template>
	<Search collection="answers" :transform-results="transformResults">
		<template #item="{ item }">
			<NuxtLink :to="`/questions/${item.model.questionId}#${item.model.id}`">
				<p class="mb-0 text-truncate lead">
					{{ extractTextFromHTML(item.model.body) }}
				</p>
				<div class="d-flex gap-1 align-items-center">
					<Avatar :src="item.model.avatar" :size="30" />
					<span class="text-truncate">
						{{ item.model.userName }}
					</span>
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
