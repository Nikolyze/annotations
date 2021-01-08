import React from 'react';
import { addAnnotationFile } from '../../../ajax/requests';

const handleAnnotationAdd = async (fileId, body) => {
    try {
        return await addAnnotationFile(fileId, body);
    } catch (e) {
        console.log(e);
    }
};

export default handleAnnotationAdd;
