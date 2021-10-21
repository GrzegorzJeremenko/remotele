<template>
    <div class="contentGroup">
        <div id="menu">
            <div class="subopt" :class="$route.name === 'Tematy' ? 'active' : ''">
                <i class="icon-doc-text-1"></i>
                <p>Tematy</p>
            </div>
            <div class="subopt" :class="$route.name === 'Testy' ? 'active' : ''">
                <i class="icon-check-outline"></i>
                <p>Testy</p>
            </div>
        </div>
        <div id="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ContentGroup',
        props: {
            group: Object
        },
        computed: {
            shortName: function() {
                let subject = this.group.subject.charAt(0).toUpperCase() + this.group.subject.slice(1);

                if(subject.length > 20)
                    return subject.substring(0, 18) + '...'
                else
                    return subject
            }
        }
    }
</script>

<style scoped>
    div.contentGroup {
        width: 45%;
    }

    div.contentGroup div#menu {
        width: 100%;
        height: 100px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
    }

    div.contentGroup div#menu div.subopt {
        width: 80px;
        height: 80px;
        margin: 10px;
        background-color: #eee;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    div.contentGroup div#menu div.subopt i {
        font-size: 26px;
        margin: 16px 0 5px 0;
        color: #444;
    }

    div.contentGroup div#menu div.subopt p {
        font-size: 16px;
        color: #333;
    }

    div.contentGroup div#content {
        width: 100%;
        min-height: 300px;
        background-color: #fff;
        border-radius: 10px;
        margin: 20px 0 0 0;
    }
</style>