import React, { useState, useEffect } from 'react';
import CountPositions from '../../../utils/CountPositions';
import getCoords from "../../../utils/getCoords";
import './Annotation.sass';

const Annotation = ({
    ann,
    left,
    top,
    handleDelete,
    handleAdd,
    saveAnnotation,
    handleUpdate
}) => {
    const [isOpen, setToggle] = useState(false);
    const [isStartMove, setMove] = useState(false);
    const [comment, setValue] = useState('');
    const [positions, setPositions] = useState({ currentLeft: left, currentTop: top })

    useEffect(() => setToggle(false), [ann]);
    useEffect(() => setPositions({ currentLeft: left, currentTop: top }), [left, top]);

    const mainBlock = document.querySelector('div.main');

    const handlerChange = (evt) => setValue(evt.target.value);
    const handleAnnotationDelete = () => handleDelete(ann.id);
    const handleAnnotationAdd = () => handleAdd(comment);

    const handleMouseDown = (evt) => {
        let target = evt.target;

        while (target.tagName !== 'DIV') {
            if (target.tagName === 'BUTTON') {
                const instance = new CountPositions({ ...evt, target });

                const { pageX, pageY } = evt;
                const { left, top } = getCoords(target);

                const shiftX = pageX - left;
                const shiftY = pageY - top;

                mainBlock.onmousemove = (e) => {
                    const { pageX, pageY } = e;
                    instance.countingWithShift(pageX, pageY, shiftX, shiftY);
                    const { client: { resYTop, resXLeft } } = instance;
                    setPositions({ currentLeft: resYTop, currentTop: resXLeft });
                    setMove(true);
                };
                return;
            }
            target = target.parentNode;
        }
    }

    const handleMounseUp = (id) => (evt) => {
        mainBlock.onmousemove = null;
        if (!isStartMove) {
            setToggle(!isOpen);
            return;
        }
        let target = evt.target;

        while (target.tagName !== 'DIV') {
            if (target.tagName === 'BUTTON') {
                const instance = new CountPositions(evt);
                instance.countingWithShift();
                setMove(false);
                if (!id) saveAnnotation({ ...ann, ...instance.body });
                if (id) handleUpdate(id, { ...ann, ...instance.body });
                return;
            }
            target = target.parentNode;
        }
    }

    const { currentTop, currentLeft } = positions;
    const author = ann && ann.author && ann.author
        .split(' ')
        .map(item => item[0].toUpperCase())
        .join('');

    return (
        <div
            className='annotation'
            key={ann.id}
            style={{
                top: currentTop + 'px',
                left: currentLeft + 'px',
            }}
        >
            <button
                className='btn-reset annotation__btn'
                onMouseDown={handleMouseDown}
                onMouseUp={handleMounseUp(ann.id)}
            >
                <span className='annotation__title'>
                    {author}
                </span>
            </button>
            {isOpen && (
                <div className='annotation__block'>
                    <div className='annotation__triagle' />
                    {ann.comment && (
                        <div className='annotation__logo'>
                            {author}
                        </div>
                    )}
                    {ann.comment ? (
                        <div>
                            <div className='annotation__author'>
                                {ann.author}
                            </div>
                            <div className='annotation__text'>
                                {ann.comment}
                            </div>
                        </div>
                    ) : (
                        <div className='annotation__comment'>
                            <input
                                type='text'
                                className='annotation__input'
                                placeholder='Leave a comment'
                                value={comment}
                                onChange={handlerChange}
                            />
                            <button
                                type='button'
                                className='annotation__btn-letter btn-reset icon-letter'
                                onClick={handleAnnotationAdd}
                                disabled={!comment}
                            />
                        </div>
                    )}
                    {ann.comment && (
                        <button
                            className='annotation__delete icon-delete btn-reset'
                            onClick={handleAnnotationDelete}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default Annotation;
