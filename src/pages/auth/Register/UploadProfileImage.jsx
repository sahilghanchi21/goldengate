import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uploadImage from "../../../assets/Image upload-bro.png";
import { convertToBase64 } from '../../../utils';
import { registerProfile } from '../../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UploadProfileImage = () => {
    const [avatar, setAvatar] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const userInfo = useSelector((state) => state.auth.userPersonalInfo);
    const userToken = useSelector((state) => state.auth.user.token);
    console.log(userInfo, "userInfo")
    console.log(userToken, "userToken")


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const binaryData = reader.result;
                const avatarBase64 = await convertToBase64(binaryData);
                console.log(avatarBase64);
                setAvatar(avatarBase64);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleBackgroundImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const binaryData = reader.result;
                const backgroundImageBase64 = await convertToBase64(binaryData);
                console.log(backgroundImageBase64);
                setBackgroundImage(backgroundImageBase64);
            };
            reader.readAsArrayBuffer(file);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRegisterData = {
            avatar: avatar,
            backgroundImage: backgroundImage,
            fullName: userInfo.fullName,
            bio: userInfo.bio,
            otherDetails: userInfo.otherDetails,
            profileType: "User"
        };
        try {
            console.log(newRegisterData, "Profile details")
            // Use Axios to make a POST request
            const headers = {
                'Authorization': `Bearer ${userToken}`, "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }; // Change 'my-token' to your actual token
            await axios.post('http://localhost:7173/api/v1/profiles', newRegisterData, { headers });
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
        setBackgroundImage("");
        setAvatar("");
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newRegisterData = {
    //         avatar: avatar,
    //         backgroundImage: backgroundImage,
    //         fullName: userInfo.fullName,
    //         bio: userInfo.bio,
    //         otherDetails: userInfo.otherDetails,
    //         profileType: "User"

    //     };
    //     try {
    //         console.log(newRegisterData, "Profile details")
    //         await dispatch(registerProfile(newRegisterData));
    //         navigate("/home");
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setBackgroundImage("");
    //     setAvatar("");

    // };

    return (
        <div className='box-container'>
            <form onSubmit={handleSubmit}>
                <div className="image-upload">
                    <div
                        className="image-preview"
                        style={{ backgroundImage: `url(${avatar || uploadImage})` }}
                        onClick={() => document.getElementById('avatarInput').click()}
                    >
                        <p>Avatar</p>
                        {!avatar && <img src={uploadImage} alt='upload a image' />}
                    </div>
                    <div
                        className="image-preview"
                        style={{ backgroundImage: `url(${backgroundImage || uploadImage})` }}
                        onClick={() => document.getElementById('backgroundImageInput').click()}
                    >
                        <p>Background Image</p>
                        {!backgroundImage && <img src={uploadImage} alt='upload a image' />}
                    </div>
                    <input
                        type="file"
                        id="avatarInput"
                        style={{ display: 'none' }}
                        onChange={handleAvatarUpload}
                    />
                    <input
                        type="file"
                        id="backgroundImageInput"
                        style={{ display: 'none' }}
                        onChange={handleBackgroundImageUpload}
                    />
                </div>
                <button style={{ width: "300px", borderRadius: "40px" }} type='submit' className='btn'>Add photo</button>
            </form>
        </div>
    );
}

export default UploadProfileImage;

