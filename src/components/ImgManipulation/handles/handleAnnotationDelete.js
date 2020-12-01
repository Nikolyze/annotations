import React from 'react';
import { URL } from '../../../static/constants';

const handleAnnotationDelete = (handlerDeleteFromState, id) => {

    fetch(`${URL}/${id}`, {
        method: 'DELETE',
    }).then((response) => {
        if (response.ok) return handlerDeleteFromState(id);
        // TODO:: error handling
    });
}

export default handleAnnotationDelete;
