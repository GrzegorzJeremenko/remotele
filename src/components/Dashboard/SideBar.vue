<template>
  <div class="sidebar">
	<Account :user="user" />
	<LessonPlan
		v-if="$route.path === '/dashboard'"
		:user="user" />
  </div>
</template>

<script>
	import Account from "@/components/Dashboard/SideBar/Account.vue"
	import LessonPlan from "@/components/Dashboard/SideBar/Widgets/LessonPlan.vue"

	export default {
		name: 'Sidebar',
		props: {
			user: Object
		},
		components: {
			Account,
			LessonPlan
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
</style>
