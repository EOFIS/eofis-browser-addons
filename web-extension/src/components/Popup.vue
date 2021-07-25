<template>
	<div>
		<button @click="showTodayQuiz" title="Do a quiz of all questions due today">Today's Quiz!</button>
		<button @click="openStandalone" style="float:right" title="Click to go to the EOFIS online app">Open in Tab</button>
		<div>
			<h3 @click="toggleExpand(0)">:starburst: Recently Added</h3>
			<ul v-if="expanded[0]">
				<li>First note field, whatever ...</li>
				<li>First note field, whatever ...</li>
				<li>First note field, whatever ...</li>
				<li>First note field, whatever ...</li>
			</ul>
		</div>
		<div>
			<h3 @click="toggleExpand(1)">:heart: Favourites</h3>
			1{{this.expanded}}
			2{{this.expanded[1]}}
			3{{expanded}}
			4{{expanded[1]}}
			<br/> {{searchTag}}
			<ul v-if="this.expanded[1]">
				<li>First note field, whatever ...</li>
				<li>First note field, whatever ...</li>
				<li>First note field, whatever ...</li>
				<li>First note field, whatever ...</li>
			</ul>
		</div>
		<div>
			<div>
				<input id="searchByTag" type="text" list="allTags" name="searchByTag" @keyup="validateSearchTag" title="Search notes by tag name" v-model="searchTag">
				</input>
				<ul v-if="expanded[2]">
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
							expanded: [false, false, false]
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
							this.expanded[index] = true;
							for (var e in this.expanded) {
									console.log(`${index}|${this.expanded[e]}|${e}`);
								}
						}
				}
		};
</script>
