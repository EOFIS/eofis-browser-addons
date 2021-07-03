<template>
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
					<div v-for="iField in nFields" :key="iField-1">
						<label for="iField">Field {{iField}}:</label>
						<input type="text" name="iField" v-model="form.fields[iField-1]" value=""/>
					</div>
				</fieldset>
			</div>
			<div>
				<button type="submit">Submit</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "CreateNote",
	data() {
		return {
			form: {
				fields: [],
				tags: ''
			},
			nFields: 2
		}
	},
	computed: {
		...mapGetters({ Notes: "stateNotes", User: "stateUser" })
	},
	methods: {
		...mapActions([ "createNote" ]),
		async submit() {
			try {
				console.log(`CREATING NOTE ${this.form}`);
				await this.createNote(this.form);
			} catch (error) {
				throw "Could not create note right now. Please try again later.";
			}
		}
	}
};
</script>
