<template>
	<div v-if="user" class="d-flex flex-column gap-2-25">
		<div class="d-flex flex-column gap-1 ranking">
			<div class="d-flex flex-column gap-1 align-items-center text-blue">
				<Avatar :size="144" :src="user.avatar" />
				<h1 class="ranking-header">
					{{ user.fullName }}
				</h1>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
export default defineComponent({
	name: 'ProfileLeftSidebar',
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>

<style lang="scss" scoped>
	.tags {
		background: $color-white;
		border: 1px solid $color-line;
		padding: 36px;
	}

	.ranking {
		background: $color-white;
		border: 1px solid $color-line;
		padding: 36px;
	}

	.img-rank {
		width: 9rem;
	}

	.ranking-header {
		text-align: center;
		font-size: 24px;
		color: $color-dark;
	}

	.stat {
		width: 350px;
		font-size: 14px;
		font-weight: 600;
		color: $color-sub;
	}
</style>
