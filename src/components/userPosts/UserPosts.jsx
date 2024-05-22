

// import React, { useState, useEffect } from 'react';
// import { MdMoreHoriz } from "react-icons/md";
// import { BiSolidLike, BiLike } from "react-icons/bi";
// import { BiSolidCommentDetail } from "react-icons/bi";
// import Slider from 'react-slick';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const UserPosts = ({ fetchedPosts = [] }) => {
//     const [showFullCaption, setShowFullCaption] = useState(false);
//     const [postLikesStatuses, setPostLikesStatuses] = useState({});
//     const userToken = useSelector((state) => state.auth.user?.token);

//     useEffect(() => {
//         if (fetchedPosts) {
//             setPostLikesStatuses(
//                 fetchedPosts.reduce((acc, post) => ({
//                     ...acc,
//                     [post.postId]: post.post_Like_Status
//                 }), {})
//             );
//         }
//     }, [fetchedPosts]);

//     const toggleCaption = () => {
//         setShowFullCaption(!showFullCaption);
//     };

//     const handlePostLiked = async (postId) => {
//         const newLikesStatus = !postLikesStatuses[postId];

//         try {
//             const headers = {
//                 'Authorization': `Bearer ${userToken}`,
//                 "Content-Type": "application/json"
//             };

//             await axios.post(`http://localhost:7173/api/v1/postRequest/likeCount`, { postId }, { headers });

//             setPostLikesStatuses({
//                 ...postLikesStatuses,
//                 [postId]: newLikesStatus
//             });

//             console.log(`Post ${postId} was liked: ${newLikesStatus}`);
//         } catch (error) {
//             console.error("Error liking post:", error);
//         }
//     };

//     // const handlePostUnLiked = async (postId) => {
//     //     const newLikesStatus = !postLikesStatuses[postId];

//     //     try {
//     //         const headers = {
//     //             'Authorization': `Bearer ${userToken}`,
//     //             "Content-Type": "application/json"
//     //         };

//     //         await axios.delete(`http://localhost:7173/api/v1/postRequest/unlikeCount`, { postId }, { headers });

//     //         setPostLikesStatuses({
//     //             ...postLikesStatuses,
//     //             [postId]: newLikesStatus
//     //         });

//     //         console.log(`Post ${postId} was unliked: ${newLikesStatus}`);
//     //     } catch (error) {
//     //         console.error("Error unliking post:", error);
//     //     }
//     // };
//     const handlePostUnLiked = async (postId) => {
//         const newLikesStatus = !postLikesStatuses[postId];

//         try {
//             const headers = {
//                 'Authorization': `Bearer ${userToken}`,
//                 "Content-Type": "application/json"
//             };

//             // axios.delete does not support body directly, we use 'data' in config object
//             await axios.delete(`http://localhost:7173/api/v1/postRequest/unlikeCount`, {
//                 headers,
//                 data: { postId }
//             });

//             setPostLikesStatuses({
//                 ...postLikesStatuses,
//                 [postId]: newLikesStatus
//             });

//             console.log(`Post ${postId} was unliked: ${newLikesStatus}`);
//         } catch (error) {
//             console.error("Error unliking post:", error);
//         }
//     };

//     return (
//         <div className="scrollable-posts">
//             {fetchedPosts?.map(post => (
//                 <div className="post-card" key={post.postId}>
//                     <div className='post-card-header'>
//                         <div className="post-user-info">
//                             <img src={post.profilePic} alt="User Profile" className="profile-pic" />
//                             <div className="username">{post.username}</div>
//                         </div>
//                         <div className="more-post-options">
//                             <MdMoreHoriz />
//                         </div>
//                     </div>
//                     <div className="post-card-content">
//                         <p className='caption-content'>
//                             {!showFullCaption && post.content?.length > 100 ? post.content : `${post.content?.slice(0, 100)}...`}
//                             {post.content?.length > 100 &&
//                                 (!showFullCaption ?
//                                     <span style={{ cursor: "pointer", color: "blue" }} onClick={toggleCaption}> Show less</span> :
//                                     <span style={{ cursor: "pointer", color: "blue" }} onClick={toggleCaption}> Show more...</span>)}
//                         </p>
//                         {post.video ? (
//                             <video controls>
//                                 <source src={post.video} type="video/mp4" />
//                                 Your browser does not support the video tag.
//                             </video>
//                         ) : (
//                             post.images.length === 1 ? (
//                                 <img className="post-image" src={post.images[0]} alt={`Post ${post.id} Image`} />
//                             ) : (
//                                 <Slider>
//                                     {post.images.map((image, idx) => (
//                                         <div key={idx} className="slider-image-wrapper">
//                                             <img className="post-image" src={image} alt={`Post ${post.id} Image ${idx + 1}`} />
//                                         </div>
//                                     ))}
//                                 </Slider>
//                             )
//                         )}
//                     </div>
//                     <div className="post-card-footer">
//                         <div className="footer-bottom">
//                             <div className='bottom-footer-icons'>
//                                 {post.likesCount}
//                                 {postLikesStatuses[post.postId] ?
//                                     <BiSolidLike onClick={() => handlePostUnLiked(post.postId)} /> :
//                                     <BiLike onClick={() => handlePostLiked(post.postId)} />}
//                                 Likes
//                             </div>
//                             <div className='bottom-footer-icons'>{post.commentsCount} <BiSolidCommentDetail /> Comments</div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default UserPosts;
import React, { useState, useEffect } from 'react';
import { MdMoreHoriz } from "react-icons/md";
import { BiSolidLike, BiLike } from "react-icons/bi";
import { BiSolidCommentDetail } from "react-icons/bi";
import Slider from 'react-slick';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserPosts = ({ fetchedPosts = [] }) => {
    const [showFullCaption, setShowFullCaption] = useState(false);
    const [postLikesStatuses, setPostLikesStatuses] = useState({});
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState({});
    const userToken = useSelector((state) => state.auth.user?.token);

    useEffect(() => {
        if (fetchedPosts) {
            setPostLikesStatuses(
                fetchedPosts.reduce((acc, post) => ({
                    ...acc,
                    [post.postId]: post.post_Like_Status
                }), {})
            );
        }
    }, [fetchedPosts]);

    const toggleCaption = () => {
        setShowFullCaption(!showFullCaption);
    };

    const handlePostLiked = async (postId) => {
        const newLikesStatus = !postLikesStatuses[postId];

        try {
            const headers = {
                'Authorization': `Bearer ${userToken}`,
                "Content-Type": "application/json"
            };

            await axios.post(`http://localhost:7173/api/v1/postRequest/likeCount`, { postId }, { headers });

            setPostLikesStatuses({
                ...postLikesStatuses,
                [postId]: newLikesStatus
            });

            console.log(`Post ${postId} was liked: ${newLikesStatus}`);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handlePostUnLiked = async (postId) => {
        const newLikesStatus = !postLikesStatuses[postId];

        try {
            const headers = {
                'Authorization': `Bearer ${userToken}`,
                "Content-Type": "application/json"
            };

            await axios.delete(`http://localhost:7173/api/v1/postRequest/unlikeCount`, {
                headers,
                data: { postId }
            });

            setPostLikesStatuses({
                ...postLikesStatuses,
                [postId]: newLikesStatus
            });

            console.log(`Post ${postId} was unliked: ${newLikesStatus}`);
        } catch (error) {
            console.error("Error unliking post:", error);
        }
    };

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = async (postId) => {
        try {
            const headers = {
                'Authorization': `Bearer ${userToken}`,
                "Content-Type": "application/json"
            };

            const response = await axios.post(`http://localhost:7173/api/v1/postRequest/newComment`, {
                content: commentText,
                postId: postId,
                userId: userToken // Assuming userId is derived from the token
            }, { headers });

            setComments({
                ...comments,
                [postId]: [...(comments[postId] || []), response.data]
            });

            setCommentText("");
            console.log(`Comment added to post ${postId}`);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="scrollable-posts">
            {fetchedPosts?.map(post => (
                <div className="post-card" key={post.postId}>
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
                            {!showFullCaption && post.content?.length > 100 ? post.content : `${post.content?.slice(0, 100)}...`}
                            {post.content?.length > 100 &&
                                (!showFullCaption ?
                                    <span style={{ cursor: "pointer", color: "blue" }} onClick={toggleCaption}> Show less</span> :
                                    <span style={{ cursor: "pointer", color: "blue" }} onClick={toggleCaption}> Show more...</span>)}
                        </p>
                        {post.video ? (
                            <video controls>
                                <source src={post.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            post.images.length === 1 ? (
                                <img className="post-image" src={post.images[0]} alt={`Post ${post.id} Image`} />
                            ) : (
                                <Slider>
                                    {post.images.map((image, idx) => (
                                        <div key={idx} className="slider-image-wrapper">
                                            <img className="post-image" src={image} alt={`Post ${post.id} Image ${idx + 1}`} />
                                        </div>
                                    ))}
                                </Slider>
                            )
                        )}
                    </div>
                    <div className="post-card-footer">
                        <div className="footer-bottom">
                            <div className='bottom-footer-icons'>
                                {post.likesCount}
                                {postLikesStatuses[post.postId] ?
                                    <BiSolidLike onClick={() => handlePostUnLiked(post.postId)} /> :
                                    <BiLike onClick={() => handlePostLiked(post.postId)} />}
                                Likes
                            </div>
                            <div className='bottom-footer-icons'>{post.commentsCount} <BiSolidCommentDetail /> Comments</div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={commentText}
                                    onChange={handleCommentChange}
                                />
                                <button onClick={() => handleCommentSubmit(post.postId)}>Submit</button>
                            </div>
                            {comments[post.postId]?.map((comment, idx) => (
                                <div key={idx} className="comment">
                                    {comment.content}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserPosts;
