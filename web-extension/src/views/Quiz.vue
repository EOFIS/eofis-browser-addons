<template>
    <div class="quiz">
        <span class="remaining">{{cards.length-wrong.length-right.length}}</span> | <span class="wrong">{{wrong.length}}</span> | <span class="right">{{right.length}}</span>
        <div class="card-container" v-if="!finished">
            <span class="remaining">{{cards.length-wrong.length-right.length}}</span> | <span class="wrong">{{wrong.length}}</span> | <span class="right">{{right.length}}</span>

            <QuizCard v-for="(card, card_idx) in cards" 
                      :key="card_idx" 
                      class="fade" 
                      :class="{active: cardIdx == card_idx}" 
                      :card="card" 
                      @reviewNo="reviewCard(0)" @reviewYes="reviewCard(1)"/>
            <!--
            <div v-for="(card, card_idx) in cards" :key="card_idx" class="fade" :class="{active: cardIdx == card_idx}">
            -->
                <!--
                    <div class="quiz-body">
                    <QuizCard :card="card" @flipped="flip" :reviewNo="reviewCard(0)" :reviewYes="reviewCard(1)"/>
                    </div>
                    <footer class="quiz-footer">
                    <div class="review-buttons" :class="{active: flipped}">
                    <a class="no" @click="reviewCard(0)">NO IDEA</a>
                    <a class="yes" @click="reviewCard(1)">I KNEW IT!</a>
                    </div>
                    </footer>
                -->
                <!--
                <div class="tag-container">
                    <TagList :tags="card.tags" :source="card.source"/>
                </div>
            </div>
                -->
        </div>
        <div class="review-container" v-if="finished">
            This quiz session: Correct: {{cards.length-wrong.length}}/{{cards.length}} ({{100*(1-wrong.length/cards.length)}} %)
        </div>
    </div>
</template>

<script>
import QuizCard from "@/components/QuizCard.vue";
import NoteDataService from "@/services/NoteDataService";
import CardDataService from "@/services/CardDataService";

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
            } else if (1 == reviewScore) {
                this.right.push(this.cards[this.cardIdx]);
            }
            this.nextCard();
        },
        nextCard() {
            this.cardIdx += 1;
            if (this.cardIdx >= this.cards.length) {
                this.finished = true;
            }
        },
        retrieveNotes() {
            NoteDataService.getAll()
                .then(response => {
                    this.notes = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        retrieveLowestRecallCards(amount) {
            //this.cards = CardDataService.getLowestRecall(amount);
            CardDataService.getLowestRecall(amount)
                .then(response => {
                    this.cards = response;
                });
            /*
            this.cards = CardDataService.getLowestRecall(amount)
                .then(response => {
                    this.cards = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
             */
        }
    },
    /*
    computed: {
        cards() {
            return (this.notes.map((note) => 'cards' in note ? note.cards : [])).flat(1).filter( Object );
        }
    },
     */
    mounted () {
        //this.retrieveNotes();
        this.retrieveLowestRecallCards(20);
    },
    data () {
        return {
            cardIdx : 0,
            // TODO: below relies on $emit'ted event, could be dodgy. Find better mechanism
            finished : false,
            wrong : [], // To store all the cards that were guessed wrong
            right : [], // " right
            notes : [],
            cards : []
        }
    }
}
</script>

<style scoped lang="scss">
.quiz {
    width: 30rem;
    margin: auto;
    height: fit-content;
    background-color: #eee;
    box-shadow: inset 0 0 4rem 2rem white;
}
.tag-container {
    margin: 8px;
    width: fit-content;
}
.review-buttons {
    padding: 0 8px 0 8px;
    width: 100%;
    height: auto;
    //background-color: rgba(0,0,0,0.8);
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

    //color: black;
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

.right, .wrong, .remaining {
    font-weight: bold;
}
.right {
    color: green;
}
.wrong {
    color: red;
}
.remaining {
    color: blue;
}
</style>
