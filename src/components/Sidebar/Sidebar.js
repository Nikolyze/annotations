import React, { useEffect, useState } from 'react';
import { getAllFiles } from '../../ajax/requests';
import cn from 'classnames';
import './Sidebar.sass';

const Sidebar = () => {
    const [files, setFiles] = useState(null);
    const [isClose, setClose] = useState(true);

    useEffect(async () => {
        const files = await getAllFiles();
        setFiles(files);
    }, [])

    const handleEnter = () => {
        setClose(false);
    }

    const handleLeave = () => {
        setClose(true);
    }

    return (
        <div
            className={cn('sidebar', {
                'sidebar_closed': isClose
            })}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {files && files.map(file => (
                <button className={cn('btn-reset sidebar__btn', {
                    'sidebar__btn_closed': isClose
                })} key={file.id}>
                    <div className='sidebar__img'>
                        <img src={file.url} alt=""/>
                    </div>
                    <span>Annotations: {file.annotations.length}</span>
                </button>
            ))}
        </div>
    )
};

export default Sidebar;
