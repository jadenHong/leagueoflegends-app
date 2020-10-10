import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { API_BASE } from '../config/index';


export const MessageSender = ({ onSubmit }) => {

    const user = sessionStorage.getItem('user');
    const [username, setUsername] = useState('');
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {


        console.log(user);
        if (user !== null) {
            const { nickname } = JSON.parse(user)

            console.log(nickname);
            setUsername(nickname);
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_BASE}/board/post`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                username: username,
                message: input,
                imageURL: imageUrl,
                profilePic: 'No',
            }),
        });
        const data = await response.json();
        console.log(data);
        onSubmit(data);

        setInput('');
        setImageUrl('');
    }

    // id, username, message, timestamp, profilePic, imageURL
    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar src='hong' />
                <form onSubmit={handleSubmit}>
                    <input disabled={user === null ? true : false} value={input} onChange={(e) => setInput(e.target.value)} className="messageSender__input" placeholder={`What's on your mind, hong?`} type="text" />
                    <input disabled={user === null ? true : false} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="image URL (Optional)" />
                    <button type="submit">
                        Hidden Submit
                    </button>
                </form>
            </div>
            <div className="messageSender__bottom">
                <div className="messageSender__option">
                    <VideocamIcon style={{ color: 'red' }} />
                    <h3>Live Video</h3>
                </div>
                <div className="messageSender__option">
                    <PhotoLibraryIcon style={{ color: 'green' }} />
                    <h3>Photo/Video</h3>
                </div>
                <div className="messageSender__option">
                    <InsertEmoticonIcon style={{ color: 'orange' }} />
                    <h3>Feeling/Activity</h3>
                </div>

            </div>
        </div>
    )
}













// import React, { useState } from 'react';
// import MessageSender from './'

// export const Feed = () => {
//     const [posts, setPosts] = useState([]);



//     return (
//         <div className="feed">
//             <MessageSender />
//             {
//                 posts.map((post) => (
//                     <Post
//                         key={post.data.id}
//                         profilePic={post.data.profilePic}
//                         message={post.data.message}
//                         timestamp={post.data.timestamp}
//                         username={post.data.username}
//                         image={post.data.image}
//                     />
//                 ))
//             }
//         </div>
//     )
// }