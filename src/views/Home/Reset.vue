<template>
  <div class="reset">
    <h1>Zmiana hasła</h1>
    <form action="javascript: void(0);">
      <label for="password">Hasło</label>
      <input 
        id="password"
        type="password"
        ref="password"
        placeholder="Wpisz swoje hasło"
        :class="{ error: incorrectPassword }">

      <label for="password">Powtórz hasło</label>
      <input 
        id="passwordRepeat"
        type="password"
        ref="passwordRepeat"
        placeholder="Wpisz swoje hasło"
        :class="{ error: incorrectPassword }">

      <input
        type="submit"
        value="Zmień hasło"
        v-on:click="reset()">
    </form>
  </div>
</template>

<script>
  import { reset } from '@/services/home.js'

  export default {
    data() {
      return {
        incorrectPassword: false
      }
    },
		beforeCreate: function() {
			console.log(this.$route.params.token)
		},
    methods: {
			navigateTo: function(subpage) {
					if(this.$route.path != subpage) 
					this.$router.push(subpage)
			},
			reset: function() {
				if(!this.checkForm()) {
					let password = this.$refs.password.value;
					let token = this.$route.params.token;

					reset(password, token)
					.then(() => {
						this.$toast("Zmieniono hasło.")
						this.navigateTo('/login')
					})
					.catch(() => {
						this.$toast.error("Ups... Coś poszło nie tak.\r\nSpróbuj ponownie później")
					})
				}
			},
      validPassword: function (password) {
        let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;
        return re.test(password);
      },
      checkForm: function() {
        let password = this.$refs.password.value;
        let passwordRepeat = this.$refs.passwordRepeat.value;

        this.incorrectPassword = this.incorrectName = false;

        let err = false;

        if(password == "" && passwordRepeat == "") {
          this.$toast.error("Proszę wypełnić pola.");
          this.incorrectEmail = this.incorrectPassword = this.incorrectName = true;
          return true
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
  div.reset {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.reset h1 {
    font-size: 1.3rem;
  }

  div.reset form {
    width: 100%;
    margin: 30px 0 0 0;
    display: flex;
    flex-direction: column;
  }

  div.reset form label {
    font-size: .9rem;
    color: #000;
    margin: 30px 0 5px 3px;
  }

  div.reset form label:first-child {
    margin: 0 0 5px 3px;
  }

  div.reset form input[type=password] {
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

  div.reset form  input[type=password]:focus {
    border-bottom: 2px solid #2ecc71;
  }

  div.reset form input[type=password]
  {
    background-image: url("~@/assets/Home/lock.svg");
  }

  div.reset form input[type=submit] {
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

  div.reset form input[type=submit]:hover {
    background-position: 100%;  
  }

  div.reset form input.error {
    border-bottom: 2px solid #e74c3c;
  }
</style>