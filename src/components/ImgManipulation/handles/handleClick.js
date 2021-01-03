import React from 'react';
import CountPositions from '../../../utils/CountPositions';

const handleClick = (saveAnnotation, dispatch, state) => (evt) => {
    evt.preventDefault();
    const {
        moveData: {
            isClearClick
        }
    } = state;

    if (!isClearClick) {
        dispatch({ type: 'moveData', payload: { isClearClick: true } });
        return false;
    }

    const instance = new CountPositions(evt);
    instance.countingWithoutShift();
    saveAnnotation(instance.body);
}

export default handleClick;
