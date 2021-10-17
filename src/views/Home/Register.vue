<template>
  <div class="register">
    <h1>Rejestracja</h1>
    <form action="javascript: void(0);">
      <label for="email">Adres email</label>
      <input 
        id="email"
        type="email"
        placeholder="Wpisz swój adres email"
        ref="email"
        :class="{ error: incorrectEmail }">

      <label for="name">Imię i nazwisko</label>
      <input 
        id="name"
        type="text"
        placeholder="Wpisz swoje dane"
        ref="name"
        :class="{ error: incorrectName }">

      <label for="password">Hasło</label>
      <input 
        id="password"
        type="password"
        ref="password"
        placeholder="Wpisz swoje hasło"
        :class="{ error: incorrectPassword }">

      <label for="passwordRepeat">Powtórz hasło</label>
      <input 
        id="passwordRepeat"
        type="password"
        placeholder="Wpisz swoje hasło"
        ref="passwordRepeat"
        :class="{ error: incorrectPassword }">

      <div id="login">
        <p v-on:click="navigateTo('/')">Posiadasz konto? Zaloguj się</p>
      </div>

      <input
        type="submit"
        value="Zarejestruj się"
        v-on:click="register()">
    </form>
  </div>
</template>

<script>
  import { register } from '@/services/home.js'

  export default {
    data() {
      return {
        incorrectEmail: false,
        incorrectPassword: false,
        incorrectName: false,
      }
    },
    methods: {
      navigateTo: function(subpage) {
          if(this.$route.path != subpage) 
          this.$router.push(subpage)
      },
      register: function() {
        if(!this.checkForm()) {
          let email = this.$refs.email.value;
          let name = this.$refs.name.value;
          let password = this.$refs.password.value;

          register(email, name, password)
          .then(() => {
            this.$toast("Rejestracja powiodła się. Aby aktywować konto, sprawdź podany adres email.")

            this.navigateTo('/login')
          })
          .catch((err) => {
            switch(err.response.status) {
              case 400:
                this.$toast.error(err.response.data.error)
                break

              case 409:
                this.$toast.error("Podany adres email jest używany przez inne konto.")
                this.incorrectEmail = true;
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
      validPassword: function (password) {
        let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;
        return re.test(password);
      },
      validName: function (name) {
        let re = /^[a-zA-Z\p{L}]+ [a-zA-Z\p{L}]+$/u;
        return re.test(name);
      },
      checkForm: function() {
        let email = this.$refs.email.value;
        let name = this.$refs.name.value;
        let password = this.$refs.password.value;
        let passwordRepeat = this.$refs.passwordRepeat.value;

        this.incorrectEmail = this.incorrectPassword = this.incorrectName = false;

        let err = false;

        if(email == "" && password == "" && name == "" && passwordRepeat == "") {
          this.$toast.error("Proszę wypełnić pola.");
          this.incorrectEmail = this.incorrectPassword = this.incorrectName = true;
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

        if(name == "") {
          this.$toast.error("Pole 'Imię i nazwisko' nie może być puste.");
          this.incorrectName = true;
          err = true;
        } else if(!this.validName(name)) {
          this.$toast.error("Imię i nazwisko jest niepoprawne.");
          this.incorrectName = true;
          err = true;
        }

        if(password == "" || passwordRepeat == "") {
          this.$toast.error("Pole 'Hasło' nie może być puste.");
          this.incorrectPassword = true;
          err = true;
        } else if(!this.validPassword(password)) {
          this.$toast.error("Hasło musi składać się z:\r\n- minimalnie 8 znaków,\r\n- maksymalnie 32 znaków,\r\n- co najmniej jednego znaku specjalnego,\r\n- z ciągu liter i liczb");
          this.incorrectPassword = true;
          err = true;
        } else if(password != passwordRepeat) {
          this.$toast.error("Hasła nie są identyczne.");
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
  div.register {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.register h1 {
    font-size: 1.3rem;
  }

  div.register form {
    width: 100%;
    margin: 30px 0 0 0;
    display: flex;
    flex-direction: column;
  }

  div.register form label {
    font-size: .9rem;
    color: #000;
    margin: 30px 0 5px 3px;
  }

  div.register form label:first-child {
    margin: 0 0 5px 3px;
  }

  div.register form input[type=email], input[type=password], input[type=text] {
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

  div.register form input[type=email]:focus, input[type=password]:focus, input[type=text]:focus {
    border-bottom: 2px solid #2ecc71;
  }

  div.register form input[type=email]
  {
    background-image: url("~@/assets/Home/email.svg");
  }

  div.register form input[type=text]
  {
    background-image: url("~@/assets/Home/user.svg");
  }

  div.register form input[type=password]
  {
    background-image: url("~@/assets/Home/lock.svg");
  }

  div.register form div#login {
    width: 100%;
  }

  div.register form div#login p {
    float: right;
    cursor: pointer;
    margin: 15px 0 0 0;
    font-size: .9rem;
  }

  div.register form input[type=submit] {
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

  div.register form input[type=submit]:hover {
    background-position: 100%;  
  }

  div.register form input.error {
    border-bottom: 2px solid #e74c3c;
  }
</style>