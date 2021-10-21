<template>
    <div class="aboutGroup">
        <div id="about">
            <div id="emoji">
                {{ group.emoji }}
            </div>
            <div id="information">
                <h1>Klasa {{ group.name }}</h1>
                <h2 :title="group.subject">{{ shortString(group.subject ,20) }}</h2>
            </div>
        </div>
        <div id="userList">
            <h1>Lista członków:</h1>
            <ul>
                <li
                    v-for="(user, index) in group.users"
                    :key="index">
                    <i :class="user.groupRole == 'creator' ? 'icon-user-secret' : 'icon-user'"></i>
                    <p>{{ shortString(user.fullname, 14) }}</p>
                    <i :class="user.groupRole == 'creator' ? '' : 'icon-cancel'"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AboutGroup',
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
    div.aboutGroup {
        width: 45%;
        display: flex;
        flex-direction: column;
    }

    div.aboutGroup div#about {
        width: 100%;
        height: 100px;
        background-color: #fff;
        border-radius: 10px;
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

    div.aboutGroup div#userList {
        width: calc(100% - 20px);
        margin: 20px 0 0 0;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        padding: 10px 10px 20px 10px;
    }

    div.aboutGroup div#userList h1 {
        margin: 10px 0 10px 10px;
    }
    
    div.aboutGroup div#userList ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    div.aboutGroup div#userList ul li {
        width: calc(50% - 40px);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 10px 10px 0 10px;
        background-color: #eee;
        border-radius: 10px;
        padding: 10px;
    }

    div.aboutGroup div#userList ul li i {
        font-size: 18px;
        min-width: 25px;
    }

    div.aboutGroup div#userList ul li p {
        font-size: 14px;
    }

    div.aboutGroup div#userList ul li i.icon-cancel {
        transition: color .3s ease;
        cursor: pointer;
    }

    div.aboutGroup div#userList ul li i.icon-cancel:hover {
        color: #e74c3c;
    }
</style>