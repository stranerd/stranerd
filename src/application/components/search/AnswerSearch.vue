<template>
	<Search collection="answers" :transform-results="transformResults">
		<template #item="{ item }">
			<NuxtLink :to="`/answers/${item.model.id}`">
				<h5 class="mb-0 text-truncate editor-body" v-html="item.model.body" />
			</NuxtLink>
		</template>
	</Search>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { AnswerTransformer } from '@modules/questions/data/transformers/answer'
import { AnswerFromModel } from '@modules/questions/data/models/answer'
import Search from '@app/components/search/Search.vue'
export default defineComponent({
	name: 'AnswerSearch',
	components: { Search },
	setup () {
		return {
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
