<template>
	<Search collection="questions" :transform-results="transformResults">
		<template #item="{ item }">
			<NuxtLink :to="`/questions/${item.model.id}`">
				<p class="mb-0 text-truncate lead">
					{{ extractTextFromHTML(item.model.body) }}
				</p>
				<div class="d-flex gap-0-5 align-items-center">
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
import { QuestionTransformer } from '@modules/questions/data/transformers/question'
import { QuestionFromModel } from '@modules/questions/data/models/question'
import Search from '@app/components/search/Search.vue'
import { extractTextFromHTML } from '@utils/commons'
export default defineComponent({
	name: 'QuestionSearch',
	components: { Search },
	setup () {
		return {
			extractTextFromHTML,
			transformResults: (items: any[]) => items
				.map((item) => {
					item.model = (new QuestionTransformer()).fromJSON({
						id: item.objectID,
						...item.question
					} as QuestionFromModel)
					return item
				})
		}
	}
})
</script>
