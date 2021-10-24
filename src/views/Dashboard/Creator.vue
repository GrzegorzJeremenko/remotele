<template>
    <div v-if="load === false" class="loading">
        <i class="icon-spin1"></i>
    </div>
    <div v-else class="creator" ref="creator">
        <form action="javascript: void(0);">
            <input type="submit" v-on:click="preview = !preview" :value="preview ? 'Tryb edycji' : 'Tryb podglądu'">

            <input type="submit" v-on:click="save()" :disabled="!autosave" :value="autosave ? 'Zapisz' : 'Zapisano'">
        </form>
        <ul :style="{ backgroundColor: preview ? '#fff' : '#ffffff00', padding: preview ? '20px' : 'none' }">
            <li
                v-for="(element, index) in topic.components"
                :style="{ backgroundColor: preview ? '#ffffff00' : '#fff' }"
                :key="index">
                <div>testw</div>
                <TextComp
                    v-if="element.type === 'text'"
                    :data="element.data"
                    :preview="preview"/>

                <CodeComp
                    v-if="element.type === 'code'"
                    :data="element.data"
                    :preview="preview"/>

                <QueryComp
                    v-if="element.type === 'query'"
                    :data="element.data"
                    :preview="preview"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import NProgress from 'nprogress'

    import { getTopic, updateTopic } from '@/services/topics.js'

    import TextComp from '@/components/Dashboard/Creator/TextComp.vue'
    import CodeComp from '@/components/Dashboard/Creator/CodeComp.vue'
    import QueryComp from '@/components/Dashboard/Creator/QueryComp.vue'

    export default {
        name: 'Creator',
        components: {
            TextComp,
            CodeComp,
            QueryComp
        },
        beforeMount: function() {
            NProgress.start()
            NProgress.set(0.1)

            getTopic(this.$route.params._id)
            .then((res) => {
                this.topic = res.data.topic
            })
            .catch((err) => {
                switch(err.response.status) {
                case 404:
                    this.$toast.error("Ups... Nie znaleziono tematu")

                    this.navigateTo('/dashboard')
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

                this.lastComponents = JSON.stringify(this.topic.components)

                this.intervalChange = setInterval(this.change, 100)

                

                this.load = true
            })

            this.$root.$on('creatorProp-creator-addModule', (res) => {
                this.addModule(res)
            })
        },
        destroyed: function() {
            clearInterval(this.intervalChange)
        },
        methods: {
            addModule: function(res) {
                this.topic.components.push(res)
                this.$root.$emit('creator-dashboard-scrollDown')
            },
            change: function() {
                if(JSON.stringify(this.topic.components) !== this.lastComponents) {
                    this.lastComponents = JSON.stringify(this.topic.components)

                    this.lastChange = Date.now()
                    this.autosave = true

                } else if(this.autosave && ((Date.now() - this.lastChange) / 1000) > 10) 
                    this.save()
            },
            save: function() {
                this.lastChange = Date.now()

                updateTopic(this.$route.params._id, this.topic)
                .then(() => {
                    this.$toast("Zapisano.")
                    this.autosave = false
                })
                .catch((err) => {
                    switch(err.response.status) {
                        case 401:
                            localStorage.clear()
                            this.navigateTo('/')
                            break

                        default:
                            this.$toast("Zapisano.")
                            this.$toast.error("Ups... Coś poszło nie tak.\r\nSpróbuj ponownie później")

                            this.lastChange = Date.now()
                            break
                    }
                })
            }
        },
        data() {
            return {
                preview: false,
                autosave: false,
                lastChange: Date,
                intervalChange: Object,
                lastComponents: String,
                topic: Object,
                load: false,
            }
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

    div.creator {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 0 40px 0;
    }

    div.creator ul {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 40px 0 0 0;
        border-radius: 20px;
    }

    div.creator ul li {
        width: 100%;
        background-color: #fff;
        border-radius: 20px;
        margin: 0 0 20px 0;
        transition: all 1s ease;
    }

    div.creator ul li:last-child {
        margin: 0;
    }

    div.creator form {
        width: 80%;
        margin: 20px 0 0 0;
    }

    div.creator form input[type=submit] {
        font-family: 'Montserrat', sans-serif;
        background-color: #2ecc71;
        background-size: 200% 1px; 
        box-sizing: border-box;
        color: #fff;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        padding: 10px;
        margin: 0 10px 0 0;
        font-size: 14px;
        font-weight: bold;
        transition: background-color .3s ease-out;  
    }

    div.creator form input[type=submit]:disabled {
        background-color: #3498db !important;
        cursor: default;
    }

    div.creator form input[type=submit]:hover {
        background-color: #27ae60;
    }
</style>