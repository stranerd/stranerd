<template>
	<div>
		<section class="d-flex text-center align-items-center flex-wrap">
			<h5 class="text-grey">
				Top Users
			</h5>
			<form class="form-inline ml-auto">
				<select v-model="option" class="form-control form-control-sm my-1">
					<option v-for="option in options" :key="option" :value="option">
						{{ option }}
					</option>
				</select>
			</form>
		</section>
		<div>
			<DailyUsers v-if="isDaily" />
			<WeeklyUsers v-if="isWeekly" />
			<MonthlyUsers v-if="isMonthly" />
			<QuarterlyUsers v-if="isQuarterly" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useTopUsers } from '@app/hooks/users/rankings'
import DailyUsers from '@app/components/users/rankings/DailyUsers.vue'
import WeeklyUsers from '@app/components/users/rankings/WeeklyUsers.vue'
import MonthlyUsers from '@app/components/users/rankings/MonthlyUsers.vue'
import QuarterlyUsers from '@app/components/users/rankings/QuarterlyUsers.vue'
export default defineComponent({
	name: 'TopUsers',
	components: {
		DailyUsers,
		WeeklyUsers,
		MonthlyUsers,
		QuarterlyUsers
	},
	setup () {
		const { options, option, isDaily, isWeekly, isMonthly, isQuarterly } = useTopUsers()
		return { options, option, isDaily, isWeekly, isMonthly, isQuarterly }
	}
})
</script>
