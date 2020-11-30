import React, { useState, useEffect, useRef } from 'react';

const FieldStateHook = () => {
    const refParent = useRef(null);
    const [area, setArea] = useState(null);

    useEffect(() => {
        const imageLoaded = (ref) => {
            if (!ref) return false;
            setArea({
                width: ref.offsetWidth,
                height: ref.offsetHeight
            });
        }
        imageLoaded(refParent.current);
    }, [refParent.current]);

    return [area, refParent];
}

export default FieldStateHook;
