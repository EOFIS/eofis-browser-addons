<template>
	<div class="field is-grouped is-grouped-multiline">
		<Tag :tag="source"/>
		<Tag v-for="tag in tags" :key="tag.id" :tag="tag"/>
	<div class="control">
		<input id="newTag" class="tag" v-if="editable===true" type="text" list="allTags" name="newTag" @keyup="validateNewTag" v-model="this.newTag"/>
	</div>
		<!--<Tag :text="this.newTag"/>-->
		<datalist id="allTags">
			<option value="TEST"/>
			<option value="Test tag"/>
			<option value="Politics"/>
			<option value="China"/>
		</datalist>
	</div>
</template>

<script>
	import Tag from "@/components/Tag.vue";
	export default {
			name: "TagList",
			props: {
					tags: [],
					source: {type: Object, required: false},
					editable: {type: Boolean, default: false}
				},
			data() {
					return {
							newTag: ""
						}
				},
			methods: {
					pushNewTag() {
							console.log(this.newTag);
						},
					validateNewTag(e) {
							if (e.keyCode === 13) {
									alert(`Add new tag ${this.newTag}`);
								}
						}
				},
			components: {
					Tag
				}
		}
</script>


