import React from 'react';
import { addAnnotation } from '../../../ajax/requests';

const handleAnnotationAdd = async (data) => {
    try {
        return await addAnnotation({ author: 'Luke Skywalker', ...data });
    } catch (e) {
        console.log(e);
    }
};

export default handleAnnotationAdd;
