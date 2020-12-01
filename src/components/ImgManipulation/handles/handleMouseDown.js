import React  from 'react';

const handleMouseDown = (dispatch, state) => (evt) => {
    evt.preventDefault();
    const {
        moveData: {
            yOffset
        }
    } = state;

    dispatch({
        type: 'moveData',
        payload: {
            start: true,
            initialY: evt.clientY - yOffset
        }
    });
}

export default handleMouseDown;
