import React from 'react';

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

    const {
        top,
        left
    } = evt.target.getBoundingClientRect();
    const height = evt.target.height;
    const width = evt.target.width;

    const clientX = evt.clientX;
    const clientY = evt.clientY;

    const resYTop = clientX - left;
    const resXLeft = clientY - top;

    const body = {
        pos: {
            x: resYTop / width,
            y: resXLeft / height
        }
    };
    saveAnnotation(body);
}

export default handleClick;
