import React, { useEffect, useState } from 'react';
import "./Auth.css";
import rgisterSVG from "../../assets/Sign up-amico.png"
import loginSVG from "../../assets/Login-pana.png"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typewriter from '../../components/typeWriter/TypeWriter';
import Header from '../../components/header/Header';
import { beforeLogin, beforeRegister, login, register } from '../../redux/features/auth/authSlice';
import axios from 'axios';
const Auth = () => {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "", // New state for confirm password
    });


    const [fetchedProfile, setFetchedProfile] = useState(null);
    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const userToken = useSelector((state) => state.auth.user?.token);

    // const profile = useSelector((state) => state.auth.userProfileData);
    // const { isLoading, isLoggedIn, isSuccess } = useSelector(
    //     (state) => state.auth
    // );
    const { user, userProfileData, isLoading, isLoggedIn } = useSelector((state) => state.auth);
    console.log(userProfileData, "userProfileData in Authentication")

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Make a POST request to create a new profile
                const headers = {
                    'Authorization': `Bearer ${userToken}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                };
                const response = await axios.get('http://localhost:7173/api/v1/profiles/me', { headers });
                setFetchedProfile(response.data)
                // dispatch(profilleInfoRegister(fetchedProfile))
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserProfile();

    }, [fetchedProfile]);

    console.log(fetchedProfile, "profile in Auth");

    useEffect(() => {
        // Check if the mode is stored in localStorage
        const storedMode = localStorage.getItem('authMode');
        if (storedMode) {
            setIsSignUpMode(storedMode === 'signup');
        }
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
        localStorage.setItem('authMode', 'signup');
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
        localStorage.setItem('authMode', 'signin');
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target || e;

        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };
    const handleLoginChange = (e) => {
        const { name, value } = e.target || e;

        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };


    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        // Regex patterns
        const usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation
        let isValid = true;
        if (!usernamePattern.test(registerData.username)) {
            setUsernameError("Username must be 3-16 characters long and can contain letters, numbers, underscores, and hyphens.");
            isValid = false;
        } else {
            setUsernameError("");
        }
        if (!emailPattern.test(registerData.email)) {
            setEmailError("Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError("");
        }
        if (registerData.password !== registerData.confirmPassword) {
            setPasswordError("Passwords do not match");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (!isValid) return;

        const newRegisterData = {
            username: registerData.username,
            email: registerData.email,
            password: registerData.password,
            confirmPassword: registerData.confirmPassword,
        };

        try {
            await dispatch(register(newRegisterData));
            navigate("/enter-personal-details");
        } catch (error) {
            console.log(error);
        }
        setRegisterData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    // console.log(profile.user, "profile user role in Auth:")
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const newLoginData = {
            email: loginData.email,
            password: loginData.password,
        };

        setRegisterData(newLoginData);

        try {
            console.log(newLoginData, "newLoginData");
            await dispatch(login(newLoginData));
            if (isLoggedIn && fetchedProfile === null || isLoggedIn && typeof fetchedProfile === 'undefined') {
                navigate("/enter-personal-details");
            }
            // else if (fetchedProfile?.user?.role !== 'User') {
            //     navigate("/admin-dashboard")
            // }
            else {
                navigate("/home");
            }
        } catch (error) {
            console.log(error);
        }
        setRegisterData({
            email: "",
            password: "",
        });
    };
    // useEffect(() => {
    //     if (isLoggedIn && userProfileData) {
    //         if (userProfileData.user.role !== 'User') {
    //             navigate("/admin-dashboard");
    //         } else {
    //             navigate("/home");
    //         }
    //     }
    // }, [isLoggedIn, userProfileData, navigate]);

    return (
        <>
            {/* <Header /> */}
            <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        {/* LOGIN */}
                        <form className="sign-in-form" onSubmit={handleLoginSubmit}>
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="username"
                                    name="email"
                                    value={loginData.email}
                                    required
                                    onChange={handleLoginChange} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={loginData.password}
                                    required
                                    onChange={handleLoginChange} />
                            </div>
                            <input type="submit" className="btn solid" />
                        </form>
                        {/* REGISTER */}
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
                                    onChange={handleRegisterChange} />
                            </div>
                            {usernameError && <p className="error-message">{usernameError}</p>}
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={registerData.email}
                                    required
                                    onChange={handleRegisterChange} />
                            </div>
                            {emailError && <p className="error-message">{emailError}</p>}
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={registerData.password}
                                    required
                                    onChange={handleRegisterChange} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={registerData.confirmPassword}
                                    required
                                    onChange={handleRegisterChange} />
                            </div>
                            {passwordError && <p className="error-message">{passwordError}</p>}
                            <input type="submit" className="btn" />
                        </form>
                        {/* <form className="sign-up-form" onSubmit={handleRegisterSubmit}>
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="username"
                                    name="username"
                                    value={registerData.username}
                                    required
                                    onChange={handleRegisterChange} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={registerData.email}
                                    required
                                    onChange={handleRegisterChange} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={registerData.password}
                                    required
                                    onChange={handleRegisterChange} />
                            </div>
                            <input type="submit" className="btn" />
                        </form> */}
                    </div>
                </div>
                <div className="panels-container">

                    <div className="panel left-panel">
                        <div className="content">
                            <h1 className='logo-title'>GOLDEN GATE</h1>
                            <h3>
                                New to our community ?
                            </h3>
                            <p>Discover a world of possibilities! Join us and explore a vibrant community where ideas flourish and connections thrive.
                            </p>
                            <button className="btn transparent" onClick={handleSignUpClick}>
                                Sign up
                            </button>
                        </div>
                        {/* <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="image" alt="" /> */}
                        <img src={loginSVG} className="image" alt="" />
                    </div>

                    <div className="panel right-panel">
                        <div className="content">
                            <h1 className='logo-title'>GOLDEN GATE</h1>
                            <h3>One of Our Valued Members
                            </h3>
                            <p>Thank you for being part of our community. Your presence enriches our shared experiences. Let's continue this journey together!
                            </p>
                            <button className="btn transparent" onClick={handleSignInClick}>
                                Sign in
                            </button>

                        </div>
                        <img src={rgisterSVG} className="image" alt="" />
                        {/* <img src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png" className="image" alt="" /> */}
                    </div>

                </div>
            </div>
        </>

    );
};

export default Auth;



{/* <select
    style={{
        border: "none"
    }}
    className="input-field"
    name="role"
    value={registerData.role}
    required
    onChange={handleRegisterChange}
>
    <option className='input-option' value="" disabled>Select User Type</option>
    <option className='input-option' value="Admin">Admin</option>
    <option className='input-option' value="Investor">Investor</option>
    <option className='input-option' value="Advisor">Advisor</option>
    <option className='input-option' value="Startup">Startup</option>
    <option className='input-option' value="Company">Company</option>
    <option className='input-option' value="User">User</option>
    <option className='input-option' value="Institute">Institute</option>
</select> */}