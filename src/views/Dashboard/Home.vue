<template>
  <div class="home">
    <div id="inside">
      <h1>Witaj {{ user.fullname.split(' ')[0] }},</h1>
      <div class="list">
        <ToHoliday />
        <Holidays />
      </div>
    </div>
  </div>
</template>

<script>
  import ToHoliday from '@/components/Dashboard/Home/ToHoliday.vue'
  import Holidays from '@/components/Dashboard/Home/Holidays.vue'

  export default {
    components: {
      ToHoliday,
      Holidays
    },
    data() {
      return { 
        user: Object
      }
    },
    beforeMount: function() {
      this.user = JSON.parse(localStorage.getItem('user'))
    },
  }
</script>

<style scoped>
  div.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0 0 0;
  }

  div.home div#inside {
    width: 90%;
  }

  div.home div#inside h1 {
    background-color: #fff;
    width: auto;
    padding: 10px;
    border-radius: 20px;
    font-size: 28px;
  }

  div.home div#inside div.list {
    display: flex;
    flex-direction: row;
  }
</style>