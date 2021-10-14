<template>
  <div class="forgot">
    <h1>Zapomniałeś hasła?</h1>
    <form action="javascript: void(0);">
      <label for="email">Adres email</label>
      <input 
        id="email"
        type="email"
        placeholder="Wpisz swój adres email"
        :class="{ error: incorrectEmail }">

      <div id="register">
        <p v-on:click="navigateTo('/register')">Nie posiadasz konta? Załóż je</p>
      </div>

      <input
        type="submit"
        value="Przypomnij hasło">
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        incorrectEmail: false,
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
  div.forgot {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.forgot h1 {
    font-size: 1.3rem;
  }

  div.forgot form {
    width: 100%;
    margin: 30px 0 0 0;
    display: flex;
    flex-direction: column;
  }

  div.forgot form label {
    font-size: .9rem;
    color: #000;
    margin: 30px 0 5px 3px;
  }

  div.forgot form label:first-child {
    margin: 0 0 5px 3px;
  }

  div.forgot form input[type=email] {
    width: 100%;
    font-family: 'Montserrat', sans-serif;
    border: none;
    padding: 15px 10px 15px 35px;
    background-color: #fff;
    display: block;
    outline: none;
    box-sizing: border-box;
    border-bottom: 2px solid #ccc;
    font-size: 1rem;
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: 5px 15px;
    transition: border .3s ease;
  }

  div.forgot form input[type=email]:focus {
    border-bottom: 2px solid #2ecc71;
  }

  div.forgot form input[type=email]
  {
    background-image: url("~@/assets/Home/user.svg");
  }

  div.forgot form div#register {
    width: 100%;
  }

  div.forgot form div#register p {
    float: right;
    cursor: pointer;
    margin: 15px 0 0 0;
    font-size: .9rem;
  }

  div.forgot form input[type=submit] {
    width: 100%;
    font-family: 'Montserrat', sans-serif;
    background-image: linear-gradient(to right, #1abc9c, #2ecc71, #1abc9c);
    background-size: 200% 1px; 
    box-sizing: border-box;
    color: #fff;
    border: none;
    height: 49px;
    cursor: pointer;
    border-radius: 30px;
    font-size: 1rem;
    margin: 30px 0 0 0;
    font-weight: bold;
    transition: background-position .3s ease-out;  
  }

  div.forgot form input[type=submit]:hover {
    background-position: 100%;  
  }

  div.forgot form input.error {
    border-bottom: 2px solid #e74c3c;
  }
</style>