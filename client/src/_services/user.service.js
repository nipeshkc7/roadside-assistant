import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const userService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function register(user) {
    return fetch(`${config.apiUrl}/users`, requestOptions.post(user))
        .then(handleResponse);
}

function getAll() {
    return fetch(`${config.apiUrl}/users`, requestOptions.get())
        .then(handleResponse);
}

function getById(id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.get())
        .then(handleResponse);
}

function update(user) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.put(user))
        .then(handleResponse);
}

function _delete(id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.delete(id))
        .then(handleResponse);
}