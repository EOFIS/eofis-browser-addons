<template>
    <div class="quiz-card box" :class="{flipped: flipped}" @click="$emit('flipped');flipped==true? flipped=false:flipped=true">
        <div class="face front">
            {{card.fields[0]}}
        </div>
        <div class="face back">
            {{card.fields[1]}}
        </div>
    </div>
</template>

<script>
export default {
    name : "QuizCard",
    props: {
        card: Object
    },
    emits: ['flipped'],
    data() {
        return {
            flipped: false
        }
    },
    methods: {
        flip: function(elem) {
            if (elem.classList.contains("flipped")){
                elem.classList.remove("flipped");
            }else {
                elem.classList.add('flipped');
            }
        }
    }
}
</script>

<style lang="scss">
// Thanks to https://3dtransforms.desandro.com/card-flip
.quiz-card {
    position: relative;
    //width: 240px;
    width: 100%;
    min-height: 4em;
    cursor: pointer;
    transition: 0.5s ease-in-out;
    transform-style: preserve-3d;

    &.flipped {
        transform: rotateY(0.5turn);
    }

    &>.face {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        background: white;

        &.back {
            transform: rotateY(0.5turn);
        }
    }
}
</style>
