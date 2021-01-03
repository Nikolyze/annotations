import React from 'react';
import { deleteAnnotation } from '../../../ajax/requests';

const handleAnnotationDelete = async (id) => {
    try {
        return await deleteAnnotation(id);
    } catch (e) {
        console.log(e);
    }
}

export default handleAnnotationDelete;
