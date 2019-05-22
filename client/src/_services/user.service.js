import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const userService = {
    register,
    getAll,
    getById,
    update,
    getMembershipType,
    updateBank,
    updateCard,
    getCardDetails,
    getBankDetails,
    delete: _delete
};

function register(user) {
    return fetch(`${config.apiUrl}/users/register`, requestOptions.post(user))
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

function update(user, id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.put(user))
        .then(handleResponse);
}

function getMembershipType(id) {
    return fetch(`${config.apiUrl}/users/getMemberType/${id}`, requestOptions.get())
        .then(handleResponse);
}

function updateBank(request, id) {
    return fetch(`${config.apiUrl}/users/bankAccount/${id}`, requestOptions.put(request))
        .then(handleResponse);
}

function updateCard(request, id) {
    return fetch(`${config.apiUrl}/users/creditCard/${id}`, requestOptions.put(request))
        .then(handleResponse);
}

function getCardDetails(id) {
    return fetch(`${config.apiUrl}/users/creditCard/${id}`, requestOptions.get())
        .then(handleResponse);
}

function getBankDetails(id) {
    return fetch(`${config.apiUrl}/users/bankAccount/${id}`, requestOptions.get())
        .then(handleResponse);
}

function _delete(id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.delete(id))
        .then(handleResponse);
}