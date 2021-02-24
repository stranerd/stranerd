<template>
	<UserQuestionsList class="page-content" :user-id="userId" />
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import UserQuestionsList from '@app/components/questions/questions/UserQuestionsList.vue'
export default defineComponent({
	name: 'UserQuestionsPage',
	components: { UserQuestionsList },
	layout: 'user',
	setup () {
		const { userId } = useRoute().value.params
		return { userId }
	}
})
</script>
