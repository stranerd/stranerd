<template>
	<div class="px-1 d-flex">
		<div class="p-1 d-none d-lg-block content ml mr-4 w-25">
			<AccountSidebar />
		</div>
		<div class="content flex-grow-1">
			<MyAnswersList />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AccountSidebar from '@app/components/layouts/AccountSidebar.vue'
import MyAnswersList from '@app/components/questions/answers/MyAnswersList.vue'
export default defineComponent({
	name: 'AccountAnswersPage',
	components: { AccountSidebar, MyAnswersList },
	layout: 'account'
})
</script>

<style lang="scss" scoped>
.content {
	background: $color-white;
	margin: 0.5rem 0;
	padding: 0.5rem;
	border-radius: 0.5rem;
	box-shadow: 0 0 12px rgba($color-black, 0.1);
	@media (min-width: $md) {
		margin: 1rem 0;
		padding: 1.5rem;
		border-radius: 1rem;
	}
	@media (min-width: $lg) {
		margin: 2rem 0;
		padding: 2.0rem;
		border-radius: 1.5rem;
	}
}
</style>
