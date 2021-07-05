<template>
	<nav class="home-top-nav" role="navigation">
		<div class="d-flex justify-content-between align-items-center left-body">
			<Logo :secondary="true" class="nav-logo" />
		</div>
		<div class="d-flex justify-content-between align-items-center middle-body">
			<SearchBar />
		</div>
		<div class="d-flex right-body">
			<MessageLink />
			<NotificationBell :key="isLoggedIn" class="link" />

			<div v-if="isLoggedIn" class="d-flex justify-content-between align-items-center cursor-pointer " @click="show = !show">
				<Avatar :src="user.avatar" :size="48" />
				<span class="d-flex justify-content-between align-items-center">
					<span class="username">Timmy Neutron</span>
					<img src="@app/assets/images/icons/down-arrow.svg" alt="">
				</span>
			</div>
			<transition name="slide" appear>
				<div v-if="show" class="drop-menu">
					<span><img src="@app/assets/images/icons/user.svg" alt="">Profile</span>
					<span> <img src="@app/assets/images/icons/signout.svg" alt="">Log Out</span>
				</div>
			</transition>
		</div>
	</nav>
</template>

<script lang="ts">
import SearchBar from '@app/components/search/SearchBar.vue'
import NotificationBell from '@app/components/layouts/topNavigations/NotificationBell.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import MessageLink from './MessageLink.vue'
export default defineComponent({
	name: 'HomeTopNavigation',
	components: { SearchBar, NotificationBell, MessageLink },
	setup () {
		const { isLoggedIn, user } = useAuth()
		const show = ref(true)
		return { show, isLoggedIn, user }
	}
})
</script>

<style lang="scss" scoped>
.nav-logo{
	margin: 0px auto;
	margin-left: 32px;
	&:hover{
		transition: all 0.3s;
		transform: scale(1.2);
	}
}
.btn{
min-width: 135px;
min-height: 45px;
display: grid;
place-items: center;
}

.home-top-nav {
	display: flex;
	justify-content: space-between;
	color:$color-text-main;
	height: 86px;
	 width: 100vw;
	min-height: 60px;
	z-index: 10 !important;
	margin: 0;
	background: #fff 0 0 no-repeat padding-box;
    box-shadow: 0 5px 15px #17224d26;
	opacity: 1;

	button.navbar-toggler {
		border: none;
		outline: none;
		border-radius: 0;
		color: $color-tint-blue;
	}
}
.middle-body {
	    width: 54.5%;
	// padding: 1rem 2rem;

}
.left-body {
	    width: 21.5%;
	padding: 1rem 2rem;

}
.right-body{
	 width: 24%;
	 align-items: center;
	 justify-content: space-between;
	 padding: 0px 1.4rem 0px 1.2rem;
	max-width: 400px;
	.drop-menu{
		position: absolute;
		top: 96px;
		right: 24px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 172px;
		background-color: $color-white;
		background: #FFFFFF 0% 0% no-repeat padding-box;
		box-shadow: 0px 10px 10px #374B9926;
		border-radius: 6px;
		z-index: 2;
		span{
			width: 150px;
			padding: 10px;
			display: flex;
			justify-content: center;
			color: $color-text-sub;
			img{
				margin-right: 18px;
				width: 24px;
			}
		}

	}
}
.username{
	font-size: 18px;
	font-weight: 600px;
	margin: 0px 3px 0px 9px;
	color: $color-text-main !important;
}
.fixed-top{
	background: #FFFFFF 0% 0% no-repeat padding-box;
	box-shadow: 0px 5px 15px #17224D26;
}
.nav-links {
	display: flex;
	justify-content: center;
	align-items: center;
}

.slide-enter-active, .slide-leave-active { transition: 0.5s; }
.slide-enter, .slide-leave-to { transform: translateY(-100px); opacity: 0; }
</style>
