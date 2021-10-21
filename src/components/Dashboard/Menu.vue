<template>
  <div class="menu">
	<img src="@/assets/logo.png">
		<ol>
			<li
				v-for="(subpage, index) in subpages"
				:class="$route.path == subpage.path ? 'routeActive' : ''"
				v-on:click="navigateTo(subpage.path)"
				:key="index">
				<i :class="subpage.icon"></i>
				<p>{{ subpage.name }}</p>
			</li>
		</ol>
		<footer>RemoteLe &copy; 2021</footer>
  </div>
</template>

<script>
export default {
	name: 'Menu',
	props: {
		user: Object
	},
	data() {
		return {
			permission: 0,
			subpages: [
				{
					name: 'Start',
					icon: 'icon-home-outline',
					path: '/dashboard',
				},
				{
					name: 'Klasy',
					icon: 'icon-users-outline',
					path: '/dashboard/classes',
				},
				{
					name: 'Tematy',
					icon: 'icon-doc-text-1',
					path: '/dashboard/topics',
				},
				{
					name: 'Testy',
					icon: 'icon-pencil',
					path: '/dashboard/exams',
				},
				{
					name: 'Ustawienia',
					icon: 'icon-cog-outline',
					path: '/dashboard/settings',
				}
			]
		}
	},
	methods: {
		navigateTo: function(subpage) {
			if(this.$route.path != subpage) 
			this.$router.push(subpage)
		}
	}
}
</script>

<style scoped>
	div.menu {
		width: 15%;
		height: 100%;
		border-right: 1px solid #ccc;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	div.menu img {
		max-width: 200px;
		width: 80%;
		height: auto;
		margin: 10px 0 0 0;
	}

	div.menu ol {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: 4vw 0 0 0;
	}

	div.menu ol li {
		width: calc(100% - 1px);
		height: 3vw;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #888;
		cursor: pointer;
		transition: color .3s ease;
	}

	div.menu ol li:hover {
		color: #7acc9c;
		border-right: 2px solid #7acc9c;
	}

	div.menu ol li.routeActive {
		color: #27ae60;
		border-right: 2px solid #27ae60;
	}

	div.menu ol li i {
		width: 30%;
		text-align: center;
		font-size: 1.2vw;
	}

	div.menu ol li p {
		width: 70%;
		font-size: 1vw;
	}

	div.menu footer {
		position: absolute;
		bottom: 5px;
		color: #888;
		font-size: .7vw;
	}
</style>
