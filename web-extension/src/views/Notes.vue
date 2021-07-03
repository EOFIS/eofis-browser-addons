<template>
	<div class="notes">
		<div v-if="User">
			<p>Hello {{User}}</p>
		</div>
		<CreateNote/>
		<div class="notes" v-if="Notes">
			<ul>
				<li v-for="note in Notes" :key="note.id">
					<div class="note-div">
						<p v-for="field in note.fields" :key="field.id">{{field}}</p>
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
import CreateNote from "@/components/CreateNote.vue";
export default {
	name: "Notes",
	components: {
		CreateNote
	},
	created: function () {
		this.getNotes()
	},
	computed: {
		...mapGetters({ Notes: "stateNotes", User: "stateUser" })
	},
	methods: {
		...mapActions([ "getNotes" ]),
	}
};
</script>

<style scoped lang="scss">
ul {
	list-style: none;
}
</style>
