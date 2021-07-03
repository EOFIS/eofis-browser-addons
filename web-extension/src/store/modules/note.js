import axios from "axios";

const state = {
	notes: null
};
const actions = {
	async createNote({dispatch}, note) {
		console.log(`Creating note ${note}`);
		// Create new note, then show all notes
		await axios.post('notes/', note);
		await dispatch('getNotes');
	},
	async getNotes({commit}) {
		let response = await axios.get('notes/');
		commit('setNotes', response.data);
	}
};
const mutations = {
	setNotes(state, notes) {
		state.notes = notes
	}
};
const getters = {
	stateNotes: state => state.notes
};

export default {
	state, getters, actions, mutations
};

