<template>
	<section>
		<div>
			<div class="d-flex flex-column justify-content-between align-items-center w-100 p-1">
				<h1>Find Top Nerds to have One-On-One Chat Sessions with, for help with your homework and study problems.</h1>
				<div class="d-flex search-container">
					<select type="search">
						<option>
							Very Good in what subject
						</option>
						<option v-for="key in ['Physics', 'Math', 'Chemistry']" :key="key" :value="key">
							{{ key }}
						</option>
					</select>
					<button class="sidebar-btn btn" @click="openQuestionModal">
						<span>Search</span>
					</button>
				</div>
			</div>

			<div v-for="n in 10" :key="n" class="d-flex flex-column nerd-body">
				<div class="nerd-head ml-1 d-flex align-items-center justify-content-between">
					<div class="left d-flex align-items-center">
						<Avatar :src="user.avatar" :size="94" />
						<div class="dot" />
						<div class="d-flex align-items-start flex-column">
							<span class="name">Timmy Neutron</span>
							<span class="subject">Einstein</span>
						</div>
					</div>
					<div class="left d-flex align-items-center">
						<button class="answer-btn ml-1 mr-2">
							Request A Session
						</button>
					</div>
				</div>

				<div class="nerd-card-body-1 ml-1 d-flex align-items-center justify-content-between">
					<div class="d-flex align-items-center">
						<ShowRatings :rating="5" class="mr-3" />
						<span class="mr-4">244 Questions Answered</span>
						<span>36 Sessions Hosted</span>
					</div>
				</div>

				<div class="nerd-card-body-1 mt-1-5 ml-1 d-flex align-items-center justify-content-between">
					<div class="d-flex align-items-center">
						<span class="main-text mr-3">Strongest In</span>
						<span class="sub-text">Physics</span>
					</div>
				</div>

				<div class="nerd-card-body-1  ml-1 d-flex align-items-center justify-content-between">
					<div class="d-flex align-items-start">
						<span class="main-text-1 mr-3">Routine Tags</span>
						<div class="d-flex align-items-cnter flex-wrap">
							<div class="tag mr-0-5">
								indices
							</div>
							<div class="tag mr-0-5">
								waves
							</div>
							<div class="tag mr-0-5">
								motion
							</div>

							<div class="tag mr-0-5">
								simple-harmonic-motion
							</div>
							<div class="tag mr-0-5">
								projectiles
							</div>
							<div class="tag mr-0-5">
								Algebra
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal, useCreateModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'DashboardPage',
	layout: 'dashboard',
	setup () {
		const { isLoggedIn, user } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { openQuestion } = useCreateModal()
		const { openMeetTutor } = useAccountModal()
		return {
			user,
			isLoggedIn, openMeetTutor,
			openQuestionModal: () => {
				if (!isLoggedIn.value) redirect()
				else openQuestion()
			}
		}
	}
})
</script>

<style lang="scss" scoped>
	.search-container {
		select {
			margin-top: 38px;
			color: $color-text-sub;
			width: 360px;
			height: 72px;
			box-sizing: border-box;
			border-radius: 12px;
			padding: 0 36px;
			border: none;
			background: url('@app/assets/images/icons/down-arrow.svg') right  #fff 0% 0% no-repeat padding-box;
			box-shadow: -5px 5px 15px #374b9926;
			appearance: none;
			-webkit-appearance: none;
		}

		button {
			border-radius: 12px;
			margin-top: 38px;
		}
	}

	.icons {
		width: 24px;
		margin-right: 8px;
	}

	.tag {
		border: 1.2px solid $color-line;
		background-color: $color-tags;
		border-radius: 50px;
		color: $color-text-main;
		padding: 1px 14px;
		width: fit-content;
		margin-top: 20px;
	}

	.nerd-card-body-1 {
		.mr-3 {
			margin-right: 17px;
		}

		.mr-4 {
			margin-right: 48px;
		}
		.main-text{
			font-size: 16px;
			min-width: 98px;
		}
		.main-text-1{
			font-size: 16px;
			min-width: 98px;
			margin-top: 20px;
		}
		.sub-text{
			font-size: 18px;
			color: $color-main;
			font-weight: normal;
			margin-left: 5px;
		}

		span {
			color: $color-text-sub;
			font-size: 18px;
			font-weight: 600;
		}
	}

	.nerd-head {
		.left {
			padding-top: 1rem;

			.dot {
				width: 24px;
				height: 24px;
				background-color: $color-green;
				border-radius: 50px;
				position: relative;
				top: 32px;
				right: 32px;
				border: 2px solid $color-white;
			}

			.name {
				color: $color-text-main;
				font-size: 24px;
				font-weight: 600;
			}

			.subject {
				color: $color-main;
				font-weight: 600;
				font-size: 18px;
			}
		}
	}

	h1 {
		color: $color-text-main;
		text-align: center;
		font-size: 24px;
		max-width: 650px;
		letter-spacing: 0;
		line-height: 32px;
		margin-top: 53px;
	}

	.nerd-body {
		background: $color-white;
		border: 1px solid $color-line;
		width: -webkit-fill-available;
		padding: 24px 48px;
		max-width: 1024px;
		margin: 36px auto;
		border-radius: 12px;
	}

	.ml-1 {
		margin-left: 1.4rem;
	}

	.ml-0-5 {
		margin-left: 12px;
	}
	.mr-0-5{
		margin-right: 12px;
	}

	.pr-1 {
		padding-right: 8px;
	}

	.mr-2 {
		margin-right: 16px;
	}

	.options {
		select {
			width: 156px;
			border: 1px solid $color-line;
			background: $color-tags;
			margin-right: 12px;
			padding: 11px;
		}
	}
</style>
