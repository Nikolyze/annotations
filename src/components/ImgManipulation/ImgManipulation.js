import React, { useEffect, useRef, useState } from 'react';
import Annotations from '../Annotations/Annotations';
import UseReducerHook from './hooks/UseReducerHook';

// TODO:: repair handleWheelHook later
// import handleWheelHook from './handles/handleWheelHook';
import handleMouseUp from './handles/handleMouseUp';
import handleMouseDown from './handles/handleMouseDown';
import handleMouseMove from './handles/handleMouseMove';
import handleClick from './handles/handleClick';
import handleAnnotationDelete from './handles/handleAnnotationDelete';
import handleAnnotationAdd from './handles/handleAnnotationAdd';
import { updateAnnotation } from '../../ajax/requests';

import { URL, PLUS, MINUS } from '../../static/constants';
import './ImgManipulation.sass';

const ImgManipulation = ({ src, area, zoomData }) => {
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

    useEffect(() => {
        if (src) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                dispatch({
                    type: 'updateDataPartial',
                    payload: {
                        width: img.width,
                        height: img.height,
                        initialWidth: img.width,
                        initialHeight: img.height
                    }
                });
            };
        }
    }, [src]);

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

    const handleDelete = async (id) => {
        const sameId = await handleAnnotationDelete(id);
        handlerDeleteFromState(sameId);
    };
    const handleAdd = async (comment) => {
        const response = await handleAnnotationAdd( { ...annotation, comment });
        saveAnnotation({});
        setAnnotationsLocal(response);
    };

    const handleUpdate = async (id, payload) => await updateAnnotation(id, payload);

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
                saveAnnotation={saveAnnotation}
                handleUpdate={handleUpdate}
            />
            <img
                className='img-manipulation__picture'
                alt='nature'
                // TODO:: connect after repair handleWheelHook
                // onWheel={handleWheelHook(dispatch, state)}
                onMouseUp={handleMouseUp(dispatch, state)}
                onMouseDown={handleMouseDown(dispatch, state)}
                onMouseMove={handleMouseMove(dispatch, state)}
                onClick={handleClick(saveAnnotation, dispatch, state)}
                src={src}
                ref={ref}
                width={state.width + 'px'}
                height={state.height + 'px'}
            />
        </div>
    );
}

export default ImgManipulation;
