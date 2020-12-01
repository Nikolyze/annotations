import React from 'react';
import { URL } from '../../../static/constants';

const handleClick = (setAnnotationsLocal, dispatch, state) => (evt) => {
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

    // INFO:: mock data, no data saving input data
    const body = {
        author: "Luke Skywalker",
        comment: "May the force be with you",
        pos: {
            x: resYTop / width,
            y: resXLeft / height
        }
    };

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.ok) return response.json();
        // TODO:: error handling
    }).then(data => setAnnotationsLocal(data));
}

export default handleClick;
