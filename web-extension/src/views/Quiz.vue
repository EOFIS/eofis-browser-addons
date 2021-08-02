<template>
    <div class="quiz">
        <div class="card-container" v-if="!finished">
            <div v-for="(card, card_idx) in cards" :key="card.id" class="card fade" :class="{active: cardIdx == card_idx}">
                <div class="quiz-header">
                    {{card_idx+1}}/{{cards.length}}
                </div>
                <div class="quiz-body">
                    <QuizCard :card="card" @flipped="flip"/>
                </div>
                <footer class="quiz-footer">
                    <div class="review-buttons" :class="{active: flipped}">
                        <a class="no" @click="reviewCard(0)">NO IDEA</a>
                        <a class="yes" @click="reviewCard(1)">I KNEW IT!</a>
                    </div>
                </footer>
            </div>
        </div>
        <div class="review-container" v-if="finished">
            This quiz session: Correct: {{cards.length-wrong.length}}/{{cards.length}} ({{100*(1-wrong.length/cards.length)}} %)
        </div>
    </div>
</template>

<style scoped lang="scss">
.quiz {
    width: 100%;
    height: 100%;
}
.card {
    display: none;
    &.active {
        display: block;
    }
}
.review-buttons {
    padding: 0 8px 0 8px;
    width: 100%;
    height: auto;
    background-color: rgba(0,0,0,0.8);
    transition: 0.4s ease;
    & > .no {
        float: left;
    }
    & > .yes {
        float: right;
    }
    display: inline-block;

    pointer-events: none;
    opacity: 0;
    &.active {
        pointer-events: auto;
        opacity: 1;
    }
}
.review {
    font-weight: bold;
    user-select: none;
    border-radius: none;
    transition: 0.6s ease;
    cursor: pointer;
    padding: 4px;

    color: white;
}
.no {
    @extend .review;
    border-radius: 4px 0 0 4px;
    &:hover {
        color: red;
    }
}
.yes {
    @extend .review;
    border-radius: 0 4px 4px 0;
    &:hover {
        color: green;
    }
}
.fade {
    animation-name: fade;
    animation-duration: 1s;
}
@keyframes fade {
    from { opacity: 0.4 }
    to   { opacity: 1   }
}
</style>

<script>
import QuizCard from "@/components/QuizCard.vue";
export default {
    name: "Quiz",
    components: {
        QuizCard
    },
    methods : {
        reviewCard(reviewScore) {
            // reviewScore ∈ {0, 1}
            console.log(`REVIEWED CARD ${this.cardIdx} ${reviewScore}`);
            if (0 == reviewScore) {
                this.wrong.push(this.cards[this.cardIdx]);
            }
            this.nextCard();
        },
        nextCard() {
            this.cardIdx += 1;
            if (this.cardIdx >= this.cards.length) {
                this.finished = true;
            }
            this.flipped = false;
        },
        flip() {
            this.flipped = !this.flipped;
        }
    },
    computed: {
        cards() {
            return (this.notes.map((note) => note.cards)).flat(1);
        }
    },
    data () {
        return {
            cardIdx : 0,
            // TODO: below relies on $emit'ted event, could be dodgy. Find better mechanism
            flipped : false, // is the current card flipped. 
            finished : false,
            wrong : [], // To store all the cards that were guessed wrong
            // TODO: dynamically load notes
            notes: [
                {
                    "_id":{"$oid":"60f5e427eeea87c36ab10be4"},
                    "_partition":"userid=60d8213840f61809edbe87ca",
                    "fields": [
                        "However, only Germany, Canada, {{0:Japan}} and {{1:Italy}} announced {{2:new domestic climate funding programmes}}.",
                        "Japan, Italy, new domestic climate funding programmes"
                    ],
                    "cards": [
                        {
                            "fields": [
                                "However, only Germany, Canada, XXXXX and Italy announced new domestic climate funding programmes.",
                                "Japan"
                            ],
                            "recall_model": [4, 4, 24],
                            "last_reviewed": "2021-07-27T17:15:58.698Z"
                        },
                        {
                            "fields": [
                                "However, only Germany, Canada, Japan and XXXXX announced new domestic climate funding programmes.",
                                "Italy"
                            ],
                            "recall_model": [4, 4, 24],
                            "last_reviewed": "2021-07-23T08:00:00.000Z"
                        },
                        {
                            "fields": [
                                "However, only Germany, Canada, Japan and Italy announced XXX XXXXXXXXX XXXXXXX XXXXXXX XXXXXXXXXX.",
                                "new domestic climate funding programmes"
                            ],
                            "favourite": true,
                            "recall_model": [4, 4, 24],
                            "last_reviewed": "2021-07-26T11:00:00.000Z"
                        },
                    ],
                    "template": "CLOZE",
                    "tags":[
                        "A","BG","Another Tag","Auto-generated"
                    ],"source":{
                        "title":"Bags of sausages",
                        "type":"TEST",
                        "url":""
                    }
                },
                {
                    "_id":{"$oid":"60defac8a943042a0681556c"},
                    "_partition":"userid=60d8213840f61809edbe87ca",
                    "fields":["Test front","Back of the test"],
                    "source":{"type":"TEST","title":"Added during initial testing"},
                    "tags":["FIRST tag", "Second tag"],
                    "cards": [
                        {
                            "fields":["Test front","Back of the test"],
                            "recall_model": (4, 4, 24),
                            "last_reviewed": "2021-07-27T17:15:58.698Z"
                        }
                    ]},
                {
                    "_id":{"$oid":"60f5e427eeea87c36ab10be5"},
                    "_partition":"userid=60d8213840f61809edbe87ca",
                    "fields":["The hope is that the Cop26 {{0:climate}} summit in Glasgow in {{1:November}} will flesh out {{2:more solid commitments}}.","climate, November, more solid commitments"],
                    "tags":["A","BG","Another Tag","Auto-generated"],
                    "source":{"title":"Bags of sausages","type":"TEST","url":""},
                    "cards": [
                        {
                            "fields":[
                                "The hope is that the Cop26 XXXXXXX summit in Glasgow in November will flesh out more solid commitments.",
                                "climate"
                            ],
                            "recall_model": [4, 4, 24],
                            "last_reviewed": "2021-07-27T11:00:00.000Z"
                        },
                        {
                            "fields":[
                                "The hope is that the Cop26 climate summit in Glasgow in XXXXXXXX will flesh out more solid commitments.",
                                "November"
                            ],
                            "recall_model": [4, 4, 24],
                            "last_reviewed": "2021-07-26T23:00:00.000Z"
                        },
                        {
                            "fields":[
                                "The hope is that the Cop26 climate summit in Glasgow in November will flesh out XXXX XXXXX XXXXXXXXXXX.",
                                "more solid commitments"
                            ],
                            "recall_model": [4, 4, 24],
                            "last_reviewed": "2021-07-26T11:00:00.000Z"
                        },
                    ]}
            ]
        }
    }
}
</script>
