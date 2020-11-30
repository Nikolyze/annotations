import React, { useState, useCallback } from 'react';

const LoadImgHook = () => {
    const [load, setLoad] = useState(false);

    const handleLoad = useCallback(() => {
        setLoad(true);
    });

    return [load, handleLoad];
}

export default LoadImgHook;
