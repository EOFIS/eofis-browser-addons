<template>
    <div>
        <div>
            <button @click="showTodayQuiz" title="Do a quiz of all questions due today">Today's Quiz!</button>
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
        <div>
            <h3 @click="toggleExpand(2)">
                <Icon icon="heart" text="Favourites" color="red"/>
            </h3>
            <ul v-if="this.expanded==2">
                <li>First note field, whatever ...</li>
                <li>First note field, whatever ...</li>
                <li>First note field, whatever ...</li>
                <li>First note field, whatever ...</li>
            </ul>
        </div>
        <div>
            <div>
                <input id="searchByTag" type="text" list="allTags" name="searchByTag" @keyup="validateSearchTag" title="Search notes by tag name" v-model="searchTag"/>
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

<script>
export default {
    name: "Popup",
    data() {
        return {
            searchTag: "",
            expanded: 0 // Index of expanded item
        }
    },
    methods: {
        openStandalone() {
            console.log("Opening EOFIS tab");
            browser.tabs.create({
                "url": "/index.html"
            });
        },
        showTodayQuiz() {
            console.log("Show view to do today's quiz");
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
