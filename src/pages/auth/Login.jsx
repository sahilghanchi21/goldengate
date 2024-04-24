import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/features/auth/authSlice';
import './Auth.css'; // Ensure you import your CSS file

const Login = () => {
    const [loginData, setLoginData] = useState({
        usernameOrEmail: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(loginData));
            navigate("/home"); // Navigate to home page after successful login
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form className="sign-in-form" onSubmit={handleLoginSubmit}>
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="username"
                                name="usernameOrEmail"
                                value={loginData.usernameOrEmail}
                                required
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={loginData.password}
                                required
                                onChange={handleLoginChange}
                            />
                        </div>
                        <input type="submit" className="btn" value="Sign in" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
