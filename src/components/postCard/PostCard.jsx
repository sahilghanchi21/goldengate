import React, { useState } from 'react';
import { MdMoreHoriz } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";

const postData = [
    {
        "id": 1,
        "username": "User1",
        "profilePic": "https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "caption": "This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.This is the first sample post.",
        "image": "https://images.pexels.com/photos/696407/pexels-photo-696407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "likes": 422,
        "comments": 69,
        "shares": 21
    },
    {
        "id": 2,
        "username": "User2",
        "profilePic": "https://randomuser.me/api/portraits/men/1.jpg",
        "caption": "This is the second sample post.This is the second sample postThis is the second sample postThis is the second sample postThis is the second This is the second sample post is the second sample postsample postThis is the second sample postThis is the second sample postThis is the second sample post",
        "image": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        "likes": 210,
        "comments": 42,
        "shares": 15
    },
    {
        "id": 3,
        "username": "User3",
        "profilePic": "https://randomuser.me/api/portraits/women/1.jpg",
        "caption": "This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.This is the third sample post with a video.",
        "video": "https://videos.pexels.com/video-files/12902487/12902487-hd_1080_1920_30fps.mp4",
        "likes": 325,
        "comments": 78,
        "shares": 30
    }
];

const PostCard = () => {
    const [showFullCaption, setShowFullCaption] = useState(false);

    const toggleCaption = () => {
        setShowFullCaption(!showFullCaption);
    };

    return (
        <>
            {postData.map(post => (
                <div className="scrollable-posts">
                    <div className="post-card" key={post.id}>
                        <div className='post-card-header'>
                            <div className="post-user-info">
                                <img src={post.profilePic} alt="User Profile" className="profile-pic" />
                                <div className="username">{post.username}</div>
                            </div>
                            <div className="more-post-options">
                                <MdMoreHoriz />
                            </div>
                        </div>
                        <div className="post-card-content">
                            <p className='caption-content'>
                                {!showFullCaption ? post.caption : `${post.caption.slice(0, 100)}...`}
                                {!showFullCaption && <span style={{ cursor: "pointer", color: "blue" }} onClick={toggleCaption}> Show less</span>}
                                {showFullCaption && <span style={{ cursor: "pointer", color: "blue" }} onClick={toggleCaption}> Show more...</span>}
                            </p>
                            {post.video ? (
                                <video controls>
                                    <source src={post.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img src={post.image} alt="" />
                            )}
                        </div>
                        <div className="post-card-footer">
                            <div className="footer-top">
                                <div>{post.likes} likes</div>
                                <div>{post.comments} comments</div>
                                <div>{post.shares} share</div>
                            </div>
                            <div className="footer-bottom">
                                <div className='bottom-footer-icons'><AiFillLike /> Likes</div>
                                <div className='bottom-footer-icons'><BiSolidCommentDetail /> Comments</div>
                                <div className='bottom-footer-icons'><IoIosSend /> Share</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PostCard;
