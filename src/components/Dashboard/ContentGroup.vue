<template>
	<div class="contentGroup">
		<div id="menu">
			<div
				class="subopt"
				:class="$route.name === 'Klasa - Start' ? 'active' : ''"
				v-on:click="navigateTo('/dashboard/classes/' + $route.params._id)">
				<i class="icon-home-outline"></i>
				<p>Start</p>
			</div>
			<div
				class="subopt"
				:class="$route.name === 'Klasa - Tematy' ? 'active' : ''"
				v-on:click="navigateTo('/dashboard/classes/' + $route.params._id + '/topics')">
				<i class="icon-doc-text-1"></i>
				<p>Tematy</p>
			</div>
			<div
				class="subopt"
				:class="$route.name === 'Klasa - Testy' ? 'active' : ''"
				v-on:click="navigateTo('/dashboard/classes/' + $route.params._id + '/exams')">
				<i class="icon-pencil"></i>
				<p>Testy</p>
			</div>
			<div
				class="subopt"
				:class="$route.name === 'Klasa - Notatki' ? 'active' : ''"
				v-on:click="navigateTo('/dashboard/classes/' + $route.params._id + '/todo')">
				<i class="icon-check-outline"></i>
				<p>Notatki</p>
			</div>
		</div>
		<div id="content">
			<router-view/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ContentGroup',
		props: {
			group: Object
		},
		methods: {
			navigateTo: function(subpage) {
				if(this.$route.path != subpage) 
				this.$router.push(subpage)
			}
		},
		computed: {
			shortName: function() {
				let subject = this.group.subject.charAt(0).toUpperCase() + this.group.subject.slice(1);

				if(subject.length > 20)
					return subject.substring(0, 18) + '...'
				else
					return subject
			}
		}
	}
</script>

<style scoped>
	div.contentGroup {
		width: 45%;
	}

	div.contentGroup div#menu {
		width: 100%;
		height: 100px;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	div.contentGroup div#menu div.subopt {
		width: 80px;
		height: 80px;
		margin: 10px;
		background-color: #eee;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all .3s ease;
	}

	div.contentGroup div#menu div.subopt:hover {
		-webkit-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
		-moz-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
		box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
	}

	div.contentGroup div#menu div.subopt.active {
		background-color: #ddd;
		-webkit-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
		-moz-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
		box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
	}

	div.contentGroup div#menu div.subopt.active p {
		font-weight: bold;
	}

	div.contentGroup div#menu div.subopt i {
		font-size: 26px;
		margin: 18px 0 12px 0;
		color: #444;
	}

	div.contentGroup div#menu div.subopt i.icon-home-outline {
		margin: 18px 0 12px -3px;
	}

	div.contentGroup div#menu div.subopt p {
		font-size: 16px;
		color: #333;
	}

	div.contentGroup div#content {
		width: 100%;
		min-height: 300px;
		background-color: #fff;
		border-radius: 10px;
		margin: 20px 0 0 0;
	}
</style>