<template>
	<MyQuestionsList />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import MyQuestionsList from '@app/components/questions/questions/MyQuestionsList.vue'
export default defineComponent({
	name: 'AccountQuestionsPage',
	components: { MyQuestionsList },
	layout: 'account'
})
</script>
