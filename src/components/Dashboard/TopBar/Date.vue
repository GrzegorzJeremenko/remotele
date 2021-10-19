<template>
    <div class="date">
        {{ time }}
    </div>
</template>

<script>
export default {
    name: 'Date',
    data() {
        return {
            time: '',
            clockInterval: Object
        }
    },
    methods: {
        refClock: function() {
            let date = new Date()

            this.time = `${ date.getDate() } ${ this.getMounthName(date) } ${ date.getFullYear() }, ${ this.getDayName(date) }`
        },
        getMounthName: function(date) {
            switch(date.getMonth()) {
                case 0:
                    return 'Sty'

                case 1:
                    return 'Lut'

                case 2:
                    return 'Mar'
                    
                case 3:
                    return 'Kwi'
                    
                case 4:
                    return 'Maj'
                    
                case 5:
                    return 'Cze'
                    
                case 6:
                    return 'Lip'
                    
                case 7:
                    return 'Sie'
                    
                case 8:
                    return 'Wrz'
                    
                case 9:
                    return 'Paź'
                    
                case 10:
                    return 'Lis'
                    
                case 11:
                    return 'Gru' 
            }
        },
        getDayName: function(date) {
            switch(date.getDay()) {
                case 0:
                    return 'Niedziela'

                case 1:
                    return 'Poniedziałek'

                case 2:
                    return 'Wtorek'

                case 3:
                    return 'Środa'

                case 4:
                    return 'Czwartek'

                case 5:
                    return 'Piątek'

                case 6:
                    return 'Sobota'
            }
        }
    },
    mounted: function() {
        this.refClock()
        this.clockInterval = setInterval(this.refClock, 1000 * 60);
    },
    destroyed: function() {
        clearInterval(this.clockInterval);
    }
}
</script>