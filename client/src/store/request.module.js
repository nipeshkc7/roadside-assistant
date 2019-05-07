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
    },
    createRequest({ dispatch, commit }, request) {
        commit('createRequest', request);

        requestService.create(request)
            .then(
                request => {
                    commit('createSuccess', request);
                    // router.push('/');
                    setTimeout(() => {
                        dispatch('alert/success', 'Request creation successful', { root: true });
                    })
                },
                error => {
                    commit('createFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
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
    createRequest(state, request) {
        state.all = { creating: true };
    },
    createSuccess(state, request) {
        state.all = { request: request };
    },
    createFailure(state, error) {
        state.all = { error };
    }
};

export const requests = {
    namespaced: true,
    state,
    actions,
    mutations
};