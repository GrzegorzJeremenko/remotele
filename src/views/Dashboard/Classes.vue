<template>
  <div class="classes">
    <div
      v-if="groups.length > 0"
      id="groupsList">
      <GroupItem
        v-for="(group, index) in groups"
        :group="group"
        :key="index"
        />
      <div class="filler"></div>
      <div class="filler"></div>
      <div class="filler"></div>
      <div class="filler"></div>
      <div class="filler"></div>
      <div class="filler"></div>
      <div class="filler"></div>
      <div class="filler"></div>
      <div class="filler"></div>
    </div>
    <div
      v-else-if="load"
      id="emptyList">
      <i class="icon-eye"></i>
      <h1>Ups...</h1>
      <h2>Wygląda na to że nie stworzyłaś/eś jeszcze żadnej klasy.</h2>
    </div>
  </div>
</template>

<script>
  import GroupItem from '@/components/Dashboard/GroupItem.vue'

  import NProgress from 'nprogress'

  import { getGroups } from '@/services/classes.js'

  export default {
    components: {
      GroupItem
    },
    data() {
      return {
        groups: [],
        load: false
      }
    },
    beforeMount: function() {
      NProgress.start()
      NProgress.set(0.1)

      getGroups()
      .then((res) => {
        this.groups = res.data.groups
      })
      .catch((err) => {
        console.log(err)
        switch(err.response.status) {
          case 404:
            break

          default:
            this.$toast.error("Ups... Coś poszło nie tak.\r\nSpróbuj ponownie później")
            break
        }
      })
      .finally(() => {
        setTimeout(() => NProgress.done(), 500)
        this.load = true
      })
    }
  }
</script>

<style scoped>
  div.classes {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  div.classes div#groupsList {
    width: calc(100% - 80px);
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 40px;
    margin: 40px 40px 0 40px;
  }

  div.classes div#groupsList div.filler {
    width: 120px;
    height: 120px;
  }

  div.classes div#emptyList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px 0 0 0;
  }

  div.classes div#emptyList i {
    font-size: 80px;
    color: #aaa;
  }

  div.classes div#emptyList h1 {
    font-size: 40px;
    color: #666;
    margin: 15px 0 0 0;
  }

  div.classes div#emptyList h2 {
    font-size: 25px;
    color: #666;
    margin: 15px 0 0 0;
    text-align: center;
  }
</style>