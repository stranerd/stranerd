<template>
	<TagQuestionsList :tag-id="tagId" />
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import TagQuestionsList from '@app/components/questions/questions/TagQuestionsList.vue'
export default defineComponent({
	name: 'TagPage',
	components: { TagQuestionsList },
	layout: 'justified',
	setup () {
		const { tagId } = useRoute().value.params
		return { tagId }
	}
})
</script>
