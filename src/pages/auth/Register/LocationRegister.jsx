import React, { useState } from 'react';
import "./Register.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header/Header';
import { beforeRegister, location } from '../../../redux/features/auth/authSlice';
const LocationRegister = () => {
    const [registerData, setRegisterData] = useState({
        country: "",
        city: ""
    });
    const user = useSelector((state) => state.auth.userFnameLname);
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
            country: registerData.country,
            city: registerData.city,
        };

        setRegisterData(newRegisterData);
        // console.log(newRegisterData, "newRegisterData");
        try {
            console.log(newRegisterData, "country-city")
            dispatch(location(newRegisterData));
            navigate("/enter-job-title");
        } catch (error) {
            console.log(error);
        }
        setRegisterData({
            country: "",
            city: "",
        });
    }
    console.log(user, "user")
    return (
        <>
            <Header />
            <div className='box-container'>
                <form onSubmit={handleSubmit}>
                    <p className='title'>Welcome, {user.firstName} {user.lastName} What's your location?</p>

                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            placeholder="Country/Region *"
                            name="country"
                            value={registerData.country}
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            placeholder="City/District *"
                            name="city"
                            value={registerData.city}
                            required
                            onChange={handleChange} />
                    </div>
                    <button type='submit' className='btn'>Next</button>
                </form>
            </div>

        </>
    )
}

export default LocationRegister
