import React from 'react';
import Annotation from './Annotation/Annotation';

const Annotations = ({
     annotations,
     height,
     width,
     handleDelete,
     handleAdd,
     saveAnnotation,
     handleUpdate
}) => annotations && annotations.map(ann => {
    if  (!ann.pos) return null;
    const posXPx = width * ann.pos.x;
    const posYPx = height * ann.pos.y;

    const top = posYPx;
    const left = posXPx;

    return (
        <Annotation
            ann={ann}
            key={ann.pos.x + ann.pos.y}
            top={top}
            left={left}
            handleDelete={handleDelete}
            handleAdd={handleAdd}
            saveAnnotation={saveAnnotation}
            handleUpdate={handleUpdate}
        />
    )
})

export default Annotations;
