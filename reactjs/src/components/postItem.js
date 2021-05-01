import React from 'react';
import { withRouter } from 'react-router-dom';

import { capitalizeText, emotionsToColor } from './utils';
import '../styles/postItem.scss';

const PostItem = (props) => {
    const { time, emotion, text } = props.item;
    const emotionColor = emotionsToColor[emotion];

    return (
        <div className='post-item'>
            <div className='info'>
                <div className='time'>{time.format('MM-DD hh:mm A')}</div>
                <div className='emotion'>
                    <div style={{ backgroundColor: emotionColor }}>{capitalizeText(emotion)}</div>
                </div>
            </div>

            <div className='item-text'>{text}</div>
        </div>
    );
};

export default withRouter(PostItem);
