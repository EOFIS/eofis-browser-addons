import axios from "axios";

const state = {
	user: null
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
	}
};
const mutations = {
	/* Changes to state */
	setUser(state, email) {
		state.user = email
	},
	logout(state) {
		state.user = null;
	}
};
const getters = {
	/* Get state */
	isAuth: state => !!state.user,
	stateUser: state => state.user
};

export default {
	state,
	getters,
	actions,
	mutations
};
