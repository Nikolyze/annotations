import React, { useEffect, useRef, useState } from 'react';
import Annotations from '../Annotations/Annotations';
import UseReducer from './hooks/UseReducer';

import HandleWheelHook from './handles/handleWheelHook';
import HandleMouseUp from './handles/handleMouseUp';
import HandleMouseDown from './handles/handleMouseDown';
import HandleMouseMove from './handles/handleMouseMove';
import HandleClick from './handles/handleClick';

import LoadImgHook from './hooks/loadImgHook';

import { URL, PLUS, MINUS } from '../../static/constants';
import './ImgManipulation.sass';

import nature from '../../static/i/nature.png';

const ImgManipulation = ({ area, zoomData }) => {
    const ref = useRef(null);
    const refParent = useRef(null);
    const [annotations, setAnnotations] = useState(null);

    const [state, dispatch] = UseReducer({
        value: 1,
        width: undefined,
        height: undefined,
        initialWidth: undefined,
        initialHeight: undefined,
        areaParent: {
            width: undefined,
            height: undefined
        },
        moveData: {
            start: false,
            currentY: undefined,
            initialY: undefined,
            yOffset: 0,
            isClearClick: true
        }
    });

    const [load, handleLoad] = LoadImgHook();

    useEffect(() => {
        if (!load) return false;

        dispatch({
            type: 'updateDataPartial',
            payload: {
                width: ref.current.width,
                height: ref.current.height,
                initialWidth: ref.current.width,
                initialHeight: ref.current.height
            }
        });
    }, [load]);

    useEffect(() => {
        dispatch({
            type: 'updateDataPartial',
            payload: {
                areaParent: {
                    ...area
                }
            }
        });
    }, [area]);

    useEffect(() => {
        fetch(URL).then((response) => {
            if (response.status === 200) {
                return response.json()
            }
        }).then((annotations) => {
            setAnnotations(annotations);
        })
    }, []);

    useEffect(() => {
        if (!area) return false;
        const { zoom, index } = zoomData;
        const { initialWidth, initialHeight } = state;
        const { width } = area;
        let resultWidth;
        let resultHeight;

        if (zoom === MINUS) {
            const nextHeight = state.height * index;
            nextHeight <= initialHeight ? resultHeight = initialHeight : resultHeight = nextHeight;
            resultWidth = nextHeight <= initialHeight ? initialWidth : state.width * index;
        }
        if (zoom === PLUS) {
            const nextWidth = state.width / index;
            nextWidth >= width ? resultWidth = width : resultWidth = nextWidth;
            resultHeight = state.height / index;
        }

        dispatch({
            type: 'updateDataPartial',
            payload: {
                width: resultWidth,
                height: resultHeight
            }
        })
    }, [zoomData]);

    const setAnnotationsLocal = (data) => {
        setAnnotations([
            ...annotations,
            data
        ]);
    }

    return (
        <div
            className='main'
            ref={refParent}
        >
            <Annotations
                annotations={annotations}
                height={state.height}
                width={state.width}
            />
            <img
                className='img-manipulation__picture'
                alt='nature'
                ref={ref}
                onLoad={handleLoad}
                onWheel={HandleWheelHook(dispatch, state)}
                onMouseUp={HandleMouseUp(dispatch, state)}
                onMouseDown={HandleMouseDown(dispatch, state)}
                onMouseMove={HandleMouseMove(dispatch, state)}
                onClick={HandleClick(setAnnotationsLocal, dispatch, state)}
                src={nature}
                width={state.width + 'px'}
                height={state.height + 'px'}
            />
        </div>
    );
}

export default ImgManipulation;
