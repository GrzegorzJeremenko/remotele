<template>
  <div class="login">
    <h1>Logowanie</h1>
    <form action="javascript: void(0);">
      <label for="email">Adres email</label>
      <input 
        id="email"
        type="email"
        ref="email"
        placeholder="Wpisz swój adres email"
        :class="{ error: incorrectEmail }">

      <label for="password">Hasło</label>
      <input 
        id="password"
        type="password"
        ref="password"
        placeholder="Wpisz swoje hasło"
        :class="{ error: incorrectPassword }">

      <div id="forgot">
        <p v-on:click="navigateTo('/forgot')">Zapomniałeś hasła?</p>
      </div>

      <input
        type="submit"
        value="Zaloguj się"
        v-on:click="login()">

      <div id="signup">
        <h2>lub</h2>
        <p v-on:click="navigateTo('/register')">Załóż konto</p>
      </div>
    </form>
  </div>
</template>

<script>
  import { login } from '@/services/home.js'

  export default {
    data() {
      return {
        incorrectEmail: false,
        incorrectPassword: false
      }
    },
    methods: {
        navigateTo: function(subpage) {
            if(this.$route.path != subpage) 
            this.$router.push(subpage)
        },
        login: function() {
          if(!this.checkForm()) {
            let email = this.$refs.email.value;
            let password = this.$refs.password.value;

            login(email, password)
            .then((res) => {
              localStorage.setItem('user', res.data.user);
              localStorage.setItem('token', res.data.token);

              this.navigateTo('/dashboard')
            })
            .catch((err) => {
              switch(err.status) {
                case 400:
                  this.$toast.error(err.data.error)
                  this.incorrectEmail = this.incorrectPassword = true;
                  break

                default:
                  this.$toast.error("Ups... Coś poszło nie tak.\r\nSpróbuj ponownie później")
                  break
              }
            })
          }
        },
        validEmail: function (email) {
          let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        },
        checkForm: function() {
          let email = this.$refs.email.value;
          let password = this.$refs.password.value;

          this.incorrectEmail = this.incorrectPassword = false;

          let err = false;

          if(email == "" && password == "") {
            this.$toast.error("Proszę wypełnić pola.");
            this.incorrectEmail = this.incorrectPassword = true;
            return true
          }
            
          if(email == "") {
            this.$toast.error("Pole 'Adres email' nie może być puste.");
            this.incorrectEmail = true;
            err = true;
          } else if(!this.validEmail(email)) {
            this.$toast.error("Podany adres email jest niepoprawny.");
            this.incorrectEmail = true;
            err = true;
          }

          if(password == "") {
            this.$toast.error("Pole 'Hasło' nie może być puste.");
            this.incorrectPassword = true;
            err = true;
          } else if(password.length < 8) {
            this.$toast.error("Hasło jest za krótkie.");
            this.incorrectPassword = true;
            err = true;
          }

          if(err)
            return true;
        }
      }
  }
</script>


<style scoped>
  div.login {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.login h1 {
    font-size: 1.3rem;
  }

  div.login form {
    width: 100%;
    margin: 30px 0 0 0;
    display: flex;
    flex-direction: column;
  }

  div.login form label {
    font-size: .9rem;
    color: #000;
    margin: 30px 0 5px 3px;
  }

  div.login form label:first-child {
    margin: 0 0 5px 3px;
  }

  div.login form input[type=email], input[type=password] {
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

  div.login form input[type=email]:focus, input[type=password]:focus {
    border-bottom: 2px solid #2ecc71;
  }

  div.login form input[type=email]
  {
    background-image: url("~@/assets/Home/user.svg");
  }

  div.login form input[type=password]
  {
    background-image: url("~@/assets/Home/lock.svg");
  }

  div.login form div#forgot {
    width: 100%;
  }

  div.login form div#forgot p {
    float: right;
    cursor: pointer;
    margin: 15px 0 0 0;
    font-size: .9rem;
  }

  div.login form div#signup {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  div.login form div#signup h2 {
    text-align: center;
    margin: 20px 0 0 0;
    font-size: .9rem;
    color: #333;
  }

  div.login form div#signup p {
    text-align: center;
    cursor: pointer;
    margin: 20px 0 0 0;
    font-size: 1rem;
  }

  div.login form input[type=submit] {
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

  div.login form input[type=submit]:hover {
    background-position: 100%;  
  }

  div.login form input.error {
    border-bottom: 2px solid #e74c3c;
  }
</style>