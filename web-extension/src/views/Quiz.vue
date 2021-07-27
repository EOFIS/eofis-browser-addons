<template>
    <div class="quiz">
        <div v-for="(note, note_idx) in notes" :key="note._id.$oid">
            <div v-for="(card, card_idx) in note.cards" :key="card.id">
                <div class="quiz-header">
                    {{note_idx+1}}/{{notes.length}}|{{card_idx+1}}/{{note.cards.length}}
                </div>
                <div class="quiz-body">
                    <QuizCard :card="card"/>
                </div>
                <footer class="quiz-footer">
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import QuizCard from "@/components/QuizCard.vue";
export default {
    name: "Quiz",
    components: {
        QuizCard
    },
    data () {
        return {
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
                                "However, only Germany, Canada, Japan and Italy announced XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.",
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
                                "The hope is that the Cop26 climate summit in Glasgow in November will flesh out XXXXXXXXXXXXXXXXXXXXXX.",
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
