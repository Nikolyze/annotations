import React from 'react';
import { URL } from '../../../static/constants';

const handleAnnotationAdd = (setAnnotationsLocal, data) => {
    const body = { author: 'Luke Skywalker', ...data };

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.ok) return response.json();
        // TODO:: error handling
    }).then(data => setAnnotationsLocal(data));
};

export default handleAnnotationAdd;
