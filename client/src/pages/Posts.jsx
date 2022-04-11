import React, { useState } from 'react';
import PostList from '../component/PostList';
import "../css/App.css";

function Posts() {

    const [posts] = useState([
        { id: 1, title: 'Java Script', description: 'Java Script - язык для программирования' },
        { id: 2, title: 'PHP', description: 'PHP - язык для программирования' },
        { id: 3, title: 'C#', description: 'C# - язык для программирования' }
    ]);

    return (
        <div className="App">
            <PostList posts={posts} title={'Список постов'} />
        </div>
    );
}

export default Posts;