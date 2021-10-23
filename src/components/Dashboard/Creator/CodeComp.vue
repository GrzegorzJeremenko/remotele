<template>
    <div v-if="!preview" class="codeCompEdit">
        <div class="bar">
            <p>Kod</p>
            <div class="list">
                <i class="icon-down-open"></i>
                <i class="icon-up-open"></i>
                <i class="icon-cancel"></i>
            </div>
        </div>
        <form>
            <label for="content">Kod źródłowy:</label>
            <textarea id="content" placeholder="Wpisz kod źródłowy" v-model="dataEdit.content" />

            <label for="lang">Język programowania:</label>
            <select id="lang" v-model="dataEdit.lang">
                <option value="xml">HTML</option>
                <option value="javascript">JavaScript</option>
                <option value="css">CSS</option>
                <option value="php">PHP</option>
                <option value="cpp">C++</option>
                <option value="python">Python</option>
            </select>
        </form>
    </div>
    <div v-else class="codeComp">
        <highlight-code :lang="dataEdit.lang" :code="data.content" />
    </div>
</template>

<script>
    export default {
        name: 'CodeComp',
        props: {
            data: Object,
            preview: Boolean
        },
        data() {
            return {
                dataEdit: this.data
            }
        }
    }
</script>

<style scoped>
    div.codeCompEdit div.bar {
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

    div.codeCompEdit div.bar p {
        color: #fff;
        margin: 0 0 0 20px;
        font-size: 18px;
    }

    div.codeCompEdit div.bar div.list {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: auto;
        margin: 0 15px 0 0;
    }

    div.codeCompEdit div.bar div.list i {
        color: #fff;
        font-size: 18px;
        margin: 0 5px 0 5px;
    }

    div.codeCompEdit {
        padding: 20px;
    }

    div.codeCompEdit form {
        display: flex;
        flex-direction: column;
    }

    div.codeCompEdit form label {
        font-size: 14px;
        margin: 15px 0 10px 0;
    }

    div.codeCompEdit form label:first-child {
        margin: 0 0 10px 0;
    }

    div.codeCompEdit form textarea {
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

    div.codeCompEdit form select {
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
</style>