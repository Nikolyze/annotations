import React  from 'react';

const handleWheelHook = (dispatch, state) => (evt) => {
    evt.preventDefault();
    let copiedState = { ...state };
    const {
        initialHeight,
        areaParent: {
            width
        }
    } = copiedState;

    const deltaY = evt.deltaY;

    const currentSizeWidth = evt.target.width;
    const currentSizeHeight = evt.target.height;

    const coefficientW = (currentSizeWidth / currentSizeHeight);

    const stepPx = 10;
    const nextNeight = currentSizeHeight - (stepPx / coefficientW);
    const nextWidth = currentSizeWidth + stepPx;

    if (deltaY < 0) {
        if (width <= nextWidth) return false;
        copiedState = {
            ...copiedState,
            width: nextWidth,
            height: currentSizeHeight + (stepPx / coefficientW),
        };
    } else {
        if (initialHeight >= nextNeight) return false;
        copiedState = {
            ...copiedState,
            width: currentSizeWidth - stepPx,
            height: nextNeight,
        };
    }

    dispatch({ type: 'updateData', payload: copiedState });
}

export default handleWheelHook;
