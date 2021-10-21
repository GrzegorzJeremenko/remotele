<template>
    <div class="aboutGroup">
        <div id="about">
            <div id="emoji">
                {{ group.emoji }}
            </div>
            <div id="information">
                <h1>Klasa {{ group.name }}</h1>
                <h2 :title="group.subject">{{ subjectName }}</h2>
            </div>
        </div>  
    </div>
</template>

<script>
    export default {
        name: 'AboutGroup',
        props: {
            group: Object
        },
        computed: {
            subjectName: function() {
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
    div.aboutGroup {
        width: 45%;
        background-color: #fff;
        border-radius: 10px;
    }

    div.aboutGroup div#about {
        display: flex;
        flex-direction: row;
    }

    div.aboutGroup div#about div#emoji {
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        margin: 10px;
        background-color: #eee;
        border-radius: 10px;
        font-size: 36px;
        opacity: .9;
    }

    div.aboutGroup div#about div#information {
        display: flex;
        flex-direction: column;
        margin: 10px;
        justify-content: center;
    }

    div.aboutGroup div#about div#information h1 {
        font-size: 20px;
        margin: 0 0 5px 0;
    }

    div.aboutGroup div#about div#information h2 {
        color: #444;
    }
</style>