<template>
    <div class="creatorProp">
        <h1>Lista modułów:</h1>
        <ul>
            <li
                v-for="(element, index) in elements"
                v-on:click="$root.$emit('creatorProp-creator-addModule', element.template)"
                :key="index">
                <i :class="element.icon"></i>
                <p>{{ element.name }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                elements: [
                    {
                        icon: 'icon-quote-left',
                        name: 'Tekst',
                        template: {
                            type: 'text',
                            data: {
                                content: 'Tekst',
                                font: {
                                    size: '16',
                                    color: '#000000',
                                    bold: false,
                                    italic: false,
                                    underline: false,
                                },
                                align: 'left'
                            }
                        }
                    },
                    {
                        icon: 'icon-code',
                        name: 'Kod',
                        template: {
                            type: 'code',
                            data: {
                                content: '#include <iostream>\n\nusing namespace std;\n\nint main(void)\n{\n    cout << "Hello world";\n\n    return 0;\n}',
                                lang: 'cpp'
                            }
                        }
                    },
                    {
                        icon: 'icon-superscript',
                        name: 'Wykres',
                        template: {
                            type: 'math',
                            data: []
                        }
                    }
                ]
            }
        }
    }
</script>


<style scoped>
    div.creatorProp {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.creatorProp h1 {
        font-size: 1.1vw;
        margin: 0 0 1vw 0;
    }

    div.creatorProp ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 1vw;
        box-sizing: border-box;
    }

    div.creatorProp ul li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 6.9vw;
        height: 6.9vw;
        margin: 1vw;
        border-radius: 1vw;
        background-color: #eee;
        cursor: pointer;
        transition: box-shadow .3s ease;
    }

    div.creatorProp ul li:hover {
        -webkit-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
        -moz-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
        box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
    }

    div.creatorProp ul li i {
        font-size: 2vw;
        margin: 15px 0 15px 0;
    }

    div.creatorProp ul li p {
        font-size: 1.1vw;
    }
</style>