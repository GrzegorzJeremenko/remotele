<template>
  <div class="sidebar">
	<Account :user="user" />
	<transition name="fade" mode="out-in">
		<LessonPlan
			v-if="$route.path === '/dashboard'"
			:user="user" />
		<GroupListProperties v-else-if="$route.path === '/dashboard/classes'"/>
	</transition>
  </div>
</template>

<script>
	import Account from "@/components/Dashboard/SideBar/Account.vue"
	import LessonPlan from "@/components/Dashboard/SideBar/Widgets/LessonPlan.vue"
	import GroupListProperties from "@/components/Dashboard/SideBar/Widgets/GroupListProperties.vue"

	export default {
		name: 'Sidebar',
		props: {
			user: Object
		},
		components: {
			Account,
			LessonPlan,
			GroupListProperties
		}
	}
</script>

<style scoped>
	div.sidebar {
		width: 20%;
		height: 100%;
		border-left: 1px solid #ccc;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
