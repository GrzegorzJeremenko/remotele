<template>
    <div class="toHoliday">
        <div id="days">
            <h1>{{ daysToHoliday }}</h1>
            <p>Dni do wakacji</p>
        </div>
        <div id="emoji">
            <p>🌴</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ToHoliday',
        computed: {
            daysToHoliday: function() {
                return Math.floor((this.lastFridayOfMonth(2022, 5) - new Date()) / 1000 / 60 / 60 / 24)
            }
        },
        methods: {
            lastFridayOfMonth: function(year, month) {
                let lastDay = new Date(year, month+1, 0);
                if(lastDay.getDay() < 5) {
                lastDay.setDate(lastDay.getDate() - 7);
                }
                lastDay.setDate(lastDay.getDate() - (lastDay.getDay() -5));
                return lastDay;
            }
        }
    }
</script>

<style scoped>
    div.toHoliday {
        width: 180px;
        height: 140px;
        padding: 10px;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        margin: 20px 0 0 0;
    }

    div.toHoliday div#days {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }

    div.toHoliday div#days h1 {
        font-size: 38px;
        font-weight: bold;
        margin: 0 0 10px 0;
    }

    div.toHoliday div#days p {
        margin: 0 0 20px 0;
    }

    div.toHoliday div#emoji {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center; 
    }

    div.toHoliday div#emoji p {
        margin: 10px 0 0 0;
        border-radius: 40px;
        font-size: 30px;
        padding: 7px;
        background-color: #eee;
    }
</style>