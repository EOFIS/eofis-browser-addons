<template>
    <div class="card box" @click="$event.currentTarget.classList.toggle('flipped')">
        <div class="face front">
            {{faces[0]}}
        </div>
        <div class="face back">
            {{faces[1]}}    
        </div>
    </div>
</template>

<script>
export default {
    name : "QuizCard",
    props: {
        faces: [String]
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
.card {
    position: relative;
    width: 240px;
    height: 300px;
    cursor: pointer;
    transition: 1s ease-in-out;
    transform-style: preserve-3d;
    border: 1px solid;

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
        transition: 1s ease-in-out;
        background: white;

        &.back {
            transform: rotateY(0.5turn);
        }
    }
}
</style>
