import React from 'react';
import {Alert} from 'antd';
import './errorComponent.css';

export function ErrorComponent() {
    return (
        <div className={'error-container'}>
            <Alert
                message="Error"
                description="Something go wrong, try again"
                type="error"
                showIcon
                className={'text'}
            />
        </div>
    )
}
