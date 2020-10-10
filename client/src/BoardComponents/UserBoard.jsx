import React, { useState, useEffect } from 'react';
import { MessageSender } from './MessageSender';
import { Post } from './Post';

export const UserBoard = () => {
    const [posts, setPosts] = useState([]);

    const fetchGetPostedData = async () => {
        const response = await fetch('http://localhost:7779/board/getposteddata');
        const data = await response.json();
        console.log(data);
        setPosts(data.postedData);
    }
    useEffect(() => {
        fetchGetPostedData();
    }, []);

    const onInputSubmit = async () => {
        fetchGetPostedData();
    }
    return (
        <div className="feed">
            {console.log(posts)}
            <MessageSender onSubmit={onInputSubmit} />
            {
                posts.reverse().map((post) => (
                    <Post
                        key={post.id}
                        profilePic={post.profilePic}
                        message={post.message}
                        timestamp={post.timestamp}
                        username={post.username}
                        image={post.imageURL}
                    />
                ))
            }
        </div>
    )
}








