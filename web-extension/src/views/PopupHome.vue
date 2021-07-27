<template>
    <div class="popup-home">
        <div>
            <router-link to="/quiz" title="Do a quiz of all questions due today">Today's Quiz!</router-link></li>
            <button @click="openStandalone" style="float:right" title="Click to go to the EOFIS online app">Open in Tab</button>
        </div>
        <div>
            <h3 @click="toggleExpand(1)">
                <Icon icon="bullseye" text="Recently Added"/>
            </h3>
            <ul v-if="expanded==1">
                <li>First note field, whatever ...</li>
                <li>First note field, whatever ...</li>
                <li>First note field, whatever ...</li>
                <li>First note field, whatever ...</li>
            </ul>
        </div>
        <div class="note-list">
            <h3 @click="toggleExpand(2)">
                <Icon icon="heart" text="Favourites" color="red"/>
            </h3>
            <ul v-if="this.expanded==2" class="note-list">
                <NoteLI v-for="note in notes" :note="note" :key="note._id.$oid"/>
            </ul>
        </div>
        <div>
            <div>
                <!--<input id="searchByTag" type="text" list="allTags" name="searchByTag" @keyup="validateSearchTag" title="Search notes by tag name" v-model="searchTag"/>-->
                <ul v-if="expanded==3">
                    <li>First result</li>
                    <li>First result</li>
                    <li>First result</li>
                    <li>First result</li>
                </ul>
                <datalist id="allTags">
                    <option value="TEST"/>
                    <option value="Politics"/>
                    <option value="Philosophy"/>
                    <option value="Cows"/>
                    <option value="Lesser spotted donkey"/>
                    <option value="G7"/>
                </datalist>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.note-list {
    h3 {
        padding-left: 8px;
        border-style: solid;
        border-color: rgba(0,0,0,0.1); 
        border-width: 0 0 1px 0;
    }
    ul {
        list-style: none;
        li {
            padding-left: 12px;
        }
    }
}
</style>

<script>
import NoteLI from "@/components/NoteLI.vue";
export default {
    name: "PopupHome",
    components: {
        NoteLI
    },
    data() {
        return {
            searchTag: "",
            // TODO: dynamically load notes
            notes: [
                {"_id":{"$oid":"60f5e427eeea87c36ab10be4"},"_partition":"userid=60d8213840f61809edbe87ca","fields":["However, only Germany, Canada, {{0:Japan}} and {{1:Italy}} announced {{2:new domestic climate funding programmes}}.","Japan, Italy, new domestic climate funding programmes"],"tags":["A","BG","Another Tag","Auto-generated"],"source":{"title":"Bags of sausages","type":"TEST","url":""}},
                {"_id":{"$oid":"60defac8a943042a0681556c"},"_partition":"userid=60d8213840f61809edbe87ca","fields":["Test front","Back of the test"],"source":{"type":"TEST","title":"Added during initial testing"},"tags":["FIRST tag", "Second tag"], "favourite": true},
                {"_id":{"$oid":"60f5e427eeea87c36ab10be5"},"_partition":"userid=60d8213840f61809edbe87ca","fields":["The hope is that the Cop26 {{0:climate}} summit in Glasgow in {{1:November}} will flesh out {{2:more solid commitments}}.","climate, November, more solid commitments"],"tags":["A","BG","Another Tag","Auto-generated"],"source":{"title":"Bags of sausages","type":"TEST","url":""}}
            ],
            expanded: 2 // Index of expanded item; 0: no item expanded
        }
    },
    methods: {
        openStandalone() {
            console.log("Opening EOFIS tab");
            browser.tabs.create({
                "url": "/index.html"
            });
        },
        validateSearchTag(e) {
            if (e.keyCode === 13) {
                alert(`Add tag ${this.searchTag} to search`);
            }
        },
        toggleExpand(index) {
            if (this.expanded == index) {
                this.expanded = 0;
            } else {
                this.expanded = index;
            }
        }
    }
};
</script>
