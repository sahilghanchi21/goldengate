import React, { useState } from 'react';
import { MdMoreHoriz, MdOutlineEmojiEmotions, MdPermMedia } from "react-icons/md";
import { PiBagSimpleFill, PiArticleFill } from "react-icons/pi";
import { IoClose, IoDocumentText } from "react-icons/io5";
import { FaCalendarAlt, FaPoll } from "react-icons/fa";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { convertToBase64 } from '../../utils';
import uploadImage from "../../assets/Image upload-bro.png";
import { userPosts } from '../../redux/features/auth/authSlice';

const CreatePost = () => {

    const [postData, setPostData] = useState({
        content: "",
        images: []
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const user = useSelector((state) => state.auth.user);
    const userToken = useSelector((state) => state.auth.user?.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAvatarUpload = async (e) => {
        const files = Array.from(e.target.files);
        const base64Promises = files.map(file => convertToBase64(file));
        try {
            const base64Images = await Promise.all(base64Promises);
            setPostData(prevData => ({
                ...prevData,
                images: [...prevData.images, ...base64Images]
            }));
        } catch (error) {
            console.error("Error converting images to base64", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRegisterData = {
            images: postData.images,
            content: postData.content
        };
        try {
            const headers = {
                'Authorization': `Bearer ${userToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            };
            const response = await axios.post('http://localhost:7173/api/v1/postRequest', newRegisterData, { headers });

            dispatch(userPosts(response.data));
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
        setPostData({ content: "", images: [] });
    };

    const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji);
        setPostData(prevData => ({
            ...prevData,
            content: prevData.content + emoji.native
        }));
    };

    const toggleEmojiModal = () => {
        setIsEmojiModalOpen(!isEmojiModalOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    console.log("postData :", postData)

    return (
        <>
            <div className="create-post-section">
                <div className="upper-section">
                    <div className="user-info">
                        <Link to={`/profile/${user?.userId}`}>
                            <img src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User Profile" className="profile-pic" />
                        </Link>
                    </div>
                    <button onClick={toggleModal} className="create-post-button">Create Post</button>
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <div className="modal-user-info">
                                    <div className='model-user-information'>
                                        <img src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User Profile" className="profile-pic" />
                                        <div className="username">Username</div>
                                    </div>
                                    <div className='close-modal-button ' onClick={toggleModal}><IoClose /></div>
                                </div>
                                <div className='post-content-container'>


                                    <textarea
                                        type="text"
                                        placeholder="What do you want to talk about?"
                                        className="post-input"
                                        name='content'
                                        value={postData.content}
                                        onChange={handleChange}
                                    ></textarea>
                                    <div className="image-preview-container">
                                        {postData.images.length === 0 && (
                                            <div
                                                className="image-preview"
                                                style={{ backgroundImage: `url(${uploadImage})` }}
                                                onClick={() => document.getElementById('avatarInput').click()}
                                            >
                                                <p>Upload Images</p>
                                            </div>
                                        )}
                                        {postData.images.length > 0 && postData.images.map((image, index) => (
                                            <div key={index} className="image-preview" style={{ backgroundImage: `url(${image})` }}>
                                                <img src={image} alt={`Upload preview ${index}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    id="avatarInput"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={handleAvatarUpload}
                                />
                                <div className='model-footer'>
                                    {isEmojiModalOpen && (
                                        <div className="emoji-modal">
                                            <div className="emoji-modal-content">
                                                <div className='emoji-modal-content-header'>
                                                    <p>Select an Emoji</p>
                                                    <div onClick={toggleEmojiModal}><IoClose /></div>
                                                </div>
                                                <div className='emojii-keyboard'>
                                                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="upper-footer">
                                        <MdOutlineEmojiEmotions className='model-footer-icons' onClick={toggleEmojiModal} />
                                        <MdPermMedia className='model-footer-icons' onClick={() => document.getElementById('avatarInput').click()} />
                                        <FaCalendarAlt className='model-footer-icons' />
                                        <IoDocumentText className='model-footer-icons' />
                                        <FaPoll className='model-footer-icons' />
                                        <PiBagSimpleFill className='model-footer-icons' />
                                    </div>
                                    <div className="bottom-footer">
                                        <button onClick={handleSubmit}>Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="post-options">
                    <div className='inner-post-options'>
                        <MdPermMedia className='post-icons' />
                        <div className='post-options-btn'>Media</div>
                    </div>
                    <div className='inner-post-options'>
                        <PiBagSimpleFill className='post-icons' />
                        <div className='post-options-btn'>Event</div>
                    </div>
                    <div className='inner-post-options'>
                        <PiArticleFill className='post-icons' />
                        <div className='post-options-btn'>Write Article</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePost;
