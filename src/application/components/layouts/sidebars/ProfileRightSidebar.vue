<template>
	<div v-if="user" class="d-flex flex-column gap-2-25">
		<ProfileHeadCard :user="user" class="balance d-none" />
		<div class="d-flex flex-column gap-1 ranking">
			<div class="d-flex flex-column gap-1 align-items-center text-blue">
				<h1 class="ranking-header">
					{{ user.firstName }}'s Badge
				</h1>
				<img :src="user.rank.image" alt="" class="img-rank">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
export default defineComponent({
	name: 'ProfileRightSidebar',
	components: { ProfileHeadCard },
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>

<style lang="scss" scoped>
	.balance {
		background: $color-tags;
		border: 1px solid $color-line;
		width: -webkit-fill-available;
	}

	.ranking {
		background: $color-tags;
		border: 1px solid $color-line;
		padding: 36px;
	}

	.img-rank {
		width: 7.5rem;
	}

	.ranking-header {
		text-align: center;
		font-size: 24px;
		color: $color-dark;
	}
</style>
