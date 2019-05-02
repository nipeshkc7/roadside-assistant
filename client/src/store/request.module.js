import { requestService } from '../_services';

const state = {
    all: {}
} ;

const actions = {
    getInArea({ dispatch, commit }, lat, lon) {
        commit('getInAreaRequest');

        requestService.getInArea(lat, lon)
            .then(
                requests => commit('getInAreaSuccess', requests),
                error => commit('getInAreaFailure', error)
            );
    }
};

const mutations = {
    getInAreaRequest(state) {
        state.all = { loading: true };
    },
    getInAreaSuccess(state, requests) {
        state.all = { items: requests };
    },
    getInAreaFailure(state, error) {
        state.all = { error };
    },
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};