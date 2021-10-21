<template>
    <div class="creator">
        <p style="cursor: pointer" v-on:click="preview = !preview">PreView: {{ preview }}</p>
        <ul>
            <li
                v-for="(element, index) in elements"
                :style="{ backgroundColor: preview ? '#eee' : '#fff', margin: preview ? '0' : '0 0 20px 0'}"
                :key="index">
                <TextComp
                    v-if="element.type === 'text'"
                    :content="element.content"
                    :config="element.config"/>

                <CodeComp
                    v-if="element.type === 'code'"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import TextComp from '@/components/Dashboard/Creator/TextComp.vue'
    import CodeComp from '@/components/Dashboard/Creator/CodeComp.vue'

    export default {
        components: {
            TextComp,
            CodeComp
        },
        data() {
            return {
                preview: false,
                elements: [
                    {
                        type: 'text',
                        content: 'Operator %',
                        config: {
                            font: {
                                size: '30',
                                bold: true
                            }
                        }
                    },
                    {
                        type: 'text',
                        content: 'Do tej pory nie opisałem jeszcze jednego dość przydatnego operatora w języku Java. Mianowicie %. Operator % zwraca resztę z dzielenia liczb. Najłatwiej będzie to zrozumieć na przykładzie'
                    },
                    {
                        type: 'code',
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
</style>