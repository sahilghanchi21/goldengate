import React, { useState } from 'react';
import "./Register.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header/Header';
import { beforeRegister, job } from '../../../redux/features/auth/authSlice';
const JonRegister = () => {
    const [registerData, setRegisterData] = useState({
        jobTitle: "",
        empType: "",
        companyName: ""
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
            jobTitle: registerData.jobTitle,
            empType: registerData.empType,
            companyName: registerData.companyName,
        };

        setRegisterData(newRegisterData);
        // console.log(newRegisterData, "newRegisterData");
        try {
            console.log(newRegisterData, "jobTitle-empType-companyName")
            dispatch(job(newRegisterData));
            navigate("/upload-profile-image");
        } catch (error) {
            console.log(error);
        }
        setRegisterData({
            jobTitle: "",
            empType: "",
            companyName: "",
        });
    }
    return (
        <>
            <Header />
            <div className='box-container'>
                <form onSubmit={handleSubmit}>
                    <p className='title'>Your profile helps you new people and opportunities</p>

                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            placeholder="Most recent job title *"
                            name="jobTitle"
                            value={registerData.jobTitle}
                            required
                            onChange={handleChange} />
                    </div>
                    <select
                        style={{
                            border: "none"
                        }}
                        className="input-field"
                        name="empType"
                        value={registerData.empType}
                        onChange={handleChange}
                        required
                    >
                        <i className="fas fa-envelope"></i>
                        <option className='input-option' value="" disabled>Select Employment Type</option>
                        <option className='input-option' value="Part-time">Part-time</option>
                        <option className='input-option' value="Full-time">Full-time</option>
                    </select>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            placeholder="Most recent company *"
                            name="companyName"
                            value={registerData.companyName}
                            required
                            onChange={handleChange} />
                    </div>
                    <button type='submit' className='btn'>Continue</button>
                </form>
            </div>

        </>
    )
}

export default JonRegister
