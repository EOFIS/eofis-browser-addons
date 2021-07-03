import axios from "axios";

const state = {
	/* Data with default values */
	user: null,
	notes: null,
	token: null
};
const actions = {
	/* fns that commit a mutation (change state)
	 * or dispatch (call another action) */
	async register({dispatch}, User) {
		await axios.post('users/', User);
		await dispatch('login', User);
	},
	async login({commit}, User) {
		await axios.post('auth/', User);
		await commit('setUser', User.get('email'));
	},
	async logout({commit}) {
		await axios.delete('auth/');
		commit('logout');
	},
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
	/* Changes to state */
	setUser(state, email) {
		state.user = email
	},
	setNotes(state, notes) {
		state.notes = notes
	},
	logout(state) {
		state.token = null;
		state.user = null;
		state.notes = null;
	}
};
const getters = {
	/* Get state */
	isAuth: state => !!state.user,
	stateNotes: state => state.notes,
	stateUser: state => state.user,
	stateToken: state => state.token
};

export default {
	state,
	getters,
	actions,
	mutations
};
