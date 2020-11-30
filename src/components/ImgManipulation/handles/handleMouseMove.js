import React  from 'react';

function setTranslate(yPos, el) {
    el.style.transform = `translate3d(0, ${yPos}px, 0)`;
}

const HandleMouseMove = (dispatch, state) => (evt) => {
    evt.preventDefault();
    const {
        moveData: {
            start,
            initialY
        }
    } = state;
    if (!start) return false;

    setTranslate(evt.clientY - initialY, evt.target.parentNode);
    dispatch({
        type: 'moveData',
        payload: {
            currentY: evt.clientY - initialY,
            yOffset: evt.clientY - initialY,
            isClearClick: false
        }
    });
}

export default HandleMouseMove;
