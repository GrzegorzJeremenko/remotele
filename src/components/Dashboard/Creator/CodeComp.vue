<template>
    <div class="codeComp">
        <highlight-code lang="cpp">
            4 % 3 == 1; // bo 3 mieści się raz w 4 i zostaje 1 reszty'<br>
            8 % 3 == 2; // bo 3 mieści się dwa razy w 8 i zostaje 2 reszty<br>
            3 % 4 == 3; // bo 4 nie mieści się w 3 i zostaje 3 reszty<br>
            15 % 5 == 0; // bo 5 mieści się trzy razy w 15 i zostaje 0 reszty<br>
        </highlight-code>
    </div>
</template>

<script>

    export default {
        name: 'CodeComp',
        props: {
            content: String
        }
    }
</script>

<style scoped>
    div.codeComp pre {
        border-radius: 20px;
    }

    div.codeComp pre code {
        border-radius: 20px;
    }

</style>