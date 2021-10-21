<template>
    <div class="topbar">
      <transition name="fade" mode="out-in">
				<h2>{{ $route.name }}</h2>
			</transition>
      <Date />
    </div>
</template>

<script>
  import Date from '@/components/Dashboard/TopBar/Date.vue'

  export default {
    name: 'TopBar',
    components: {
      Date
    }
  }
</script>

<style scoped>
  div.topbar {
    width: 100%;
    min-height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }

  div.topbar h2 {
    font-size: 18px;
    margin: 0 0 0 40px;
    color: #333;
  }

  div.topbar div.date {
    margin: 0 40px 0 0;
    font-size: 16px;
    color: #555;
  }

  .fade-enter-active, .fade-leave-active {
		transition: opacity .3s;
	}
	
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>