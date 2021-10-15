<template>
  <div class="home">
    <div id="con">
      <img src="@/assets/logo.png">
      <transition
        name="fade"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    enter: (element) => {
      const width = getComputedStyle(element).width;

      element.style.width = width;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.style.height = 'auto';

      const height = getComputedStyle(element).height;

      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;

      getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = height;
      });
    },
    afterEnter: (element) => {
      element.style.height = 'auto';
    },
    leave: (element) => {
      const height = getComputedStyle(element).height;
      
      element.style.height = height;

      getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = 0;
      });
    }
  }
};
</script>


<style scoped>
  div.home {
    width: 100vw;
    height: 100vh;
    background-color: #27ae60;
    background-image: url("~@/assets/Home/bg.jpg");
    background-position: 70% 50%;
  }

  div.home div#con {
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 30%;
    height: 100%;
    z-index: 2;
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
  }

  div.home div#con img {
    width: 80%;
    max-width: 200px;
    height: auto;
    margin: -40px 0 0 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: height .5s ease-in-out, opacity .3s ease;
    overflow: hidden;
  }

  .fade-enter,
  .fade-leave-to {
    height: 0;
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave {
    opacity: 1;
  }

  @media only screen and (max-width: 1200px) {
    div.home {
      background: none;
    }

    div.home div#con {
      width: 100%;
      clip-path: none;
    }

    div.home div#con img {
      margin: 0 0 0 0;
    }
  }
</style>
