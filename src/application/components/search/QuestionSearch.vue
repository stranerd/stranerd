<template>
	<Search collection="questions" :transform-results="transformResults">
		<template #item="{ item }">
			<NuxtLink :to="`/questions/${item.model.id}`">
				<h5 class="mb-0 text-truncate editor-body" v-html="item.model.body" />
			</NuxtLink>
		</template>
	</Search>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { QuestionTransformer } from '@modules/questions/data/transformers/question'
import { QuestionFromModel } from '@modules/questions/data/models/question'
import Search from '@app/components/search/Search.vue'
export default defineComponent({
	name: 'QuestionSearch',
	components: { Search },
	setup () {
		return {
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
