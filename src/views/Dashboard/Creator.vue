<template>
    <div class="creator">
        <form action="javascript: void(0);">
            <input type="submit" v-on:click="preview = !preview" :value="preview ? 'Tryb edycji' : 'Tryb podglądu'">

            <input type="submit" v-on:click="save()" :disabled="!autosave" :value="autosave ? 'Zapisz' : 'Zapisano'">
        </form>
        <ul>
            <li
                v-for="(element, index) in elements"
                :style="{ backgroundColor: preview ? '#eee' : '#fff', margin: preview ? '0' : '0 0 20px 0'}"
                :key="index">
                <TextComp
                    v-if="element.type === 'text'"
                    :data="element.data"
                    :preview="preview"/>

                <CodeComp
                    v-if="element.type === 'code'"
                    :data="element.data"
                    :preview="preview"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import TextComp from '@/components/Dashboard/Creator/TextComp.vue'
    import CodeComp from '@/components/Dashboard/Creator/CodeComp.vue'

    export default {
        name: 'Creator',
        components: {
            TextComp,
            CodeComp
        },
        beforeMount: function() {
            this.lastElements = JSON.stringify(this.elements)

            this.intervalChange = setInterval(this.change, 1000)
            this.intervalSave = setInterval(this.save, 1000 * 10)
        },
        destroyed: function() {
            clearInterval(this.intervalChange)
            clearInterval(this.intervalSave)
        },
        methods: {
            change: function() {
                if(JSON.stringify(this.elements) !== this.lastElements) {
                    this.lastElements = JSON.stringify(this.elements)
                    this.autosave = true
                }
            },
            save: function() {
                if(this.autosave && JSON.stringify(this.elements) === this.lastElements) {
                    this.autosave = false

                    this.$toast("Zapisano")
                }
            }
        },
        data() {
            return {
                preview: false,
                autosave: false,
                intervalChange: Object,
                intervalSave: Object,
                lastElements: String,
                elements: [
                    {
                        type: 'text',
                        data: {
                            _id: 0,
                            content: 'Operator %',
                            font: {
                                size: '30',
                                color: '#000000',
                                bold: true,
                                italic: false,
                                underline: true,
                            },
                            align: 'justify'
                        }
                    },
                    {
                        type: 'text',
                        data: {
                            _id: 1,
                            content: 'Do tej pory nie opisałem jeszcze jednego dość przydatnego operatora w języku Java. Mianowicie %. Operator % zwraca resztę z dzielenia liczb. Najłatwiej będzie to zrozumieć na przykładzie',
                            font: {
                                size: '16',
                                color: '#000000',
                                bold: false,
                                italic: false,
                                underline: false,
                            },
                            align: 'justify'
                        }
                    },
                    {
                        type: 'code',
                        data: {
                            _id: 2,
                            content: '4 % 3 == 1; // bo 3 mieści się raz w 4 i zostaje 1 reszty\r\n8 % 3 == 2; // bo 3 mieści się dwa razy w 8 i zostaje 2 reszty\r\n3 % 4 == 3; // bo 4 nie mieści się w 3 i zostaje 3 reszty\r\n15 % 5 == 0; // bo 5 mieści się trzy razy w 15 i zostaje 0 reszty',
                            lang: 'cpp'
                        }
                    },
                    {
                        type: 'text',
                        data: {
                            _id: 3,
                            content: 'Jeśli chcielibyśmy zapisać działanie tego operatora przy pomocy równania matematycznego moglibyśmy użyć następującego wzoru:',
                            font: {
                                size: '16',
                                color: '#000000',
                                bold: false,
                                italic: true,
                                underline: false,
                            },
                            align: 'justify'
                        }
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    div.creator {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.creator ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 40px 0 0 0;
    }

    div.creator ul li {
        width: 80%;
        padding: 20px;
        background-color: #fff;
        border-radius: 20px;
        margin: 0 0 20px 0;
        transition: all 1s ease;
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
        background-color: #3498db;
    }

    div.creator form input[type=submit]:hover {
        background-color: #27ae60;
    }
</style>