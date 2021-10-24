<template>
  <div v-if="load === false" class="loading">
    <i class="icon-spin1"></i>
  </div>
  <div v-else class="groupList">
    <div v-if="groups !== null" id="groupsList">
      <ListItem
        v-for="(group, index) in groups"
        :group="group"
        :key="index" />
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
    <div v-else id="emptyList">
      <i class="icon-eye"></i>
      <h1>Ups...</h1>
      <h2>Wygląda na to że nie dołączyłaś/eś jeszcze do żadnej klasy.</h2>
    </div>
  </div>
</template>

<script>
  import ListItem from '@/components/Dashboard/Group/ListItem.vue'

  import NProgress from 'nprogress'

  import { getGroups } from '@/services/groups.js'

  export default {
    components: {
      ListItem
    },
    data() {
      return {
        groups: null,
        load: false
      }
    },
    methods: {
      navigateTo: function(subpage) {
        if(this.$route.path != subpage) 
        this.$router.push(subpage)
      },
    },
    beforeMount: function() {
      NProgress.start()
      NProgress.set(0.1)

      getGroups()
      .then((res) => {
        this.groups = res.data.groups
      })
      .catch((err) => {
        switch(err.response.status) {
          case 404:
            break
          
          case 401:
            localStorage.clear()
            this.navigateTo('/')
            break

          default:
            this.$toast.error("Ups... Coś poszło nie tak.\r\nSpróbuj ponownie później")
            this.navigateTo('/dashboard')
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
  @keyframes loadingSpin {
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
  }

  div.loading {
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  div.loading i {
    font-size: 60px;
    color: #aaa;
    animation: loadingSpin 3s linear infinite;
  }

  div.groupList {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  div.groupList div#groupsList {
    width: calc(100% - 80px);
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 40px;
    margin: 40px 40px 0 40px;
  }

  div.groupList div#groupsList div.filler {
    width: 120px;
    height: 120px;
  }

  div.groupList div#emptyList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px 0 0 0;
  }

  div.groupList div#emptyList i {
    font-size: 80px;
    color: #aaa;
  }

  div.groupList div#emptyList h1 {
    font-size: 40px;
    color: #666;
    margin: 15px 0 0 0;
  }

  div.groupList div#emptyList h2 {
    font-size: 25px;
    color: #666;
    margin: 15px 0 0 0;
    text-align: center;
  }
</style>