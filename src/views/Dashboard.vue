<template>
  <div class="dashboard">
		<Menu :user="user" />
		<div id="inside" ref="inside">
			<TopBar />
			<transition name="fade" mode="out-in">
				<router-view/>
			</transition>
		</div>
		<SideBar :user="user" />
  </div>
</template>

<script>
	import Menu from '@/components/Dashboard/Menu.vue'
	import SideBar from '@/components/Dashboard/SideBar.vue'
	import TopBar from '@/components/Dashboard/TopBar.vue'

	import "@/assets/css/fontello.css";

	export default {
		components: {
			Menu,
			SideBar,
			TopBar
		},
		data() {
			return {
				user: Object
			}
		},
		beforeMount: function() {
			this.user = JSON.parse(localStorage.getItem('user'))
		},
		mounted: function() {
			this.$root.$on('addModule', () => {
                setTimeout(() => {this.$refs.inside.scrollTop = this.$refs.inside.scrollHeight}, 100)
            })
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
		display: flex;
		flex-direction: column;
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