import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const requestService = {
    create,
    getAll,
    getNotCompleted,
    getById,
    getInArea
};

function create(request) {
    return fetch(`${config.apiUrl}/requests/makeRequest`, requestOptions.post(request))
        .then(handleResponse);
}

function getAll() {
    return fetch(`${config.apiUrl}/requests`, requestOptions.get())
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