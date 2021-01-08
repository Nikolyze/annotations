import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import './Sidebar.sass';

const Sidebar = ({ setData, files }) => {
    const [isClose, setClose] = useState(true);

    const handleEnter = () => setClose(false);

    const handleLeave = () => setClose(true);

    const handleClick = (file) => () => setData(file);
    let { id: fileId } = useParams();

    return (
        <div
            className={cn('sidebar', {
                'sidebar_closed': isClose
            })}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {files && files.map((file, index) => (
                <Link
                    to={`/${file.id}`}
                    className={cn('btn-reset sidebar__btn', {
                        'sidebar__btn_closed': isClose,
                        'sidebar__btn_active': fileId ? fileId == file.id : index === 0
                    })}
                    key={file.id}
                    onClick={handleClick(file)}
                >
                    <div className='sidebar__img'>
                        <img src={file.url} alt=""/>
                    </div>
                    <div className='sidebar__desc'>
                        <span>Annotations: {file.annotations.length}</span>
                        <span>File name: {file.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
};

export default Sidebar;
