<template>
	<nav class="home-top-nav" role="navigation">
		<div class="d-flex justify-content-between align-items-center logo">
			<Logo :secondary="true" class="nav-logo" />
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'HomeTopNavigation',
	setup () {
		const show = ref(false)
		return { show }
	}
})
</script>

<style lang="scss" scoped>
.nav-logo{
	margin: 0px auto;
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
	background:  $color-white;
	color:$color-text-main;
	height: 96px;
	 width: 100vw;
	min-height: 60px;
	z-index: 10 !important;

	margin: 0;
	box-shadow: 0px 5px 15px #17224D26;

	button.navbar-toggler {
		border: none;
		outline: none;
		border-radius: 0;
		color: $color-tint-blue;
	}
}
.logo {
	    width: 21.5%;
	padding: 1rem 2rem;

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
.slide-enter, .slide-leave-to { transform: translateY(-60px); opacity: 1; }
</style>
