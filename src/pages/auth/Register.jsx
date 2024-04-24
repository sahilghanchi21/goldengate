import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/features/auth/authSlice';
import './Auth.css'; // Ensure you import your CSS file

const Register = () => {
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(register(registerData));
            navigate("/enter-personal-details"); // Navigate to the next step after successful registration
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form className="sign-up-form" onSubmit={handleRegisterSubmit}>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="username"
                                name="username"
                                value={registerData.username}
                                required
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={registerData.email}
                                required
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={registerData.password}
                                required
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <select
                            name="role"
                            value={registerData.role}
                            required
                            onChange={handleRegisterChange}
                        >
                            <option value="" disabled>Select User Type</option>
                            <option value="Admin">Admin</option>
                            <option value="Investor">Investor</option>
                            <option value="Advisor">Advisor</option>
                            <option value="Startup">Startup</option>
                            <option value="Company">Company</option>
                            <option value="User">User</option>
                            <option value="Institute">Institute</option>
                        </select>
                        <input type="submit" className="btn" value="Sign up" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
