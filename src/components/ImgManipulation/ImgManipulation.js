import React, { useEffect, useRef, useState } from 'react';
import Annotations from '../Annotations/Annotations';
import UseReducerHook from './hooks/UseReducerHook';

import handleWheelHook from './handles/handleWheelHook';
import handleMouseUp from './handles/handleMouseUp';
import handleMouseDown from './handles/handleMouseDown';
import handleMouseMove from './handles/handleMouseMove';
import handleClick from './handles/handleClick';
import handleAnnotationDelete from './handles/handleAnnotationDelete';
import handleAnnotationAdd from './handles/handleAnnotationAdd';

import LoadImgHook from './hooks/loadImgHook';

import { URL, PLUS, MINUS } from '../../static/constants';
import './ImgManipulation.sass';

import nature from '../../static/i/nature.png';

const ImgManipulation = ({ area, zoomData }) => {
    const ref = useRef(null);
    const refParent = useRef(null);
    const [annotations, setAnnotations] = useState([]);
    const [annotation, saveAnnotation] = useState({});

    const [state, dispatch] = UseReducerHook({
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
        if (load) {
            dispatch({
                type: 'updateDataPartial',
                payload: {
                    width: ref.current.width,
                    height: ref.current.height,
                    initialWidth: ref.current.width,
                    initialHeight: ref.current.height
                }
            });
        }
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
            // TODO:: error handling
        }).then((annotations) => {
            setAnnotations(annotations)
        })
    }, []);

    useEffect(() => {
        if (area) {
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
        }
    }, [zoomData]);

    const setAnnotationsLocal = (data = {}) => {

        setAnnotations([
            ...annotations,
            data
        ]);
    };

    const handlerDeleteFromState = (id) => {
        const filteredAnn = annotations.filter((ann) => ann.id !== id);

        setAnnotations([
            ...filteredAnn
        ]);
    };

    const handleDelete = (id) => handleAnnotationDelete(handlerDeleteFromState, id);
    const handleAdd = (comment) => {
        handleAnnotationAdd(setAnnotationsLocal, { ...annotation, comment });
        saveAnnotation({});
    };

    return (
        <div
            className='main'
            ref={refParent}
        >
            <Annotations
                annotations={[...annotations, annotation]}
                height={state.height}
                width={state.width}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
            />
            <img
                className='img-manipulation__picture'
                alt='nature'
                ref={ref}
                onLoad={handleLoad}
                onWheel={handleWheelHook(dispatch, state)}
                onMouseUp={handleMouseUp(dispatch, state)}
                onMouseDown={handleMouseDown(dispatch, state)}
                onMouseMove={handleMouseMove(dispatch, state)}
                onClick={handleClick(saveAnnotation, dispatch, state)}
                src={nature}
                width={state.width + 'px'}
                height={state.height + 'px'}
            />
        </div>
    );
}

export default ImgManipulation;
