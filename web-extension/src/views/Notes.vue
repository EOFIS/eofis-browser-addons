<template>
	<div class="notes">
		<div v-if="User">
			<p>Hello {{User}}</p>
		</div>
		<div>
			<form @submit.prevent="submit">
				<div>
					<label for="nFields">How many fields:</label>
					<input type="number" name="nFields" v-model.number="nFields"
						min="1"/>
				</div>
				<div>
					<fieldset>
						<legend>Fields:</legend>
						<label for="field1">Field 1:</label>
						<input type="text" name="field1" v-model="form.field1"/>
						<label for="field2">Field 2:</label>
						<input type="text" name="field2" v-model="form.field2"/>
					</fieldset>
				</div>
				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
		<div class="notes" v-if="Notes">
			<ul>
				<li v-for="note in Notes" :key="note.id">
					<div id="note-div">
						<p>{{note.fields}}</p>
					</div>
				</li>
			</ul>
		</div>
		<div v-else>
			You have no notes.
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Notes",
	components: {

	},
	data() {
		return {
			form: {
				field1: '',
				field2: ''
			},
			nFields: 2
		}
	},
	created: function () {
		this.getNotes()
	},
	computed: {
		...mapGetters({ Notes: "stateNotes", User: "stateUser" })
	},
	methods: {
		...mapActions([ "createNote", "getNotes" ]),
		async submit() {
			try {
				await this.createNote(this.form);
			} catch (error) {
				throw "Could not create note right now.";
			}
		}
	}
};
</script>

<style scoped lang="scss">
ul {
	list-style: none;
}
</style>
