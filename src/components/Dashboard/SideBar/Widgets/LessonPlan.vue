<template>
    <div class="lessonPlan">
        <h1>Plan zajęć</h1>
        <div id="plan">
            <div id="timeline">
                <div
                    id="line"
                    ref="line"></div>
                <div
                    class="item"
                    v-for="(hour, index) in hours"
                    :key="index">
                    <p>{{ hour.time }}</p>
                </div>
            </div>
            <div id="items">
                <div 
                    class="item"
                    v-for="(item, index) in plan"
                    :style="{ 
                        height: (countHeight(item.timeStart, item.timeEnd) + 'vw'),
                        marginTop: (countMargin(item.timeStart, plan[index > 0 ? index - 1 : index].timeEnd) + 'vw'),
                        backgroundColor: countColor(item.timeStart, item.timeEnd, false)
                        }"
                    :key="index">
                    <div
                        class="time"
                        :style="{ backgroundColor: countColor(item.timeStart, item.timeEnd, true) }">
                        <p>{{ item.timeStart }}</p>
                        <p>{{ item.timeEnd.split(':')[0] >= 24 ? '0' + item.timeEnd.split(':')[0] - 24 + ':' + item.timeEnd.split(':')[1] : item.timeEnd }}</p>
                    </div>
                    <p>{{ item.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LessonPlan',
        props: {
            user: Object
        },
        data() {
            return {
                plan: [
                    {
                        timeStart: '07:45',
                        timeEnd: '9:20',
                        name: 'Klasa 3e'
                    },
                    {
                        timeStart: '09:25',
                        timeEnd: '10:10',
                        name: 'Klasa 1a'
                    },
                ],
                hours: [],
                refreshTimeline: Object,
                timelineStart: 0,
                timelineEnd: 0
            }
        },
        methods: {
            lineMove: function() {
                let date = new Date();

                if(this.timelineStart <= date.getHours() && this.timelineEnd > date.getHours()) {
                    date.setHours(date.getHours() - this.timelineStart)

                    let linePos = ( ( date.getHours() * 260 + Math.round( 130 / 30 * date.getMinutes() ) ) + 130 ) * 0.01

                    this.$refs.line.style.top = linePos + 'vw'
                    this.$refs.line.style.display = 'block'
                } else {
                    this.$refs.line.style.display = 'none'
                }
            },
            generateTimeline: function() {
                this.timelineStart = this.plan[0].timeStart.split(':')[0];
                this.timelineStart = this.timelineStart[0] == '0' ? this.timelineStart.substring(1, 2) : this.timelineStart;

                this.timelineStart = parseInt(this.timelineStart)

                this.timelineEnd = this.plan[this.plan.length - 1].timeStart.split(':')[0];
                this.timelineEnd = this.timelineEnd[0] == '0' ? this.timelineEnd.substring(1, 2) : this.timelineEnd;

                this.timelineEnd = parseInt(this.timelineEnd)

                let lastLesson = this.plan[this.plan.length - 1].timeEnd.split(':');
                let lastLessonHour = lastLesson[0][0] == '0' ? lastLesson[0].substring(1, 2) : lastLesson[0]
                let lastLessonMinute = lastLesson[1][0] == '0' ? lastLesson[1].substring(1, 2) : lastLesson[1]

                let lastLessonTime = (((lastLessonHour - this.timelineEnd) * 130) + (lastLessonMinute * (130 / 60))) * 0.01

                this.timelineEnd += lastLessonTime > Math.floor(lastLessonTime) ? Math.ceil(lastLessonTime) : lastLessonTime + 1

                let steps = (this.timelineEnd - this.timelineStart) * 2 + 1;

                for(let i = 0; i < steps; i++) {
                    if(i % 2 == 0) {
                        let hour = this.timelineStart + (i / 2)
                        if(hour >= 24)
                            hour -= 24;

                        this.hours.push({ time:  (hour < 10 ? '0' + hour : hour) + ':00'})
                    } else this.hours.push({ time: '' })
                }
            },
            countHeight: function(startTime, endTime) {
                let start = startTime.split(':')
                let startHour = start[0][0] == '0' ? start[0].substring(1, 2) : start[0]
                let startMinut = start[1][0] == '0' ? start[1].substring(1, 2) : start[1]

                let end = endTime.split(':')
                let endHour = end[0][0] == '0' ? end[0].substring(1, 2) : end[0]
                let endMinut = end[1][0] == '0' ? end[1].substring(1, 2) : end[1]

                return (((endHour - startHour) * 260) + ((endMinut - startMinut) * (130 / 30))) * 0.01
            },
            countMargin: function(startTime, endTime) {
                
                let start = startTime.split(':')
                let startHour = start[0][0] == '0' ? start[0].substring(1, 2) : start[0]
                let startMinut = start[1][0] == '0' ? start[1].substring(1, 2) : start[1]

                let end = endTime.split(':')
                let endHour = end[0][0] == '0' ? end[0].substring(1, 2) : end[0]
                let endMinut = end[1][0] == '0' ? end[1].substring(1, 2) : end[1]

                if(startHour != this.timelineStart) {
                    return (((startHour - endHour) * 260) + ((startMinut - endMinut) * (130 / 30))) * 0.01
                } else return (startMinut * (130 / 30)) * 0.01
            },
            countColor: function(startTime, endTime, time) {
                let date = new Date();

                let start = startTime.split(':')
                startTime = parseInt((start[0][0] == '0' ? start[0].substring(1, 2) : start[0]) * 100) + parseInt(start[1][0] == '0' ? start[1].substring(1, 2) : start[1])

                let end = endTime.split(':')
                endTime = parseInt((end[0][0] == '0' ? end[0].substring(1, 2) : end[0]) * 100) + parseInt(end[1][0] == '0' ? end[1].substring(1, 2) : end[1])

                let nowTime = (date.getHours() * 100) + date.getMinutes()

                if(nowTime >= startTime && nowTime <= endTime)
                    if(time)
                        return '#d35400'
                    else
                        return '#e67e22'
                else
                    if(time)
                        return '#27ae60'
                    else
                        return '#2ecc71'
            }
        },
        mounted: function() {
            this.generateTimeline()

            this.lineMove()
            this.refreshTimeline = setInterval(this.lineMove, 1000 * 60)
        },
        destroyed: function() {
            clearInterval(this.refreshTimeline)
        }
    }
</script>

<style scoped>
    div.lessonPlan {
        width: 90%;
        background-color: #eee;
        border-radius: .6vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.lessonPlan h1 {
        width: 80%;
        padding: 0 0 .5vw 0;
        font-size: 1.1vw;
        text-align: center;
        margin: 1vw 0 0 0;
        color: #444;
        border-bottom: 1px solid #ccc;
    }

    div.lessonPlan div#plan {
        display: flex;
        width: 100%;
        flex-direction: row;
        margin: .5vw 0 1vw 0;
        justify-content: space-around;
    }

    div.lessonPlan div#plan div#timeline {
        width: 20%;
    }

    div.lessonPlan div#plan div#timeline div.item {
        width: 100%;
        height: calc(1.3vw - 1px);
        border-bottom: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
    }

    div.lessonPlan div#plan div#timeline div#line {
        position: relative;
        top: 0;
        display: none;
        width: 100%;
        height: 1px;
        background-color: #e74c3c;
    }

    div.lessonPlan div#plan div#timeline div.item p {
        font-size: .7vw;
        color: #666;
    }

    div.lessonPlan div#plan div#items {
        width: 70%;
        margin: 1.3vw 0 0 0;
    }

    div.lessonPlan div#plan div#items div.item {
        background-color: #2ecc71;
        border-radius: .2vw;
        color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    div.lessonPlan div#plan div#items div.item div.time {
        width: 20%;
        height: 100%;
        background-color: #27ae60;
        border-radius: .2vw 0 0 .2vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    div.lessonPlan div#plan div#items div.item div.time p {
        font-size: .6vw;
        margin: 0;
    }

    div.lessonPlan div#plan div#items div.item p {
        font-size: .8vw;
        margin: 0 0 0 .2vw;
    }
</style>