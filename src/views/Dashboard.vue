<template>
  <div class="dashboard">
		<Menu />
		<div id="inside">
			<transition name="fade" mode="out-in">
				<router-view/>
			</transition>
		</div>
		<SideBar />
  </div>
</template>

<script>
	import Menu from '@/components/Dashboard/Menu.vue'
	import SideBar from '@/components/Dashboard/SideBar.vue'

	import "@/assets/css/fontello.css";

	export default {
		components: {
			Menu,
			SideBar
		}
	}
</script>


<style scoped>
	div.dashboard {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: row;
		background-color: #eee;
	}

	div.dashboard div#inside {
		width: 65%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.fade-enter-active, .fade-leave-active {
	transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
	opacity: 0;
  }
</style>