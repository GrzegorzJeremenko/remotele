<template>
    <div v-if="group === null" class="loading">
        <i class="icon-spin1"></i>
    </div>
    <div v-else class="group">
        <About :group="group" />
        <Content :group="group" />
    </div>
</template>

<script>
    import About from '@/components/Dashboard/Group/About.vue'
    import Content from '@/components/Dashboard/Group/Content.vue'

    import NProgress from 'nprogress'

    import { getGroup } from '@/services/groups.js'

    export default {
        components: {
            About,
            Content
        },
        data() {
            return { 
                group: null
            }
        },
        methods: {
            navigateTo: function(subpage) {
                if(this.$route.path != subpage) 
                this.$router.push(subpage)
            }
        },
        beforeMount: function() {
            NProgress.start()
            NProgress.set(0.1)

            getGroup(this.$route.params._id)
            .then((res) => {
                this.group = res.data.group
            })
            .catch((err) => {
                switch(err.response.status) {
                case 404:
                    this.navigateTo('/dashboard')
                    break

                case 400:
                    this.navigateTo('/dashboard')
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

    div.group {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        margin: 40px 0 0 0;
    }
</style>