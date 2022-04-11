import React from 'react';
import PostItem from './PostItem';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

function PostList({posts, title}) {
    return ( 
        <div>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <div>
                <MyInput placeholder='Имя пользователя' />
                <MyInput placeholder='Email' />
                <MyButton>Создать</MyButton>
            </div>
            {posts.map(post =>
                <PostItem post={post} key={post.id} />
            )}
        </div>
     );
}

export default PostList;