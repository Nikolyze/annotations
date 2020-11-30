import React from 'react';
import './Zoom.sass';

const Zoom = ({
  handleZoomPlus,
  handleZoomMinus
}) => {
    return (
        <div className='zoom'>
            <button
                className='btn-reset zoom__plus icon-ic_zoomin'
                onClick={handleZoomPlus}
            />
            <button
                className='btn-reset zoom__minus icon-ic_zoomout'
                onClick={handleZoomMinus}
            />
        </div>
    )
};

export default Zoom;
