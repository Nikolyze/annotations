import React from 'react';
import Annotation from './Annotation/Annotation';

const Annotations = ({
     annotations,
     height,
     width
}) => {
    return annotations && annotations.map((ann, index) => {
        if  (!ann.pos) return null;
        const posXPx = width * ann.pos.x;
        const posYPx = height * ann.pos.y;

        const top = posYPx + 'px';
        const left = posXPx + 'px';

        return (
            <Annotation
                ann={ann}
                index={index}
                top={top}
                left={left}
            />
        )
    })
}

export default Annotations;
