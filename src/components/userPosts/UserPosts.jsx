

// import React, { useState, useEffect } from 'react';
// import { MdMoreHoriz } from "react-icons/md";
// import { BiSolidLike, BiLike, BiSolidCommentDetail } from "react-icons/bi";
// import Slider from 'react-slick';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { profilleInfoRegister } from '../../redux/features/auth/authSlice';

// const UserPosts = ({ fetchedPosts = [] }) => {
//     const [showFullCaption, setShowFullCaption] = useState({});
//     const [postLikesStatuses, setPostLikesStatuses] = useState({});
//     const [commentTexts, setCommentTexts] = useState({});
//     const [comments, setComments] = useState({});
//     const [showAllComments, setShowAllComments] = useState({});
//     const [fetchedProfile, setFetchedProfile] = useState(null);
//     const userToken = useSelector((state) => state.auth.user?.token);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const headers = {
//                     'Authorization': `Bearer ${userToken}`,
//                     "Access-Control-Allow-Origin": "*",
//                     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//                 };
//                 const response = await axios.get('http://localhost:7173/api/v1/profiles/me', { headers });
//                 setFetchedProfile(response.data)
//                 dispatch(profilleInfoRegister(response.data))
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchUserProfile();
//     }, []);

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

//     useEffect(() => {
//         const fetchAllComments = async () => {
//             for (let post of fetchedPosts) {
//                 await fetchComments(post.postId);
//             }
//         };

//         fetchAllComments();
//     }, [fetchedPosts]);

//     const toggleCaption = (postId) => {
//         setShowFullCaption((prev) => ({
//             ...prev,
//             [postId]: !prev[postId]
//         }));
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

//     const handlePostUnLiked = async (postId) => {
//         const newLikesStatus = !postLikesStatuses[postId];

//         try {
//             const headers = {
//                 'Authorization': `Bearer ${userToken}`,
//                 "Content-Type": "application/json"
//             };

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

//     const handleCommentChange = (postId, event) => {
//         setCommentTexts({
//             ...commentTexts,
//             [postId]: event.target.value
//         });
//     };

//     const handleCommentSubmit = async (postId) => {
//         const commentText = commentTexts[postId];
//         if (!commentText) return;

//         try {
//             const headers = {
//                 'Authorization': `Bearer ${userToken}`,
//                 "Content-Type": "application/json"
//             };

//             const response = await axios.post(`http://localhost:7173/api/v1/postRequest/newComment`, {
//                 content: commentText,
//                 postId: postId
//             }, { headers });

//             setComments(prevComments => ({
//                 ...prevComments,
//                 [postId]: [...(prevComments[postId] || []), response.data]
//             }));

//             setCommentTexts({
//                 ...commentTexts,
//                 [postId]: ""
//             });

//             console.log(`Comment added to post ${postId}`);
//         } catch (error) {
//             console.error("Error adding comment:", error);
//         }
//     };

//     const fetchComments = async (postId, page = 0, size = 10) => {
//         try {
//             const headers = {
//                 'Authorization': `Bearer ${userToken}`,
//                 "Content-Type": "application/json"
//             };

//             const response = await axios.get(`http://localhost:7173/api/v1/postRequest/${postId}/comments`, {
//                 headers,
//                 params: { page, size }
//             });

//             const fetchedComments = response.data.content;

//             setComments(prevComments => ({
//                 ...prevComments,
//                 [postId]: fetchedComments
//             }));

//             console.log(`Comments fetched for post ${postId}:`, fetchedComments);
//         } catch (error) {
//             console.error("Error fetching comments:", error);
//         }
//     };

//     const handleExpandComments = (postId) => {
//         setShowAllComments((prev) => ({
//             ...prev,
//             [postId]: !prev[postId]
//         }));
//         fetchComments(postId);
//     };

//     console.log('Comments state:', comments);

//     return (
//         <div className="scrollable-posts">
//             {fetchedPosts?.map(post => (
//                 <div className="post-card" key={post.postId}>
//                     <div className='post-card-header'>
//                         <div className="post-user-info">
//                             <img src={fetchedProfile?.avatar} alt="User Profile" className="profile-pic" />
//                             <div className="username">{fetchedProfile?.fullName}</div>
//                         </div>
//                         <div className="more-post-options">
//                             <MdMoreHoriz />
//                         </div>
//                     </div>
//                     <div className="post-card-content">
//                         <p className='caption-content'>
//                             {!showFullCaption[post.postId] && post.content?.length > 100 ? post.content.slice(0, 100) : post.content}
//                             {post.content?.length > 100 &&
//                                 <span style={{ cursor: "pointer", color: "blue" }} className="show-more" onClick={() => toggleCaption(post.postId)}>
//                                     {showFullCaption[post.postId] ? ' Show less' : ' Show more...'}
//                                 </span>
//                             }
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
                                
//                             </div>
//                             <div className='bottom-footer-icons'>
//                                 {post.commentsCount}
//                                 <BiSolidCommentDetail onClick={() => handleExpandComments(post.postId)} /> 
//                             </div>
//                             <div>
//                                 <input
//                                     type="text"
//                                     placeholder="Add a comment..."
//                                     value={commentTexts[post.postId] || ""}
//                                     onChange={(event) => handleCommentChange(post.postId, event)}
//                                 />
//                                 <button onClick={() => handleCommentSubmit(post.postId)}>Submit</button>
//                             </div>
//                         </div>
//                         {showAllComments[post.postId] ? (
//                             comments[post.postId]?.map((comment, idx) => (
//                                 <div key={idx} className="comment">
//                                     {comment.content}
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="view-comments" onClick={() => handleExpandComments(post.postId)}>
//                                 {post.commentsCount === 0 ? "" : ` View all ${post.commentsCount} comments`}

//                             </div>
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default UserPosts;
import React, { useState, useEffect } from 'react';
import { MdMoreHoriz } from "react-icons/md";
import { BiSolidLike, BiLike, BiSolidCommentDetail } from "react-icons/bi";
import Slider from 'react-slick';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { profilleInfoRegister } from '../../redux/features/auth/authSlice';
import CommentModal from '../../components/CommentModal/CommentModal';
import "../CommentModal/CommentModal.css"

const UserPosts = ({ fetchedPosts = [] }) => {
    const [showFullCaption, setShowFullCaption] = useState({});
    const [postLikesStatuses, setPostLikesStatuses] = useState({});
    const [commentTexts, setCommentTexts] = useState({});
    const [comments, setComments] = useState({});
    const [showAllComments, setShowAllComments] = useState({});
    const [fetchedProfile, setFetchedProfile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const userToken = useSelector((state) => state.auth.user?.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${userToken}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                };
                const response = await axios.get('http://localhost:7173/api/v1/profiles/me', { headers });
                setFetchedProfile(response.data);
                dispatch(profilleInfoRegister(response.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserProfile();
    }, [dispatch, userToken]);

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

    useEffect(() => {
        const fetchAllComments = async () => {
            for (let post of fetchedPosts) {
                await fetchComments(post.postId);
            }
        };

        fetchAllComments();
    }, [fetchedPosts]);

    const toggleCaption = (postId) => {
        setShowFullCaption((prev) => ({
            ...prev,
            [postId]: !prev[postId]
        }));
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

    const handleCommentChange = (postId, event) => {
        setCommentTexts({
            ...commentTexts,
            [postId]: event.target.value
        });
    };

    const handleCommentSubmit = async (postId, commentText) => {
        if (!commentText) return;

        try {
            const headers = {
                'Authorization': `Bearer ${userToken}`,
                "Content-Type": "application/json"
            };

            const response = await axios.post(`http://localhost:7173/api/v1/postRequest/newComment`, {
                content: commentText,
                postId: postId
            }, { headers });

            setComments(prevComments => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), response.data]
            }));

            setCommentTexts({
                ...commentTexts,
                [postId]: ""
            });

            console.log(`Comment added to post ${postId}`);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const fetchComments = async (postId, page = 0, size = 10) => {
        try {
            const headers = {
                'Authorization': `Bearer ${userToken}`,
                "Content-Type": "application/json"
            };

            const response = await axios.get(`http://localhost:7173/api/v1/postRequest/${postId}/comments`, {
                headers,
                params: { page, size }
            });

            const fetchedComments = response.data.content;

            setComments(prevComments => ({
                ...prevComments,
                [postId]: fetchedComments
            }));

            console.log(`Comments fetched for post ${postId}:`, fetchedComments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleExpandComments = (postId) => {
        setShowAllComments((prev) => ({
            ...prev,
            [postId]: !prev[postId]
        }));
        fetchComments(postId);
    };

    const openModal = (post) => {
        setCurrentPost(post);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentPost(null);
    };

    console.log('Comments state:', comments);

    return (
        <div className="scrollable-posts">
            {fetchedPosts?.map(post => (
                <div className="post-card" key={post.postId}>
                    <div className='post-card-header'>
                        <div className="post-user-info">
                            <img src={fetchedProfile?.avatar} alt="User Profile" className="profile-pic" />
                            <div className="username">{fetchedProfile?.fullName}</div>
                        </div>
                        <div className="more-post-options">
                            <MdMoreHoriz />
                        </div>
                    </div>
                    <div className="post-card-content">
                        <p className='caption-content'>
                            {!showFullCaption[post.postId] && post.content?.length > 100 ? post.content.slice(0, 100) : post.content}
                            {post.content?.length > 100 &&
                                <span style={{ cursor: "pointer", color: "blue" }} className="show-more" onClick={() => toggleCaption(post.postId)}>
                                    {showFullCaption[post.postId] ? ' Show less' : ' Show more...'}
                                </span>
                            }
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
                                
                            </div>
                            <div className='bottom-footer-icons'>
                                {post.commentsCount}
                                <BiSolidCommentDetail onClick={() => openModal(post)} />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={commentTexts[post.postId] || ""}
                                    onChange={(event) => handleCommentChange(post.postId, event)}
                                />
                                <button onClick={() => handleCommentSubmit(post.postId)}>Submit</button>
                            </div>
                        </div>
                        {/* {showAllComments[post.postId] ? (
                            comments[post.postId]?.map((comment, idx) => (
                                <div key={idx} className="comment">
                                    {comment.content}
                                </div>
                            ))
                        ) : (
                            <div className="view-comments" onClick={() => handleExpandComments(post.postId)}>
                                {post.commentsCount === 0 ? "" : ` View all ${post.commentsCount} comments`}

                            </div>
                        )} */}
                    </div>
                </div>
            ))}
            {currentPost && (
                <CommentModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    post={currentPost}
                    comments={comments[currentPost.postId]}
                    fetchedProfile={fetchedProfile}
                    commentTexts={commentTexts}
                    handleCommentChange={handleCommentChange}
                    handleCommentSubmit={handleCommentSubmit}
                />
            )}
        </div>
    );
};

export default UserPosts;
