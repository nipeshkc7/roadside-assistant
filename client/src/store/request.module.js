import { requestService, userService } from '../_services';

const state = {
    request: null,
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
        commit('createRequest', request.memberID);

        requestService.create(request)
            .then(
                request => {
                    commit('createSuccess', request);
                },
                error => {
                    commit('createFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    updateRequest({commit}, request, id) {
        commit('updateRequest');

        requestService.update(request, id)
            .then(
                request => commit('updateSuccess', request)
            );
    },
    getById({commit}, id) {
        commit('getRequestById');

        requestService.getById(id)
            .then(
                request => commit('getRequestByIdSuccess', request),
                error => commit('getRequestByIdFailure', error)
            );
    },
    getMembersRequest({commit}, memberID) {
        commit('getMembersRequest');

        requestService.getMembersRequests(memberID)
            .then(
                request => commit('getMembersRequestSuccess', request),
                error => commit('getMemberRequestFailure', error)
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
        state.request = request;
    },
    createSuccess(state, request) {
        state.all = {};
        state.request = request;
    },
    createFailure(state, error) {
        state.all = { error };
        state.request = null;
    },
    updateRequest(state, request) {
        state.all = { updating: true };
    },
    updateSuccess(state, request) {
        state.all = { request: request };
    },
    getRequestById(state) {
        state.all = { getting: true };
    },
    getRequestByIdSuccess(state, request) {
        state.request = request;
    },
    getRequestByIdFailure(state, error) {
        state.all = { error };
    },
    getMembersRequest(state) {
        state.all = { getting: true };
    },
    getMembersRequestSuccess(state, request) {
        state.request = request;
    },
    getMembersRequestFailure(state, error) {
        state.all = { error };
    }
};

export const requests = {
    namespaced: true,
    state,
    actions,
    mutations
};