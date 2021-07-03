<template>
	<div class="notes">
		<div v-if="User">
			<p>Hello {{User}}</p>
		</div>
		<CreateNote/>
		<div class="notes" v-if="Notes">
			<Note v-for="note in Notes" :key="note.id" :note="note"/>
			<!--
				<div class="box" v-for="note in Notes" :key="note.id">
					{{note}}
						<p v-for="field in note.fields" :key="field.id">{{field}}</p>
				</div>
			-->
		</div>
		<div v-else>
			You have no notes.
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CreateNote from "@/components/CreateNote.vue";
import Note from "@/components/Note.vue";
export default {
	name: "Notes",
	components: { CreateNote, Note },
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
