import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const requestService = {
    create,
    update,
    getAll,
    getNotCompleted,
    getById,
    getInArea,
    getResponders,
    getMembersRequests
};

function create(request) {
    return fetch(`${config.apiUrl}/requests/makeRequest`, requestOptions.post(request))
        .then(handleResponse)
        .then(request => {
            return request;
        });
}

function getAll() {
    return fetch(`${config.apiUrl}/requests`, requestOptions.get())
        .then(handleResponse);
}

function getResponders(id) {
    return fetch(`${config.apiUrl}/requests/responders/${id}`, requestOptions.get())
        .then(handleResponse);
}

function getMembersRequests(memberIDD) {
    return fetch(`${config.apiUrl}/requests/member/${memberIDD}`, requestOptions.get())
        .then(handleResponse);
}

function getNotCompleted() {
    return fetch(`${config.apiUrl}/requests/not-completed`, requestOptions.get())
        .then(handleResponse);
}

function getById(id) {
    return fetch(`${config.apiUrl}/requests/${id}`, requestOptions.get())
        .then(handleResponse);
}

function getInArea(lat, lon) {
    return fetch(`${config.apiUrl}/requests/get-in-area`, requestOptions.post({ lat, lon }))
        .then(handleResponse);
}

function update(request, id) {
    return fetch(`${config.apiUrl}/requests/${id}`, requestOptions.put(request))
        .then(handleResponse);
}
