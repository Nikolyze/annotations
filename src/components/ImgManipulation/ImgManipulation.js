import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Annotations from '../Annotations/Annotations';
import UseReducerHook from './hooks/UseReducerHook';

import handleWheelHook from './handles/handleWheelHook';
import handleMouseUp from './handles/handleMouseUp';
import handleMouseDown from './handles/handleMouseDown';
import handleMouseMove from './handles/handleMouseMove';
import handleClick from './handles/handleClick';
import handleAnnotationDelete from './handles/handleAnnotationDelete';
import handleAnnotationAdd from './handles/handleAnnotationAdd';
import { updateAnnotationFile } from '../../ajax/requests';

import { PLUS, MINUS } from '../../static/constants';
import './ImgManipulation.sass';
//test1
//test2
//test3
const ImgManipulation = ({ currentAnnotation, area, zoomData }) => {
    const ref = useRef(null);
    const refParent = useRef(null);
    const [file, setFile] = useState({ annotations: [] });
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
        if (currentAnnotation.url) {
            const img = new Image();
            img.src = currentAnnotation.url;
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
    }, [currentAnnotation]);

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
        setFile(currentAnnotation);
    }, [currentAnnotation]);

    useEffect(() => {
        if (!state.initialHeight) return;
        ref.current.addEventListener('wheel', handleWheelHook(dispatch, state), { passive: false });
        // return () => ref.current.removeEventListener('wheel', handleWheelHook(dispatch, state), { passive: false });
    }, [state.initialHeight]);

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

    const setAnnotationsLocal = (data = {}) => setFile(data);

    const handlerDeleteFromState = (data) => setFile(data);

    const handleDelete = async (id) => {
        const { id: fileId } = file;
        const filteredAnnotations = file.annotations.filter(ann => ann.id !== id);
        const response = await handleAnnotationDelete(fileId, { ...file, annotations: [...filteredAnnotations] });
        handlerDeleteFromState(response);
    };
    const handleAdd = async (comment) => {
        const body = {
            ...file,
            annotations: [
                ...file.annotations,
                { ...annotation, comment, author: 'Luke Skywalker', id: uuidv4() }
            ]
        };

        const response = await handleAnnotationAdd( currentAnnotation.id, body);
        saveAnnotation({});
        setAnnotationsLocal(response);
    };

    const handleUpdate = async (id, payload) => {
        const response = await updateAnnotationFile(
            file.id,
            { ...file, annotations: file.annotations.map(ann => ann.id === id ? payload : ann) }
        );
        setFile(response);
    };

    return (
        <div
            className='main'
            ref={refParent}
        >
            <Annotations
                annotations={[...file.annotations, annotation]}
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
                onMouseUp={handleMouseUp(dispatch, state)}
                onMouseDown={handleMouseDown(dispatch, state)}
                onMouseMove={handleMouseMove(dispatch, state)}
                onClick={handleClick(saveAnnotation, dispatch, state)}
                src={file.url}
                ref={ref}
                width={state.width + 'px'}
                height={state.height + 'px'}
            />
        </div>
    );
}

export default ImgManipulation;
