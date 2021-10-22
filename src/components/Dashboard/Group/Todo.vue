<template>
    <div class="todo">
        <h1>Notatki:</h1>
        <form action="javascript: void(0);">
            <label for="content">Treść notatki:</label>
            <div>
                <input
                    type="text"
                    id="content"
                    placeholder="Wpisz treść notatkę"
                    ref="textTodo">

                <input
                    type="submit"
                    value="Dodaj"
                    v-on:click="addTodo()">
            </div>
        </form>
        <p v-if="group.todos.length === 0">Brak notatek.</p>
        <ul v-else>
            <li
                v-for="(todo, index) in group.todos"
                :key="index">
                <p>{{ todo.text }}</p>
                <i
                    class="icon-cancel"
                    v-on:click="deleteTodo(todo._id)"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    import { addTodo, deleteTodo } from '@/services/groups.js'

    import NProgress from 'nprogress'

    export default {
        name: 'Todo',
        props: {
            group: Object
        },
        methods: {
            addTodo: function() {
                let textTodo = this.$refs.textTodo.value;

                NProgress.start()
                NProgress.set(0.1)

                addTodo(textTodo, this.group._id)
                .then((res) => {
                    this.group.todos.push({
                        _id: res.data.todo._id,
                        text: textTodo
                    })

                    this.$refs.textTodo.value = ''
                })
                .catch(() => {
                    this.$toast.error("Ups... Coś poszło nie tak.\r\nSpróbuj ponownie później")
                })
                .finally(() => setTimeout(() => NProgress.done(), 500))
            },
            deleteTodo: function(todo_id) {
                NProgress.start()
                NProgress.set(0.1)

                deleteTodo(todo_id, this.group._id)
                .then(() => {
                    this.group.todos = this.group.todos.filter(function(todo) {
                    return todo._id !== todo_id
                })
                })
                .catch(() => {
                    this.$toast.error("Ups... Coś poszło nie tak.\r\nSpróbuj ponownie później")
                })
                .finally(() => setTimeout(() => NProgress.done(), 500))
            }
        }
    }
</script>

<style scoped>
    div.todo {
        width: 100%;
    }

    div.todo h1 {
        margin: 10px 0 10px 10px;
    }

    div.todo p {
        font-size: 14px;
        padding: 10px 12px 0 12px;
        text-align: justify;
    }

    div.todo ul {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    div.todo ul li {
        width: calc(100% - 60px);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 10px 10px 0 10px;
        background-color: #eee;
        border-radius: 10px;
        padding: 10px 15px 10px 15px;
    }

    div.todo ul li p {
        font-size: 14px;
        padding: 0;
        text-align: justify;
    }

    div.todo ul li i {
        transition: color .3s ease;
        font-size: 18px;
        cursor: pointer;
    }

    div.todo ul li i:hover {
        color: #e74c3c;
    }

    div.todo form {
        display: flex;
        flex-direction: column;
        margin: 0 0 20px 0;
    }

    div.todo form label {
        font-size: 12px;
        color: #000;
        margin: 10px 0 10px 1vw;
    }

    div.todo form div {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    div.todo form input[type="text"] {
        width: 60%;
        font-family: 'Montserrat', sans-serif;
        border: none;
        padding: 0px 15px 5px 34px;
        background-color: #fff;
        display: block;
        outline: none;
        box-sizing: border-box;
        border-bottom: 2px solid #ccc;
        font-size: 14px;
        background-repeat: no-repeat;
        background-size: 16px 16px;
        background-position: 8px 5px;
        transition: border .3s ease;
    }

    div.todo form input[type="text"]:focus {
        border-bottom: 2px solid #2ecc71;
    }

    div.todo form input[type="text"]
    {
        background-image: url("~@/assets/Dashboard/pencil.svg");
    }

    div.todo form input[type=submit] {
        width: 30%;
        height: 30px;
        font-family: 'Montserrat', sans-serif;
        background-image: linear-gradient(to right, #1abc9c, #2ecc71, #1abc9c);
        background-size: 200% 1px; 
        box-sizing: border-box;
        color: #fff;
        border: none;
        cursor: pointer;
        border-radius: 20px;
        font-size: 14px;
        margin: 0;
        font-weight: bold;
        transition: background-position .3s ease-out;  
    }

    div.todo form input[type=submit]:hover {
        background-position: 100%;  
    }
</style>