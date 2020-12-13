<template>
	<MyAnswersList />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import MyAnswersList from '@app/components/questions/answers/MyAnswersList.vue'
export default defineComponent({
	name: 'AccountAnswersPage',
	components: { MyAnswersList },
	layout: 'account'
})
</script>
