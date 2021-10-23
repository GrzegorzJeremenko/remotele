<template>
    <div v-if="!preview" class="queryCompEdit">
        <form>
            <label for="question">Pytanie:</label>
            <textarea id="question" placeholder="Wpisz pytanie" v-model="dataEdit.question" />
        </form>
    </div>
    <div v-else class="queryComp">
        <h1>{{ dataEdit.question }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'QueryComp',
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
    div.queryCompEdit {
        padding: 20px;
    }

    div.queryCompEdit form {
        display: flex;
        flex-direction: column;
    }

    div.queryCompEdit form label {
        font-size: 14px;
        margin: 15px 0 10px 0;
    }

    div.queryCompEdit form label:first-child {
        margin: 0 0 10px 0;
    }

    div.queryCompEdit form textarea {
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
</style>