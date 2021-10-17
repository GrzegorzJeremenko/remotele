<template>
	<div class="account">
		<img :src="imagePath" >
		<div id="information">
			<h1>{{ fullName }}</h1>
			<p>Uczeń</p>
		</div>
		<i 
			class="icon-right-open"
			v-on:click="logout()"></i>
	</div>
</template>

<script>
	export default {
		name: 'Account',
		props: {
			user: Object
		},
		computed: {
			imagePath: function() {
				if(this.user.img === undefined)
					return require('@/assets/Dashboard/AccountDefault.png')
				else
					return this.user.img
			},
			fullName: function() {
				if(this.user.fullname.length > 18)
					return this.user.fullname.substr(0, 18) + '...'
				else
					return this.user.fullname
			}
		},
		methods: {
			logout: function() {
				localStorage.clear()
				this.navigateTo('/')
			},
			navigateTo: function(subpage) {
				if(this.$route.path != subpage) 
				this.$router.push(subpage)
			}
		}
	}
</script>

<style scoped>
	div.account {
		width: 100%;
		height: 3.7vw;
		margin: 25px 0 80px 0;
		max-height: 70px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	div.account img {
		width: auto;
		height: 100%;
		clip-path: circle(50% at 50% 50%);
		margin: 0 0 0 1.4vw;
	}

	div.account div#information {
		display: flex;
		width: 10vw;
		flex-direction: column;
		justify-content: center;
		margin: 0 0 0 1vw;
	}

	div.account div#information h1 {
		font-size: .9vw;
		margin: 0 0 .4vw 0;
	}

	div.account div#information p {
		font-size: .7vw;
		color: #666;
	}

	div.account i {
		width: 2vw;
		height: 2vw;
		color: #2ecc71;
		text-align: center;
		line-height: 2vw;
		font-size: 1.4vw;
		margin: 0 0 0 .7vw;
		cursor: pointer;
		transition: color .3s ease;
	}

	div.account i:hover {
		color: #1abc9c;
	}
</style>
