<template>
  <div v-if="load === false" class="loading">
    <i class="icon-spin1"></i>
  </div>
  <div v-else class="topics">
    <ul v-if="topics !== null">
      <li
        v-for="(topic, index) in topics"
        v-on:click="navigateTo('/dashboard/creator/topic/' + topic._id)"
        :key="index">
        <p>{{ stringToUpper(topic.name) }}</p>
      </li>
    </ul>
    <div v-else id="emptyList">
      <i class="icon-eye"></i>
      <h1>Ups...</h1>
      <h2>Wygląda na to że nie stworzyłaś/eś jeszcze żadnego tematu.</h2>
    </div>
  </div>
</template>

<script>
  import NProgress from 'nprogress'

  import { getTopics } from '@/services/topics.js'

  export default {
    data() {
      return {
        topics: null,
        load: false
      }
    },
    methods: {
      navigateTo: function(subpage) {
        if(this.$route.path != subpage) 
        this.$router.push(subpage)
      },
      stringToUpper: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },
    beforeMount: function() {
      NProgress.start()
      NProgress.set(0.1)

      getTopics()
      .then((res) => {
        this.topics = res.data.topics
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
            this.navigateTo('/')
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

  div.topics {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  div.topics div#emptyList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px 0 0 0;
  }

  div.topics div#emptyList i {
    font-size: 80px;
    color: #aaa;
  }

  div.topics div#emptyList h1 {
    font-size: 40px;
    color: #666;
    margin: 15px 0 0 0;
  }

  div.topics div#emptyList h2 {
    font-size: 25px;
    color: #666;
    margin: 15px 0 0 0;
    text-align: center;
  }

  div.topics ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0 30px 0;
  }

  div.topics ul li {
    width: calc(90% - 60px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px 10px 0 10px;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px 15px 10px 15px;
    transition: box-shadow .3s ease;
  }

  div.topics ul li:hover {
    -webkit-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
    box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
  }

  div.topics ul li p {
    font-size: 16px;
    padding: 5px 0 5px 0;
    text-align: justify;
  }
</style>