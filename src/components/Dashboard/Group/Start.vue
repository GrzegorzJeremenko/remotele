<template>
    <div class="start">
        <h1>Informacje od nauczyciela:</h1>
        <p v-if="group.description !== ''">{{ group.description }}</p>
        <p v-else>Brak informacji od nauczyciela.</p>
    </div>
</template>

<script>
    export default {
        name: 'Start',
        props: {
            group: Object
        }
    }
</script>

<style scoped>
    div.start {
        width: 100%;
    }

    div.start h1 {
        margin: 10px 0 10px 10px;
    }

    div.start p {
        font-size: 14px;
        padding: 10px 12px 0 12px;
        text-align: justify;
    }
</style>