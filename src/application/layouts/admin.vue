<template>
	<section>
		<TopNavigation :open-menu="openSidebar" />
		<div class="px-2 navBackground">
			<div class="col-lg-8 offset-lg-2 col-md-10 offset-sm-1 py-0 d-flex flex-row" style="align-items:center;">
				<NuxtLink :class="checkTab() == 'subjects' ? 'nav-link-custom py-1 px-2 selectedTab' : 'nav-link-custom py-1 px-2'" to="/admin/questions/subjects">
					<span>Subjects</span>
				</NuxtLink>
				<NuxtLink :class="checkTab() == 'admins' ? 'nav-link-custom py-1 px-2 selectedTab' : 'nav-link-custom py-1 px-2'" to="/admin/users/admins">
					<span>Admins</span>
				</NuxtLink>
			</div>
		</div>
		<section class="layout-body">
			<main class="layout-main flex-grow-1">
				<Nuxt class="layout-content" />
			</main>
			<ModalBase />
		</section>
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AdminLayout',
	components: {
		TopNavigation
	},
	middleware: ['isAdmin'],
	setup () {
		const { openAdminSidebar } = useMenuModal()
		return { openAdminSidebar }
	},
	methods: {
		checkTab () {
		 return	this.$route.name === 'admin-questions-subjects' ? 'subjects' : 'admins'
		}
	}
})
</script>
<style lang="scss" scoped>
.navBackground {
	background: $color-main-dark;
}
.nav-link-custom {
	font-size: 17px;
	color: white;
}

.selectedTab {
    font-size: 17px;
	color: white;
	background-color: $color-text-main;
}
</style>
