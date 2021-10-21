<template>
    <div class="exams">
        <h1>Testy:</h1>
        <ul>
            <li>
                <p>{{ shortString('Ciąg fibonacziego', 44) }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Exams',
        props: {
            group: Object
        },
        methods: {
            shortString: function(text, length) {
                text = text.charAt(0).toUpperCase() + text.slice(1);

                if(text.length > length)
                    return text.substring(0, length - 2) + '...'
                else
                    return text
            }
        }
    }
</script>

<style scoped>
    div.exams {
        width: 100%;
    }

    div.exams h1 {
        margin: 10px 0 10px 10px;
    }

    div.exams ul {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    div.exams ul li {
        width: calc(100% - 60px);
        margin: 10px 10px 0 10px;
        background-color: #eee;
        border-radius: 10px;
        padding: 10px 15px 10px 15px;
    }

    div.exams ul li p {
        font-size: 14px;
    }
</style>