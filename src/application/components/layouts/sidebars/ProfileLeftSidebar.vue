<template>
	<div class="d-flex flex-column gap-2-25">
		<div class="d-flex flex-column gap-1 ranking">
			<div class="d-flex flex-column gap-1 align-items-center text-blue">
				<h1 class="ranking-header">
					Chinelo's Badge
				</h1>
				<img :src="user.rank.image" alt="" class="img-rank">
			</div>
		</div>

		<!-- <div class="d-flex flex-column gap-1 ranking">
			<div class="d-flex flex-column gap-1 align-items-center text-blue">
				<h1 class="ranking-header">
					Chinelo's Nerd Score
				</h1>
				<img :src="user.rank.image" alt="" class="img-rank">
			</div>
		</div> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'RightSidebar',
	setup () {
		const { id, user } = useAuth()
		return { id, user }
	}
})
</script>

<style lang="scss" scoped>
	.tags {
		background: $color-tags;
		border: 1px solid $color-line;
		padding: 36px;
	}

	.ranking {
		background: $color-tags;
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
