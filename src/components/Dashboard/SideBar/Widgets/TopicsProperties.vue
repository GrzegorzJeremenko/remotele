<template>
    <div class="topicProp">
        <h1>Dodatkowe funkcje:</h1>
        <div class="prop">
            <div 
                class="bar"
                v-on:click="prop[0].open = !prop[0].open">
                <div class="title">
                    <i
                        class="icon-plus-squared"
                        :class="prop[0].open == true ? 'active' : ''"></i>
                    <p>Utwórz temat</p>
                </div>
                <i 
                    class="icon-down-open"
                    :class="prop[0].open == true ? 'opened' : ''"></i>
            </div>
            <transition
                name="fade"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave">
                <div 
                    v-show="prop[0].open"
                    class="content">
                    <form action="javascript: void(0);">
                        <label for="topicName">Temat:</label>
                        <input
                            id="topicName"
                            class="form"
                            ref="topicName"
                            placeholder="Wpisz temat"
                            type="text"
                            :class="{ error: incorrectTopicName }" />

                        <label for="description">Opis:</label>
                        <input
                            id="description"
                            class="form"
                            ref="topicDescription"
                            placeholder="Wpisz opis"
                            type="text"
                            :class="{ error: incorrectTopicDescription }" />

                        <input
                            type="submit"
                            value="Utwórz temat"
                            v-on:click="createTopic()">
                    </form>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import { createTopic } from '@/services/topics.js'

    export default {
        name: 'TopicProperties',
        data() {
            return {
                prop: [
                    {
                        open: false
                    }
                ],
                incorrectTopicName: false,
                incorrectTopicDescription: false
            }
        },
        methods: {
            navigateTo: function(subpage) {
                if(this.$route.path != subpage) 
                this.$router.push(subpage)
            },
            createTopic: function() {
                if(!this.checkForm()) {
                    let topicName = this.$refs.topicName.value
                    let topicDescription = this.$refs.topicDescription.value

                    createTopic(topicName, topicDescription)
                    .then((res) => {
                        this.$refs.topicName.value = ''
                        this.$refs.topicDescription.value = ''
                        this.prop[0].open = false

                        this.$toast("Pomyślnie utowrzono temat '" + topicName + "'.")

                        this.navigateTo('/dashboard/creator/topic/' + res.data.topic._id)
                    })
                    .catch(() => {
                        this.$toast.error("Ups... Coś poszło nie tak.\r\nSpróbuj ponownie później")
                    })
                }
            },
            checkForm: function() {
                let topicName = this.$refs.topicName.value
                let topicDescription = this.$refs.topicDescription.value

                this.incorrectTopicName = this.incorrectTopicDescription = false

                let err = false

                if(topicName == "" && topicDescription == "") {
                    this.$toast.error("Proszę wypełnić pola.")
                    this.incorrectTopicName = this.incorrectTopicDescription = true

                    return true
                }

                if(topicName == "") {
                    this.$toast.error("Pole 'Temat' nie może być puste.")
                    this.incorrectTopicName = true

                    err = true
                }

                if(topicDescription == "") {
                    this.$toast.error("Pole 'Opis' nie może być puste.")
                    this.incorrectTopicDescription = true

                    err = true
                }

                if(err)
                    return true
            },
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
    }
</script>

<style scoped>
    div.topicProp {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.topicProp h1 {
        font-size: 1.1vw;
        margin: 0 0 1vw 0;
    }

    div.topicProp div.prop {
        width: 100%;
        display: flex;
        flex-direction: column;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    div.topicProp div.prop div.bar {
        width: 100%;
        height: 2.5vw;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        justify-content: space-between;
        align-items: center;
    }

    div.topicProp div.prop div.bar:hover > i {
        color: #444;
    }

    div.topicProp div.prop div.bar div.title {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    div.topicProp div.prop div.bar div.title p {
        color: #444;
        font-size: 1vw;
        margin: 0 0 0 1vw;
    }

    div.topicProp div.prop div.bar div.title i {
        color: #444;
        font-size: 1.2vw;
        margin: 0 0 0 1vw;
        transition: color .3s ease;
    }

    div.topicProp div.prop div.bar div.title i.active {
        color: #27ae60;
    }

    div.topicProp div.prop div.bar i.opened {
        transform: rotate(180deg);
        margin: 5px 1vw 0 0;
    }

    div.topicProp div.prop div.bar i {
        margin: 0 1vw 0 0;
        color: #888;
        font-size: 1.2vw;
        transition: color .3s ease;
        transition: transform .3s ease, margin .3s ease;
    }

    div.topicProp div.prop div.content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.topicProp div.prop div.content form {
        width: 80%;
        margin: .5vw 0 0 0;
        display: flex;
        flex-direction: column;
    }

    div.topicProp div.prop div.content form label {
        font-size: .8vw;
        color: #000;
        margin: 1vw 0 .2vw .1vw;
    }

    div.topicProp div.prop div.content form label:first-child {
        margin: 0 0 .2vw .1vw;
    }

    div.topicProp div.prop div.content form h1 {
        height: 1vw;
        margin: .5vw 0 0 .5vw;
    }

    div.topicProp div.prop div.content form input[type=text] {
        width: 100%;
        font-family: 'Montserrat', sans-serif;
        border: none;
        padding: .75vw .5vw .5vw 1.9vw;
        background-color: #fff;
        display: block;
        outline: none;
        box-sizing: border-box;
        border-bottom: 2px solid #ccc;
        font-size: .9vw;
        background-repeat: no-repeat;
        background-size: 1vw 1vw;
        background-position: .4vw .75vw;
        transition: border .3s ease;
    }

    div.topicProp div.prop div.content form input[type=text]:focus {
        border-bottom: 2px solid #2ecc71;
    }

    div.topicProp div.prop div.content form input[type=text].error {
        border-bottom: 2px solid #e74c3c;
    }

    div.topicProp div.prop div.content form input[type=text]
    {
        background-image: url("~@/assets/Dashboard/pencil.svg");
    }

    div.topicProp div.prop div.content form input[type=submit] {
        width: 100%;
        font-family: 'Montserrat', sans-serif;
        background-image: linear-gradient(to right, #1abc9c, #2ecc71, #1abc9c);
        background-size: 200% 1px; 
        box-sizing: border-box;
        color: #fff;
        border: none;
        height: 2vw;
        cursor: pointer;
        border-radius: 2.5vw;
        font-size: .7vw;
        margin: 1vw 0 1vw 0;
        font-weight: bold;
        transition: background-position .3s ease-out;  
    }

    div.topicProp div.prop div.content form input[type=submit]:hover {
        background-position: 100%;  
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
</style>