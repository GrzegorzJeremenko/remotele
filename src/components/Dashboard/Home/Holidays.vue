<template>
    <div class="holidays">
        <div id="top">
            <h1>Najbliższe święta</h1>
            <p>📅</p>
        </div>
        <ul>
            <li
                v-for="(holiday, index) in holidays"
                :key="index">
                <h1>{{ holiday.name }}</h1>
                <p>~ {{ getDate(holiday.date) }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import Holidays from 'date-holidays'

    export default {
        name: 'Holidays',
        beforeMount: function() {
            this.holidays.init('PL')

            let dateNow = new Date()

            this.holidays = this.holidays.getHolidays(dateNow.getFullYear())

            this.holidays = this.holidays.filter(function(holiday) {
                let holidayDate = new Date(holiday.date)
                let dateNow = new Date()

                return holidayDate.getMonth() === dateNow.getMonth() || holidayDate.getMonth() === (dateNow.getMonth() + 1)
            })
        },
        methods: {
            getDate: function(date) {
                date = new Date(date)

                return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
            }
        },
        data() {
            return {
                holidays: new Holidays()
            }
        }
    }
</script>

<style scoped>
    div.holidays {
        padding: 15px;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        margin: 20px 0 0 20px;
        align-items: center;
    }

    div.holidays div#top {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    div.holidays div#top h1 {
        font-size: 22px;
        font-weight: bold;
        margin: 0 0 0 10px;
    }

    div.holidays div#top p {
        border-radius: 40px;
        font-size: 22px;
        padding: 10px;
        background-color: #eee;
    }

    div.holidays ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 10px 0 0 0;
    }

    div.holidays ul li {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 5px 10px 0 0;
    }

    div.holidays ul li h1 {
        font-size: 18px;
        margin: 0 0 0 10px;
    }

    div.holidays ul li p {
        font-size: 16px;
        color: #666;
        margin: 0 0 0 5px;
        text-decoration: italic;
    }
</style>