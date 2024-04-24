import React, { useState } from 'react';
import "./Register.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header/Header';
import { profilleInfoRegister } from '../../../redux/features/auth/authSlice';
const NameRegister = () => {
    const [registerData, setRegisterData] = useState({
        fullName: "",
        bio: "",
        otherDetails: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target || e;

        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newRegisterData = {
            fullName: registerData.fullName,
            bio: registerData.bio,
            otherDetails: registerData.otherDetails,
        };

        setRegisterData(newRegisterData);
        // console.log(newRegisterData, "newRegisterData");
        try {
            console.log(newRegisterData, "fullName-bio-otherDetails")
            dispatch(profilleInfoRegister(newRegisterData));
            navigate("/upload-profile-image");
        } catch (error) {
            console.log(error);
        }
        setRegisterData({
            fullName: "",
            bio: "",
            otherDetails: "",
        });
    }
    return (
        <>
            {/* <Header /> */}
            <div className='box-container'>
                <form onSubmit={handleSubmit}>
                    <p className='title'>Make the most of your professional life</p>

                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                            value={registerData.fullName}
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            placeholder="Bio"
                            name="bio"
                            value={registerData.bio}
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            placeholder="Other Details"
                            name="otherDetails"
                            value={registerData.otherDetails}
                            required
                            onChange={handleChange} />
                    </div>
                    <button type='submit' className='btn'>Continue</button>
                </form>
            </div>

        </>
    )
}

export default NameRegister
