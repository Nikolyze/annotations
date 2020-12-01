import React from 'react';

const handleMouseUp = (dispatch, state) => (evt) => {
    evt.preventDefault();
    const {
        moveData: {
            currentY
        }
    } = state;

    dispatch({
        type: 'moveData',
        payload: {
            start: false,
            initialY: currentY
        }
    });
}

export default handleMouseUp;
