<template>
	<div class="contentGroup">
		<div id="menu">
			<div
				class="subopt"
				:class="contentType === '' ? 'active' : ''"
				v-on:click="changeContent('')">
				<i class="icon-home-outline"></i>
				<p>Start</p>
			</div>
			<div
				class="subopt"
				:class="contentType === 'topics' ? 'active' : ''"
				v-on:click="changeContent('topics')">
				<i class="icon-doc-text-1"></i>
				<p>Tematy</p>
			</div>
			<div
				class="subopt"
				:class="contentType === 'exams' ? 'active' : ''"
				v-on:click="changeContent('exams')">
				<i class="icon-pencil"></i>
				<p>Testy</p>
			</div>
			<div
				class="subopt"
				:class="contentType === 'todo' ? 'active' : ''"
				v-on:click="changeContent('todo')">
				<i class="icon-check-outline"></i>
				<p>Notatki</p>
			</div>
		</div>
		<div id="content">
			<transition name="fade" mode="out-in">
				<Topics
					v-if="contentType === 'topics'"
					:group="group"/>
				<Exams
					v-else-if="contentType === 'exams'"
					:group="group"/>
				<Todo
					v-else-if="contentType === 'todo'"
					:group="group"/>
				<Start
					v-else
					:group="group"/>
			</transition>
		</div>
	</div>
</template>

<script>
	import Start from "@/components/Dashboard/Group/Start.vue"
	import Topics from "@/components/Dashboard/Group/Topics.vue"
	import Exams from "@/components/Dashboard/Group/Exams.vue"
	import Todo from "@/components/Dashboard/Group/Todo.vue"

	export default {
		name: 'ContentGroup',
		components: {
			Start,
			Topics,
			Exams,
			Todo
		},
		props: {
			group: Object
		},
		data() {
			return {
				contentType: ''
			}
		},
		methods: {
			changeContent: function(name) {
				this.contentType = name;
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
		opacity: .6;
	}

	div.contentGroup div#menu div.subopt:hover {
		-webkit-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
		-moz-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
		box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
		opacity: 1;
	}

	div.contentGroup div#menu div.subopt.active {
		opacity: 1;
		-webkit-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
		-moz-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
		box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
	}

	div.contentGroup div#menu div.subopt.active p {
		font-weight: bold;
	}

	div.contentGroup div#menu div.subopt i {
		font-size: 22px;
		margin: 18px 0 12px 0;
		color: #444;
	}

	div.contentGroup div#menu div.subopt i.icon-home-outline {
		margin: 18px 0 12px -3px;
	}

	div.contentGroup div#menu div.subopt p {
		font-size: 14px;
		color: #333;
	}

	div.contentGroup div#content {
		width: calc(100% - 20px);
		background-color: #fff;
		border-radius: 10px;
		margin: 20px 0 0 0;
		padding: 10px 10px 20px 10px;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s;
	}
	
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>