import React, { useState } from 'react';
import uploadImage from "../../../assets/Image upload-bro.png";

const UploadProfileImage = () => {
    const [avatar, setAvatar] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);

    const handleImageUpload = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataURL = reader.result;
                fetch(dataURL)
                    .then(response => response.blob())
                    .then(blob => {
                        console.log(blob); // Check if blob is correctly obtained
                        setImage(blob); // Set the state with the Blob object
                    });
            };
            reader.readAsDataURL(file); // Read the file as data URL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can access avatar and backgroundImage state here and send them to your backend
    };

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
                        onChange={(e) => handleImageUpload(e, setAvatar)}
                    />
                    <input
                        type="file"
                        id="backgroundImageInput"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageUpload(e, setBackgroundImage)}
                    />
                </div>
                <button style={{ width: "300px", borderRadius: "40px" }} type='submit' className='btn'>Add photo</button>
            </form>
        </div>
    );
}

export default UploadProfileImage;
