import React, { useState, useEffect } from 'react';
import './Annotation.sass';

const Annotation = ({
    ann,
    left,
    top,
    handleDelete,
    handleAdd
}) => {
    const [isOpen, setToggle] = useState(false);
    const [comment, setValue] = useState('');
    useEffect(() => setToggle(false), [ann]);

    const handleClick = () => setToggle(!isOpen);

    const author = ann && ann.author && ann.author
        .split(' ')
        .map(item => item[0].toUpperCase())
        .join('');

    const handlerChange = (evt) => setValue(evt.target.value);
    const handleAnnotationDelete = () => handleDelete(ann.id);
    const handleAnnotationAdd = () => handleAdd(comment);

    return (
        <div
            className='annotation'
            key={ann.id}
            style={{
                top,
                left,
            }}
        >
            <button
                className='btn-reset annotation__btn'
                onClick={handleClick}
            >
                <span className='annotation__title'>
                    {ann.id}
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
