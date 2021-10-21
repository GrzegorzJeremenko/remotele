<template>
    <div class="groupListProp">
        <h1>Dodatkowe funkcje:</h1>
        <div class="prop">
            <div 
                class="bar"
                v-on:click="prop[0].open = !prop[0].open">
                <div class="title">
                    <i
                        class="icon-plus-squared"
                        :class="prop[0].open == true ? 'active' : ''"></i>
                    <p>Utwórz klasę</p>
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
                        <label for="className">Nazwa klasy:</label>
                        <input
                            id="className"
                            class="form"
                            ref="groupName"
                            placeholder="Wpisz nazwę klasy"
                            type="text" />

                        <label for="subject">Nazwa przedmiotu:</label>
                        <input
                            id="subject"
                            class="form"
                            ref="groupSubject"
                            placeholder="Wpisz nazwę przedmiotu"
                            type="text" />

                        <label>Etykieta przedmiotu:</label>

                        <h1>{{ selectedEmoji }}</h1>

                        <emoji-picker @emoji="selectEmoji">
                            <div
                                class="emoji-invoker"
                                slot="emoji-invoker"
                                slot-scope="{ events: { click: clickEvent } }"
                                @click.stop="clickEvent">
                                Wybierz etykietę
                            </div>
                            <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                                <div class="emoji-picker" :style="{ top: display.y + 'px', right: '100px' }">
                                <div>
                                    <div v-for="(emojiGroup, category) in emojis" :key="category">
                                    <h5>{{ category }}</h5>
                                    <div class="emojis">
                                        <span
                                        v-for="(emoji, emojiName) in emojiGroup"
                                        :key="emojiName"
                                        @click="insert(emoji)"
                                        :title="emojiName"
                                        >{{ emoji }}</span>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </emoji-picker>
                        <input
                            type="submit"
                            value="Utwórz klasę"
                            v-on:click="createClass()">
                    </form>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import EmojiPicker from 'vue-emoji-picker'

    import { createGroup } from '@/services/groups.js'

    export default {
        name: 'GroupListProperties',
        components: {
            EmojiPicker
        },
        data() {
            return {
                prop: [
                    {
                        open: false
                    }
                ],
                selectedEmoji: '',
                incorrectGroupName: false,
                incorrectGroupSubject: false
            }
        },
        methods: {
            navigateTo: function(subpage) {
                if(this.$route.path != subpage) 
                this.$router.push(subpage)
            },
            createClass: function() {
                if(!this.checkForm()) {
                    let groupName = this.$refs.groupName.value
                    let groupSubject = this.$refs.groupSubject.value

                    createGroup(groupName, groupSubject, this.selectedEmoji)
                    .then((res) => {
                        this.$refs.groupName.value = this.$refs.groupSubject.value = ''
                        this.prop[0].open = false

                        this.$toast("Pomyślnie utowrzono klasę '" + groupName + "'.")

                        this.navigateTo('/dashboard/classes/' + res.data._id)
                    })
                    .catch(() => {
                        this.$toast.error("Ups... Coś poszło nie tak.\r\nSpróbuj ponownie później")
                    })
                }
            },
            checkForm: function() {
                let groupName = this.$refs.groupName.value
                let groupSubject = this.$refs.groupSubject.value

                this.groupName = this.groupSubject = false

                let err = false;

                if(groupName == "" && groupSubject == "" && this.selectedEmoji == "") {
                    this.$toast.error("Proszę wypełnić pola.")
                    this.groupName = this.groupSubject = true

                    return true
                }

                if(groupName == "") {
                    this.$toast.error("Pole 'Nazwa klasy' nie może być puste.")
                    this.groupName = true

                    err = true
                } else if(!this.validName(groupName)) {
                    this.$toast.error("Podana nazwa klasy zawiera niedozwolone znaki\r\nlub jest za krótka.")
                    this.groupName = true

                    err = true
                }

                if(groupSubject == "") {
                    this.$toast.error("Pole 'Nazwa przedmiotu' nie może być puste.")
                    this.groupSubject = true

                    err = true
                } else if(!this.validSubject(groupSubject)) {
                    this.$toast.error("Podana nazwa przedmiotu zawiera niedozwolone znaki\r\nlub jest za krótka.")
                    this.groupSubject = true

                    err = true
                }

                if(this.selectedEmoji == "") {
                    this.$toast.error("Etykieta przedmiotu nie została wybrana.")
                
                    err = true;
                }

                if(err)
                    return true
            },
            validName: function(name) {
                let re = /[0-9a-zA-Z\p{L}]{2,20}$/uy
                return re.test(name);
            },
            validSubject: function(subject) {
                let re = /[a-zA-Z\p{L}]{2,20}$/uy
                return re.test(subject);
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
            },
            selectEmoji: function(emoji) {
                this.selectedEmoji = emoji
            }
        }
    }
</script>

<style scoped>
    div.groupListProp {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.groupListProp h1 {
        font-size: 1.1vw;
        margin: 0 0 1vw 0;
    }

    div.groupListProp div.prop {
        width: 100%;
        display: flex;
        flex-direction: column;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    div.groupListProp div.prop div.bar {
        width: 100%;
        height: 2.5vw;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        justify-content: space-between;
        align-items: center;
    }

    div.groupListProp div.prop div.bar:hover > i {
        color: #444;
    }

    div.groupListProp div.prop div.bar div.title {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    div.groupListProp div.prop div.bar div.title p {
        color: #444;
        font-size: 1vw;
        margin: 0 0 0 1vw;
    }

    div.groupListProp div.prop div.bar div.title i {
        color: #444;
        font-size: 1.2vw;
        margin: 0 0 0 1vw;
        transition: color .3s ease;
    }

    div.groupListProp div.prop div.bar div.title i.active {
        color: #27ae60;
    }

    div.groupListProp div.prop div.bar i.opened {
        transform: rotate(180deg);
        margin: 5px 1vw 0 0;
    }

    div.groupListProp div.prop div.bar i {
        margin: 0 1vw 0 0;
        color: #888;
        font-size: 1.2vw;
        transition: color .3s ease;
        transition: transform .3s ease, margin .3s ease;
    }

    div.groupListProp div.prop div.content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.groupListProp div.prop div.content form {
        width: 80%;
        margin: .5vw 0 0 0;
        display: flex;
        flex-direction: column;
    }

    div.groupListProp div.prop div.content form label {
        font-size: .8vw;
        color: #000;
        margin: 1vw 0 .2vw .1vw;
    }

    div.groupListProp div.prop div.content form label:first-child {
        margin: 0 0 .2vw .1vw;
    }

    div.groupListProp div.prop div.content form h1 {
        height: 1vw;
        margin: .5vw 0 0 .5vw;
    }

    div.groupListProp div.prop div.content form input.form {
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

    div.groupListProp div.prop div.content form input.form:focus {
        border-bottom: 2px solid #2ecc71;
    }

    div.groupListProp div.prop div.content form input.form
    {
        background-image: url("~@/assets/Dashboard/pencil.svg");
    }

    div.groupListProp div.prop div.content form input[type=submit] {
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

    div.groupListProp div.prop div.content form input[type=submit]:hover {
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

    .emoji-invoker {
        width: 70%;
        font-family: 'Montserrat', sans-serif;
        background-image: linear-gradient(to right, #1abc9c, #2ecc71, #1abc9c);
        background-size: 200% 1px; 
        box-sizing: border-box;
        color: #fff;
        border: none;
        height: 1.5vw;
        cursor: pointer;
        border-radius: 2.5vw;
        font-size: .7vw;
        margin: 1vw 0 1vw 0;
        line-height: 1.5vw;
        text-align: center;
        font-weight: bold;
        transition: background-position .3s ease-out;  
    }
    .emoji-invoker:hover {
        background-position: 100%; 
    }

    .emoji-picker {
    position: absolute;
    z-index: 1;
    font-family: 'Montserrat', sans-serif;
    border: 1px solid #ccc;
    width: 15rem;
    height: 20rem;
    overflow-y: scroll;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 1px 1px 8px #c7dbe6;
    }

    .emoji-picker h5 {
    margin-bottom: 0;
    color: #b1b1b1;
    text-transform: uppercase;
    font-size: 0.8rem;
    cursor: default;
    }

    .emoji-picker .emojis {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    }

    .emoji-picker .emojis:after {
    content: "";
    flex: auto;
    }

    .emoji-picker .emojis span {
    padding: 0.2rem;
    cursor: pointer;
    border-radius: 5px;
    }

    .emoji-picker .emojis span:hover {
    background: #ececec;
    cursor: pointer;
    }
</style>