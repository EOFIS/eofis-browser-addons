<template>
    <div class="quiz-card-container">
        <div class="box quiz-card" :class="{flipped: flipped}" @click="flip">
            <div class="face front">
                {{card.fields[0]}}
            </div>
            <div class="face back">
                {{card.fields[1]}}
            </div>
        </div>
        <div class="face-dots">
            <span class="dot" :class="{active: !flipped}" @click="flipped=false"></span>
            <span class="dot" :class="{active:  flipped}" @click="flipped=true "></span>
        </div>
        <footer class="quiz-footer">
            <div class="review-buttons" :class="{active: flipped}">
                <a class="no"  @click="$emit('reviewNo')" ><Icon icon="times" title="I had no idea that was the answer"/></a>
                <a class="yes" @click="$emit('reviewYes')"><Icon icon="check" title="I knew it!"/></a>
            </div>
            <div class="tag-container">
                <TagList :tags="card.tags" :source="card.source"/>
            </div>
        </footer>
    </div>
</template>

<script>
import TagList from "@/components/TagList.vue";
import Icon from "@/components/Icon.vue";
export default {
    name : "QuizCard",
    components: {
        TagList, Icon
    },
    props: {
        card: Object
    },
    emits: [ 'reviewYes', 'reviewNo'],
    data() {
        return {
            flipped: false
        }
    },
    methods: {
        flip() {
            this.flipped = !this.flipped
        }
    }
}
</script>

<style lang="scss">
.quiz-card-container {
    display: none;
    &.active {
        display: block;
    }
}

.face-dots {
    &>* {
        margin: 0 4px;
    }

    &>.dot {
        height: 12px;
        width : 12px;
        border-radius: 50%;
        display: inline-block;
        cursor: pointer;

        background-color: #000;
        transition: 0.2s ease;
        opacity: 0.3;
        &:hover {
            opacity: 0.4;
        }
        &.active {
            opacity: 0.8;
            &:hover {
                opacity: 1;
            }
        }
    }
}

// Thanks to https://3dtransforms.desandro.com/card-flip for some of this
.quiz-card {
    position: relative;
    width: 100%;
    min-height: 8rem;
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
        border-radius: inherit;

        &.back {
            transform: rotateY(0.5turn);
        }
    }

    &.box {
        margin: 0px;
        border-radius: 12px;
    }
}

.review-buttons {
    pointer-events: none;
    &.active {
        pointer-events: auto;
        a {
            opacity: 0.6;
        }
    }

    a {
        display: inline-block;
        font-size: 24px;
        opacity: 0.3;
        transition: 0.2s ease;
        &:hover {
            opacity: 1;
        }
    }

    .yes {
        color: #257953;
    }
    .no {
        color: #e41212;
    }
}
</style>
