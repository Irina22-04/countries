import React from 'react';
import { Spin } from 'antd';
import './loader.css';

export function Loader() {
    return (
        <div className={'spin-container'}>
            <Spin tip="Loading..." size="large"/>
        </div>
    )
}
