<template>
	<UserAnswersList class="page-content" :user-id="userId" />
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import UserAnswersList from '@app/components/questions/answers/UserAnswersList.vue'
export default defineComponent({
	name: 'UserAnswersPage',
	components: { UserAnswersList },
	layout: 'user',
	setup () {
		const { userId } = useRoute().value.params
		return { userId }
	}
})
</script>
