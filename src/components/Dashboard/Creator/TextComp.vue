<template>
    <div v-if="!preview" class="textCompEdit">
        <div class="bar">
            <p>Tekst</p>
            <div class="list">
                <i class="icon-down-open"></i>
                <i class="icon-up-open"></i>
                <i class="icon-cancel"></i>
            </div>
        </div>
        <form>
            <label for="content">Tekst:</label>
            <textarea
                id="content"
                placeholder="Wpisz tekst"
                v-model="dataEdit.content"
                :style="styleText" />

            <label for="size">Wielkość tekstu:</label>
            <select
                id="size"
                v-model="dataEdit.font.size">
                <option value="10">Bardzo mała</option>
                <option value="12">Mała</option>
                <option value="16">Średnia</option>
                <option value="22">Duża</option>
                <option value="30">Bardzo duża</option>
            </select>

            <label>Wyrównanie tekstu:</label>
            <div class="list">
                <i
                    class="icon-align-left"
                    :class="dataEdit.align === 'left' ? 'active' : ''"
                    v-on:click="dataEdit.align = 'left'"></i>

                <i
                    class="icon-align-center"
                    :class="dataEdit.align === 'center' ? 'active' : ''"
                    v-on:click="dataEdit.align = 'center'"></i>

                <i
                    class="icon-align-right"
                    :class="dataEdit.align === 'right' ? 'active' : ''"
                    v-on:click="dataEdit.align = 'right'"></i>

                <i
                    class="icon-align-justify"
                    :class="dataEdit.align === 'justify' ? 'active' : ''"
                    v-on:click="dataEdit.align = 'justify'"></i>
            </div>

            <label for="color">Kolor tekstu:</label>
            <input
                type="color"
                id="color"
                v-model="dataEdit.font.color">

            <label>Styl tekstu:</label>
            <div class="list">
                <i
                    class="icon-bold"
                    :class="dataEdit.font.bold ? 'active' : ''"
                    v-on:click="dataEdit.font.bold = !dataEdit.font.bold"></i>
                <i
                    class="icon-italic"
                    :class="dataEdit.font.italic ? 'active' : ''"
                    v-on:click="dataEdit.font.italic = !dataEdit.font.italic"></i>
                <i
                    class="icon-underline"
                    :class="dataEdit.font.underline ? 'active' : ''"
                    v-on:click="dataEdit.font.underline = !dataEdit.font.underline"></i>
            </div>
        </form>
    </div>
    <div v-else class="textComp">
        <p
            :style="styleText">
            {{ data.content }}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'TextComp',
        props: {
            data: Object,
            preview: Boolean
        },
        mounted: function() {
            this.countStyle()
        },
        data() {
            return {
                dataEdit: this.data,
                styleText: {
                    fontSize: '16px',
                    lineHeight: '20px',
                    textAlign: 'justify',
                    color: '#000',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                }
            }
        },
        watch: {
            preview: function() {
                this.countStyle()
            }
        },
        methods: {
            countStyle: function() {
                this.styleText.fontSize = this.dataEdit.font.size + 'px'
                this.styleText.lineHeight = Math.floor(this.dataEdit.font.size * 1.3) + 'px'

                this.styleText.color = this.dataEdit.font.color

                this.styleText.fontWeight = this.dataEdit.font.bold ? 'bold' : 'normal'

                this.styleText.fontStyle = this.dataEdit.font.italic ? 'italic' : 'normal'

                this.styleText.textDecoration = this.dataEdit.font.underline ? 'underline' : 'none'

                this.styleText.textAlign = this.dataEdit.align
            }
        }
    }
</script>

<style scoped>
    div.textCompEdit div.bar {
        width: calc(100% + 40px);
        margin: -20px -20px 20px -20px;
        background-color: #2ecc71;
        border-radius: 20px 20px 0 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 30px;
    }

    div.textCompEdit div.bar p {
        color: #fff;
        margin: 0 0 0 20px;
        font-size: 18px;
    }

    div.textCompEdit div.bar div.list {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: auto;
        margin: 0 15px 0 0;
    }

    div.textCompEdit div.bar div.list i {
        color: #fff;
        font-size: 18px;
        margin: 0 5px 0 5px;
    }

    div.textCompEdit {
        padding: 20px;
    }

    div.textCompEdit form {
        display: flex;
        flex-direction: column;
    }

    div.textCompEdit form label {
        font-size: 14px;
        margin: 15px 0 10px 0;
    }

    div.textCompEdit form label:first-child {
        margin: 0 0 10px 0;
    }

    div.textCompEdit form textarea {
        width: 100%;
        max-width: 100%;
        min-width: 100%;
        min-height: 150px;
        font-family: 'Montserrat', sans-serif;
        box-sizing: border-box;
        border-radius: 20px;
        font-size: 16px;
        border: none;
        padding: 10px;
        margin: 0;
        outline: none;
        border: 1px solid #ccc;
    }

    div.textCompEdit form input[type=color] {
        border: none;
        outline: none;
        background: none;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    div.textCompEdit form select {
        width: 100%;
        font-family: 'Montserrat', sans-serif;
        box-sizing: border-box;
        border-radius: 20px;
        font-size: 16px;
        border: none;
        padding: 10px;
        margin: 0;
        outline: none;
        border: 1px solid #ccc;
    }

    div.textCompEdit form div.list {
        display: flex;
        flex-direction: row;
    }

    div.textCompEdit form div.list i {
        font-size: 22px;
        margin: 0 5px 0 0;
        width: 35px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border-radius: 5px;
        border: 1px solid #ccc;
        cursor: pointer;
        transition: all .3s ease;
    }

    div.textCompEdit form div.list i:hover {
        background-color: #2ecc71;
        color: #fff;
    }

    div.textCompEdit form div.list i.active {
        background-color: #2ecc71;
        color: #fff;
    }
</style>