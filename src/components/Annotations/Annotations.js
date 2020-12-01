import React from 'react';
import Annotation from './Annotation/Annotation';

const Annotations = ({
     annotations,
     height,
     width,
     handleDelete
}) => annotations && annotations.map(ann => {
    if  (!ann.pos) return null;
    const posXPx = width * ann.pos.x;
    const posYPx = height * ann.pos.y;

    const top = posYPx + 'px';
    const left = posXPx + 'px';

    return (
        <Annotation
            ann={ann}
            key={ann.id}
            top={top}
            left={left}
            handleDelete={handleDelete}
        />
    )
})

export default Annotations;
