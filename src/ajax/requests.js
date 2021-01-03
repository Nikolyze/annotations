import { URL } from "../static/constants";

export const addAnnotation = (body) => (
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.ok) return response.json();
        // TODO:: error handling
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

export const updateAnnotation = (id, payload) => (
    fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...payload})
    }).then((response) => {
        console.log(response);
        if (response.ok) return id;
        throw new Error(response)
    })
)
