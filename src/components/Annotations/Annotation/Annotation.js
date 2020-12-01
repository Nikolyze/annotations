import React, { useState, useEffect } from 'react';
import './Annotation.sass';

const Annotation = ({
    ann,
    left,
    top,
    handleDelete
}) => {
    const [isOpen, setToggle] = useState(false);
    useEffect(() => setToggle(false), [ann]);

    const handleClick = () => setToggle(!isOpen);

    const author = ann && ann.author && ann.author
        .split(' ')
        .map(item => item[0].toUpperCase())
        .join('');

    const handleAnnotationDelete = () => handleDelete(ann.id);

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
                    <div className='annotation__logo'>
                        {author}
                    </div>
                    <div>
                        <div className='annotation__author'>
                            {ann.author}
                        </div>
                        <div className='annotation__text'>
                            {ann.comment}
                        </div>
                    </div>
                    <button
                        className='annotation__delete icon-delete btn-reset'
                        onClick={handleAnnotationDelete}
                    />
                </div>
            )}
        </div>
    )
}

export default Annotation;
