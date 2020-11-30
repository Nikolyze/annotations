import React, { useState } from 'react';
import FieldStateHook from './hooks/FieldStateHook';
import ImgManipulation from '../ImgManipulation/ImgManipulation';
import Zoom from '../Zoom/Zoom';
import { DEFAULT, PLUS, MINUS } from '../../static/constants';
import './Field.sass';

const Field = () => {
    const [area, ref] = FieldStateHook();
    let [zoomData, setZoomindex] = useState({ zoom: DEFAULT, index: 1 });
    const handleZoomPlus = () => {
        setZoomindex({ zoom: PLUS, index: 0.5 });
    }

    const handleZoomMinus = () => {
        setZoomindex({ zoom: MINUS, index: 0.5 });
    }

    return (
        <div className='field'>
            <div className='field__head'>
                <div className='field__head__name'>Here goes the file name</div>
                {/*TODO:: implement image loading*/}
                <button className='btn-reset field__head__upload'>Upload image</button>
            </div>
            <div className="field__inner" ref={ref}>
                <ImgManipulation
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
