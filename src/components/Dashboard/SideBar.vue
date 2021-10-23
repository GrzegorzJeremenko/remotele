<template>
  <div class="sidebar">
	<Account :user="user" />
	<transition name="fade" mode="out-in">
		<LessonPlan
			v-if="$route.path === '/dashboard'"
			:user="user" />
		<GroupListProperties v-else-if="$route.path === '/dashboard/classes'"/>
		<TopicsProperties v-else-if="$route.path === '/dashboard/topics'"/>
		<GroupProperties v-else-if="$route.name == 'Klasa'"/>
		<CreatorProperties v-else-if="$route.name == 'Kreator'"/>
	</transition>
  </div>
</template>

<script>
	import Account from "@/components/Dashboard/SideBar/Account.vue"
	import LessonPlan from "@/components/Dashboard/SideBar/Widgets/LessonPlan.vue"
	import GroupListProperties from "@/components/Dashboard/SideBar/Widgets/GroupListProperties.vue"
	import TopicsProperties from "@/components/Dashboard/SideBar/Widgets/TopicsProperties.vue"
	import GroupProperties from "@/components/Dashboard/SideBar/Widgets/GroupProperties.vue"
	import CreatorProperties from "@/components/Dashboard/SideBar/Widgets/CreatorProperties.vue"

	export default {
		name: 'Sidebar',
		props: {
			user: Object
		},
		components: {
			Account,
			LessonPlan,
			GroupListProperties,
			TopicsProperties,
			GroupProperties,
			CreatorProperties
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
		overflow-y: auto;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
