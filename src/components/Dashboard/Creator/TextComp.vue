<template>
    <div class="textComp">
        <p
            :style="styleText">
            {{ content }}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'TextComp',
        props: {
            config: Object,
            content: String
        },
        data() {
            return {
                styleText: {
                    fontSize: '16px',
                    lineHeight: '20px',
                    textAlign: 'justify',
                    color: '#000',
                    fontWeight: 'normal'
                }
            }
        },
        beforeMount: function() {
            if(this.config !== undefined) {
                if(this.config.font.size !== undefined) {
                    this.styleText.fontSize = this.config.font.size + 'px'
                    this.styleText.lineHeight = Math.floor(this.config.font.size * 1.3) + 'px'
                }

                if(this.config.align !== undefined) 
                    this.styleText.textAlign = this.config.align

                if(this.config.font.color !== undefined) 
                    this.styleText.color = this.config.font.color

                if(this.config.font.bold !== undefined) 
                    this.styleText.fontWeight = this.config.font.bold ? 'bold' : 'normal'
            }
        }
    }
</script>

<style scoped>
    div.textComp p {
        font-size: 16px;
        line-height: 20px;
        text-align: justify;
    }
</style>