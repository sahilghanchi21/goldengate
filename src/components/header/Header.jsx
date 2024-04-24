import React, { useEffect, useState } from 'react';
import './header.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetailsById } from '../../redux/features/auth/authSlice';

const Header = () => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    const user = useSelector((state) => state.auth.user ?? state.auth.userData);

    const userData = useSelector((state) => state.auth.userProfileData);
    console.log(user, "user")
    // console.log(user.userId, "userId")
    console.log(userData, "userData")

    const dispatch = useDispatch()




    // useEffect(() => {
    //     if (userData.userId) {
    //         console.log(userData.userId, "user id profile")
    //         dispatch(fetchUserDetailsById(userData.userId));
    //     }
    // }, [user.userId]);

    const location = useLocation();

    useEffect(() => {
        // Set activeLink based on the current route
        switch (location.pathname) {
            case '/home':
                setActiveLink('home');
                break;
            case '/my-network':
                setActiveLink('network');
                break;
            case '/messaging':
                setActiveLink('messaging');
                break;
            case '/notifications':
                setActiveLink('notifications');
                break;
            case '/for-business':
                setActiveLink('ForBusiness');
                break;
            case '/profile':
                setActiveLink('profile');
                break;
            default:
                setActiveLink('');
        }
    }, [location]); // This effect runs on component mount and when location changes
    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
        if (isNavVisible) {
            toggleNav();
        }
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    {/* <img src="/path/to/your/logo.png" alt="Logo" /> */}
                    <div>GoldenGate🥇</div>


                </div>
                <div className="hamburger" onClick={toggleNav}>
                    {isNavVisible ? (
                        <h1 className="cross">
                            <div></div>
                            <div></div>
                        </h1>
                    ) : (
                        <>
                            <div></div>
                            <div></div>
                            <div></div>
                        </>
                    )}
                </div>
                <nav className={`nav ${isNavVisible ? 'nav-visible' : ''}`}>
                    <ul className="nav-links">
                        <li><Link to="/home" className={`nav-link ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleLinkClick('home')}>Home</Link></li>
                        <li><Link to="/my-network" className={`nav-link ${activeLink === 'network' ? 'active' : ''}`} onClick={() => handleLinkClick('network')}>My Network</Link></li>
                        <li><Link to="/messaging" className={`nav-link ${activeLink === 'messaging' ? 'active' : ''}`} onClick={() => handleLinkClick('messaging')}>Messaging</Link></li>
                        <li><Link to="/notifications" className={`nav-link ${activeLink === 'notifications' ? 'active' : ''}`} onClick={() => handleLinkClick('notifications')}>Notifications</Link></li>
                        <li><Link to="/for-business" className={`nav-link ${activeLink === 'ForBusiness' ? 'active' : ''}`} onClick={() => handleLinkClick('ForBusiness')}>For Business</Link></li>
                        {/* <li><Link to={`/profile/${user.userId}`} className={`nav-link ${activeLink === 'ForBusiness' ? 'active' : ''}`} onClick={() => handleLinkClick('ForBusiness')}>Profile</Link></li> */}

                    </ul>
                    {/* <div className="username">Username</div> */}
                    {/* <form className="form">
                        <label htmlFor="search" className="search-label">
                            <input
                                className="input"
                                type="text"
                                placeholder="Search Twitter"
                                id="search"
                                onChange={(e) => console.log(e.target.value)}
                            />
                            <div className="fancy-bg"></div>
                            <div className="search"></div>
                            <button className="close-btn" type="reset">  <h1 className="cross">
                                <div></div>
                                <div></div>
                            </h1></button>
                        </label>
                    </form> */}
                </nav>
                <div className={`profile-nav ${isNavVisible ? 'profile-visible' : ''}`} >
                    <ul className="nav-links">
                        <li><Link to={`/profile/${user?.userId}`} className={`nav-link ${activeLink === 'profile' ? 'active' : ''}`} onClick={() => handleLinkClick('profile')}>{user?.username}</Link></li>
                    </ul>
                </div>
            </div>
        </header >
    );
};

export default Header;
