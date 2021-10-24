<template>
    <div class="confirm">
        <h1>Przekierowanie...</h1>
    </div>
</template>

<script>
    import { confirmEmail } from '@/services/home.js'

    export default {
        beforeMount: function() {
            confirmEmail(this.$route.params.token)
            .then(() => {
                this.$toast("Konto zostało aktywowane.")
                this.navigateTo('/')
            })
            .catch(() => {
                this.$toast.error("Ups... Coś poszło nie tak.\r\nSpróbuj ponownie później")
            })
        },
        methods: {
            navigateTo: function(subpage) {
                if(this.$route.path != subpage) 
                this.$router.push(subpage)
            }
        }
    }
</script>