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
        axios.post('auth/', User, {
            /*
            validateStatus: (status) => {
                return status == 200;
            }
            */
        })
            .then((response) => {
                if (response) {
                    if (response.status == 200) {
                        commit('SET_USER', User.get('email'));
                    } else {
                        throw response.data;
                    }
                } else {
                    throw "Authentication error. Check your email and password are correct.";
                }
            })
            .catch((error) => {
                //console.log(`AUTH ERROR: ${error} ; ${error.response}`);
                //throw "Authentication error. Check your email and password are correct.";
                throw error;
            });
        /*
        let auth_response = await axios.post('auth/', User, {
            validateStatus: (status) => {
                return status == 200;
            }
        });
        console.log(`AUTH_RESPONSE: ${auth_response}`);
        await commit('SET_USER', User.get('email'));
        console.log(`LOGIN DONE`);
        */
    },
    async logout({commit}) {
        await axios.delete('auth/');
        commit('logout');
    }
};
const mutations = {
    /* Changes to state */
    SET_USER(state, email) {
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
