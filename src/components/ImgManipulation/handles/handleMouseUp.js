import React from 'react';

const HandleMouseUp = (dispatch, state) => (evt) => {
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

export default HandleMouseUp;
