import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import Pagination from './pagination';
import { generateRandomId } from './utils';
import PostItem from '../components/postItem';

const PostItemsList = (props) => {
    const { postItemsLst, timezone } = props;
    const [postsToShow, setPostsToShow] = useState(postItemsLst.slice(0, 10));

    const renderEachPost = () => {
        return postsToShow.map((post) => {
            const itemId = generateRandomId('post_item');
            const item = {
                ...post,
                time: moment(post.time).tz(timezone),
            };

            return (
                <div key={itemId}>
                    <PostItem item={item} />
                </div>
            );
        });
    };

    return (
        <div className='post-items-list'>
            {renderEachPost()}
            <div className='pagination-handler'>
                <Pagination itemLst={postItemsLst} onPageChange={setPostsToShow} />
            </div>
        </div>
    );
};

export default withRouter(PostItemsList);
