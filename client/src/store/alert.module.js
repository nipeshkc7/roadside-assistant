const state = {
    type: null,
    message: null
};

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }, message) {
        commit('success', message);
    }
};

const mutations = {
    success(state, message) {
        state.type = 'success'; // Sets the alert type to success
        state.message = message;
    },
    error(state, message) {
        state.type = 'error'; // Sets the alert type to error
        state.message = message;
    },
    clear(state) {
        state.type = null; // Clears the alert
        state.message = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};