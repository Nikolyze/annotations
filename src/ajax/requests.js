import { URL, FILES_URL } from "../static/constants";

export const getAllFiles = () => (
    fetch(FILES_URL, {
        method: 'GET',
    }).then((response) => {
        if (response.ok) return response.json();
        // TODO:: error handling
    }).then(data => data)
);

export const addAnnotationFile = (id, body) => (
    fetch(`${FILES_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.ok) return response.json();
        // TODO:: error handling
    }).then(data => data)
);


export const deleteAnnotationFile = (id, body) => (
    fetch(`${FILES_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.ok) return response.json();
        throw new Error(response)
    }).then(data => data)
);

export const deleteAnnotation = (id) => (
    fetch(`${URL}/${id}`, {
        method: 'DELETE',
    }).then((response) => {
        if (response.ok) return id;
        throw new Error(response)
    })
);

export const updateAnnotationFile = (id, body) => (
    fetch(`${FILES_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.ok) return response.json();
        // TODO:: error handling
    }).then(data => data)
);
