<template>
	<div class="box">
		<form @submit.prevent="submit">
			<fieldset>
				<legend>Fields:</legend>
				<div v-for="(field, iField) in note.fields" :key="iField">
					<label for="iField">Field {{iField}}:</label>
					<input type="text" name="iField" v-model="form.fields[iField]"/>
				</div>
			</fieldset>
			<TagList :tags="this.note.tags" :editable="true"/>
			<div>
				<button type="submit">Save</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import TagList from "@/components/TagList.vue";
	export default {
			name: "EditNote",
			props: {
					note: Object
				},
			components: {
					TagList
				},
			computed: {
					form() {
							return {
									fields: this.note.fields,
									tags: this.note.tags
								}
						}
				},
			methods: {
					...mapActions([ "updateNote" ]),
					async submit() {
							try {
									console.log(`UPDATING NOTE ${this.form}`);
									if (document.activeElement.tagName === 'INPUT') {
										console.log(`An input field is focused, not submitting form.`);
									} else {

										await this.updateNote(this.form);
									}
								} catch (error) {
										throw "Could not create note right now. Please try again later.";
									}
						}
				}
		};
</script>
