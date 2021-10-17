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
                        timeStart: '08:00',
                        timeEnd: '08:45',
                        name: 'Klasa 3E'
                    },
                    {
                        timeStart: '09:00',
                        timeEnd: '09:45',
                        name: 'Klasa 3E'
                    },
                    {
                        timeStart: '10:00',
                        timeEnd: '10:45',
                        name: 'Klasa 3E'
                    },
                    {
                        timeStart: '12:00',
                        timeEnd: '12:45',
                        name: 'Klasa 3E'
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

                date.setHours(date.getHours() + 4) //remove

                if(this.timelineStart <= date.getHours()) {
                    date.setHours(date.getHours() - this.timelineStart)

                    let linePos = ( ( date.getHours() * 200 + Math.round( 100 / 30 * date.getMinutes() ) ) + 100 ) * 0.01

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

                let steps = (this.timelineEnd - this.timelineStart) * 2 + 1;

                for(let i = 0; i < steps; i++) {
                    if(i % 2 == 0) {
                        let hour = this.timelineStart + (i / 2)
                        this.hours.push({ time:  (hour < 10 ? '0' + hour : hour) + ':00'})
                    } else this.hours.push({ time: '' })
                }
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
        width: 80%;
        background-color: #eee;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
    }

    div.lessonPlan h1 {
        font-size: 1.1vw;
        text-align: center;
        margin: 1vw 0 0 0;
    }

    div.lessonPlan div#plan {
        margin: 1vw 0 1vw 0;
    }

    div.lessonPlan div#plan div#timeline {
        width: 20%;
    }

    div.lessonPlan div#plan div#timeline div.item {
        width: 100%;
        height: calc(1vw - 1px);
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
</style>