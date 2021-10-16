<template>
  <div class="sidebar">
	<Account />
  </div>
</template>

<script>
	import Account from "@/components/Dashboard/SideBar/Account.vue"

	export default {
		name: 'Sidebar',
		components: {
			Account
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
