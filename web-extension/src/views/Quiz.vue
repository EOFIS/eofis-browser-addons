<template>
    <div class="quiz">
        <div v-for="(note, note_idx) in notes" :key="note._id.$oid">
            <div class="quiz-header">
                {{note_idx+1}}/{{notes.length}}
            </div>
            <div class="quiz-body">
                {{note.fields[0]}}
                <QuizCard :faces="note.fields"/>
            </div>
            <footer class="quiz-footer">
                FOOTER
            </footer>
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
                {"_id":{"$oid":"60f5e427eeea87c36ab10be4"},"_partition":"userid=60d8213840f61809edbe87ca","fields":["However, only Germany, Canada, {{0:Japan}} and {{1:Italy}} announced {{2:new domestic climate funding programmes}}.","Japan, Italy, new domestic climate funding programmes"],"tags":["A","BG","Another Tag","Auto-generated"],"source":{"title":"Bags of sausages","type":"TEST","url":""}},
                {"_id":{"$oid":"60defac8a943042a0681556c"},"_partition":"userid=60d8213840f61809edbe87ca","fields":["Test front","Back of the test"],"source":{"type":"TEST","title":"Added during initial testing"},"tags":["FIRST tag", "Second tag"], "favourite": true},
                {"_id":{"$oid":"60f5e427eeea87c36ab10be5"},"_partition":"userid=60d8213840f61809edbe87ca","fields":["The hope is that the Cop26 {{0:climate}} summit in Glasgow in {{1:November}} will flesh out {{2:more solid commitments}}.","climate, November, more solid commitments"],"tags":["A","BG","Another Tag","Auto-generated"],"source":{"title":"Bags of sausages","type":"TEST","url":""}}
            ]
        }
    }
}
</script>
