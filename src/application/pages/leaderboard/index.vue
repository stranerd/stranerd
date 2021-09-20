<template>
	<div>
		<div class="d-flex justify-content-between align-items-center">
			<Heading class="py-1 text-dark " variant="1">
				Leaderboard
			</Heading>

			<select class="form-select ">
				<option>
					Daily
				</option>
			</select>
		</div>

		<div class="d-flex flex-column align-items-center justify-content-center gap-1 gap-md-2">
			<div class="d-flex flex-column gap-0-5 w-100">
				<div class="d-flex table-custom-style  text-dark bg-line">
					<div class="col-3">
						<span>Position</span>
					</div>
					<div class="col-7">
						<span>Profile</span>
					</div>
					<div class="col-2 text-end">
						<span>Tutor Score</span>
					</div>
				</div>

				<div class="d-flex align-items-center bg-primary-dark text-white table-custom-style ">
					<div class="col-3">
						<span>124</span>
					</div>
					<div class="col-7">
						<span>
							<Avatar :size="30" :src="user.avatar" />
							Timmy Neutron
						</span>
					</div>
					<div class="col-2 text-end">
						<span>11</span>
					</div>
				</div>

				<div v-for="(n, index) in 10" :key="n" class="d-flex align-items-center table-data-style">
					<div class="col-3">
						<DynamicText>{{ index+1 }}</DynamicText>
					</div>
					<div class="col-7">
						<span>
							<Avatar :size="30" :src="user.avatar" />
							Marantha Wilson
						</span>
					</div>
					<div class="col-2 text-end">
						<DynamicText>{{ 500 - index }}</DynamicText>
					</div>
				</div>
			</div>

			<div class="text-center text-18">
				<a class="text-primary-dark py-2" @click.prevent="fetchOlderTransactions">LOAD MORE</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'

export default defineComponent({
	name: 'NotificationsPage',
	middleware: ['isAuthenticated'],
	setup () {
		useMeta(() => ({
			title: 'Leaderboard | Stranerd'
		}))
		const { user } = useAuth()
		return { user }
	},
	head: {}
})
</script>

<style lang="scss" scoped>
.form-select{
	max-width: 9.75rem;
	background-color: #F8F8FF;
	border: 0.5px solid #D7E2EC;
}
	.headertext {
		font-weight: bold;
		color: $color-dark;
		margin: 0;
	}

	.table-custom-style {
		border: 1px solid $color-primary;
		border-radius: 6px;
		font-weight: bold;
		font-size: 18px;
		padding: 1.188rem 2.281rem;
	}
		.table-data-style {
		border: 1px solid $color-line;
		border-radius: 6px;
		background: $color-tags;
		font-weight: 700;
		font-size: 15px;
		color: $color-dark;
		padding: 1.188rem 2.281rem;
	}
</style>
