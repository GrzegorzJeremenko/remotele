<template>
    <div v-if="load === false" class="loading">
        <i class="icon-spin1"></i>
    </div>
    <div v-else class="creator" ref="creator">
        <form action="javascript: void(0);">
            <input
                type="submit"
                v-on:click="preview = !preview"
                :value="preview ? 'Tryb edycji' : 'Tryb podglądu'">

            <input
                type="submit"
                v-on:click="save()"
                :disabled="!autosave"
                :value="autosave ? 'Zapisz' : 'Zapisano'">

            <input
                type="submit"
                v-on:click="deleteTopic()"
                class="delete"
                value="Usuń temat">
        </form>
        <ul :style="{ backgroundColor: preview ? '#fff' : '#ffffff00', padding: preview ? '20px' : 'none' }">
            <li
                v-for="(element, index) in topic.components"
                :style="{ backgroundColor: preview ? '#ffffff00' : '#fff' }"
                :key="index">
                <Bar
                    v-if="!preview"
                    :element="element"
                    :index="index"
                    :max="topic.components.length" />

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

                <MathComp
                    v-if="element.type === 'math'"
                    :data="element.data"
                    :preview="preview"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import NProgress from 'nprogress'

    import { getTopic, updateTopic, deleteTopic } from '@/services/topics.js'

    import TextComp from '@/components/Dashboard/Creator/TextComp.vue'
    import CodeComp from '@/components/Dashboard/Creator/CodeComp.vue'
    import QueryComp from '@/components/Dashboard/Creator/QueryComp.vue'
    import MathComp from '@/components/Dashboard/Creator/MathComp.vue'

    import Bar from '@/components/Dashboard/Creator/Bar.vue'

    export default {
        name: 'Creator',
        components: {
            TextComp,
            CodeComp,
            QueryComp,
            MathComp,
            Bar
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

            this.$root.$on('creatorProp-creator-addModule', (template) => {
                this.addModule(JSON.stringify(template))
            })

            this.$root.$on('bar-creator-delete', (element) => {
                this.deleteModule(element)
            })

            this.$root.$on('bar-creator-down', (index) => {
                this.moveModule(index, index + 1)
            })

            this.$root.$on('bar-creator-up', (index) => {
                this.moveModule(index, index - 1)
            })
        },
        destroyed: function() {
            clearInterval(this.intervalChange)
        },
        methods: {
            navigateTo: function(subpage) {
                if(this.$route.path != subpage) 
                this.$router.push(subpage)
            },
            addModule: function(template) {
                this.topic.components.push(JSON.parse(template))
                this.$root.$emit('creator-dashboard-scrollDown')

                setTimeout(() => {
                    this.$root.$emit('creator-components-update')
                }, 100)
            },
            deleteModule: function(element) {
                this.topic.components = this.topic.components.filter(function(component) {
                    return JSON.stringify(component) !== JSON.stringify(element)
                })

                setTimeout(() => {
                    this.$root.$emit('creator-components-update')
                }, 100)
            },
            moveModule: function(index, nextIndex) {
                let nextComponent = this.topic.components[nextIndex]

                this.topic.components[nextIndex] = this.topic.components[index]
                this.topic.components[index] = nextComponent

                setTimeout(() => {
                    this.$root.$emit('creator-components-update')
                    this.preview = true
                    this.preview = false
                }, 100)
            },
            change: function() {
                if(JSON.stringify(this.topic.components) !== this.lastComponents) {
                    this.lastComponents = JSON.stringify(this.topic.components)

                    this.$root.$emit('creator-components-update')

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
            },
            deleteTopic: function() {
                deleteTopic(this.topic)
                .then(() => {
                    this.$toast("Temat został usunięty.")
                    this.navigateTo('/dashboard/topics')
                })
                .catch((err) => {
                    switch(err.response.status) {
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

    div.creator form input[type=submit].delete {
        background-color: #e74c3c;
    }

    div.creator form input[type=submit]:disabled {
        background-color: #3498db !important;
        cursor: default;
    }

    div.creator form input[type=submit]:hover {
        background-color: #27ae60;
    }

    div.creator form input[type=submit].delete:hover {
        background-color: #c0392b;
    }
</style>