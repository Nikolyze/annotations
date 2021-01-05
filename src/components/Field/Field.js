import React, { useState, useRef, useEffect } from 'react';
import FieldStateHook from './hooks/FieldStateHook';
import { getAllFiles } from '../../ajax/requests';
import Sidebar from '../Sidebar/Sidebar';
import ImgManipulation from '../ImgManipulation/ImgManipulation';
import Zoom from '../Zoom/Zoom';
import { DEFAULT, PLUS, MINUS } from '../../static/constants';
import './Field.sass';

import nature from '../../static/i/star.png';

const Field = () => {
    const [area, ref] = FieldStateHook();
    const upload = useRef(null);
    const [fileSrc, setFile] = useState(nature);
    let [zoomData, setZoomindex] = useState({ zoom: DEFAULT, index: 1 });

    const handleZoomPlus = () => {
        setZoomindex({ zoom: PLUS, index: 0.5 });
    }

    const handleZoomMinus = () => {
        setZoomindex({ zoom: MINUS, index: 0.5 });
    }

    const handleChange = (evt) => {
        const file = evt.target.files[0];
        if (file) setFile(URL.createObjectURL(file));
    }

    const handleClick = () => upload.current.click();

    return (
        <div className='field'>
            <Sidebar />
            <div className='field__head'>
                <div className='field__head__name'>Here goes the file name</div>
                {/*TODO:: implement image loading*/}
                <div className='field__head__upload-btn'>
                    <input ref={upload} type='file' onChange={handleChange} />
                    <button onClick={handleClick} className='btn-reset field__head__upload'>Upload image</button>
                </div>
            </div>
            <div className="field__inner" ref={ref}>
                <ImgManipulation
                    src={fileSrc}
                    zoomData={zoomData}
                    area={area}
                />
                <Zoom
                    handleZoomPlus={handleZoomPlus}
                    handleZoomMinus={handleZoomMinus}
                />
            </div>
            <div className='field__comments'>
                <span className='field__comments__text'>To leave a comment, mouseover </span>
                <span className='field__comments__icon'>
                <span className='icon-ic_plus path1' />
                <span className='icon-ic_plus path2' />
            </span>
                <span className='field__comments__text'>on an image and click the left mouse button</span>
                <span className='field__comments__icon'>
                <span className='icon-ic_mouse path1' />
                <span className='icon-ic_mouse path2' />
                <span className='icon-ic_mouse path3' />
                <span className='icon-ic_mouse path4' />
            </span>
            </div>
        </div>
    );
};

export default Field;
