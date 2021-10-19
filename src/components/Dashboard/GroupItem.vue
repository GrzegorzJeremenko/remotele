<template>
    <div
        class="group"
        v-on:click="navigateTo('/dashboard/classes/' + group._id)">
        <h1>{{ group.emoji }}</h1>
        <h2 v-bind:title="group.name">{{ shortName(group.name) }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'GroupItem',
        props: {
            group: Object
        },
        methods: {
            navigateTo: function(subpage) {
                if(this.$route.path != subpage) 
                this.$router.push(subpage)
            },
            shortName(name) {
                if(name.length > 8)
                    return name.charAt(0).toUpperCase() + name.slice(1).substring(0, 5) + '...'
                else
                    return name.charAt(0).toUpperCase() + name.slice(1);
            }
        }
    }
</script>

<style scoped>
    div.group {
        width: 120px;
        height: 120px;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background-color .3s ease, box-shadow .3s ease;
    }

    div.group:hover {
        -webkit-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
        -moz-box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
        box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
    }

    div.group:hover > h1 {
        opacity: 1;
    }

    div.group h1 {
        font-size: 40px;
        margin: 18px 0 0 0;
        opacity: .7;
        transition: opacity .3s ease;
    }

    div.group h2 {
        font-size: 18px;
        margin: 18px 0 0 0;
        color: #222;
    }
</style>