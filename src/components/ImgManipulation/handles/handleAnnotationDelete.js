import React from 'react';
import { deleteAnnotationFile } from '../../../ajax/requests';

const handleAnnotationDelete = async (id, updatedAnnotations) => {
    try {
        return await deleteAnnotationFile(id, updatedAnnotations);
    } catch (e) {
        console.log(e);
    }
}

export default handleAnnotationDelete;
