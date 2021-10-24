<template>
    <div class="bar">
        <p>{{ windowName }}</p>
        <div class="list">
            <i
                v-if="index < (max - 1)"
                v-on:click="$root.$emit('bar-creator-down', index)" 
                class="icon-down-open"></i>
            <i
                v-if="index > 0"
                v-on:click="$root.$emit('bar-creator-up', index)" 
                class="icon-up-open"></i>
            <i
                v-on:click="$root.$emit('bar-creator-delete', element)"
                class="icon-cancel"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Bar',
        props: {
            element: Object,
            index: Number,
            max: Number
        },
        computed: {
            windowName: function() {
                switch(this.element.type) {
                    case 'text':
                        return 'Tekst'

                    case 'code':
                        return 'Kod'

                    case 'math':
                        return 'Wykres'

                    default:
                        return ''
                }
            }
        }
    }
</script>

<style scoped>
    div.bar {
        width: 100%;
        background-color: #2ecc71;
        border-radius: 20px 20px 0 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 30px;
    }

    div.bar p {
        color: #fff;
        margin: 0 0 0 20px;
        font-size: 18px;
    }

    div.bar div.list {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: auto;
        margin: 0 15px 0 0;
    }

    div.bar div.list i {
        color: #fff;
        font-size: 18px;
        margin: 0 5px 0 5px;
        cursor: pointer;
        transition: color .3s ease;
    }

    div.bar div.list i:hover {
        color: #ddd;
    }

    div.bar div.list i.icon-cancel:hover {
        color: #e74c3c;
    }
</style>