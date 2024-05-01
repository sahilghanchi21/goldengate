import React, { useEffect, useState } from 'react';
import "./Profile.css";
import Layout from '../../layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { clearUserData, fetchProfileDetailsById, fetchUserDetailsById, logout, profilleInfoRegister } from '../../redux/features/auth/authSlice';
import Skill from './skills/Skill';
import axios from 'axios';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    // const profile = useSelector((state) => state.auth.userProfileData.data || state.auth.userProfileData);
    const [fetchedProfile, setFetchedProfile] = useState(null); // State to store fetched profile
    console.log(fetchedProfile, "fetchedProfile")
    const userToken = useSelector((state) => state.auth.user.token);
    console.log(userToken, "userToken")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (userId) {
    //         dispatch(fetchUserDetailsById(userId));
    //     }
    // }, [dispatch, userId]);

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
                dispatch(profilleInfoRegister(fetchedProfile))
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserProfile();

    }, []);

    const handleLogOut = async () => {
        try {
            dispatch(clearUserData())
            // const userData = {
            //     sessionToken: user.sessionToken,
            // };
            // await dispatch(logout(userData));
            // // dispatch(clearUserData());
            navigate('/');
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    const userDetails = useSelector((state) => state.auth.user);

    // console.log("Profile details:", profile); // Log profile details to console

    return (
        <Layout>
            <div className='main-profile-container'>
                <section className='profile-container'>
                    <div className='banner-container'>
                        <img className='banner-img' src={fetchedProfile?.backgroundImage} alt="banner" />
                    </div>
                    <div className='profile-img-container'>
                        <img className="profile-img" src={fetchedProfile?.avatar} alt="" />
                    </div>
                    <div className='information-container'>
                        {fetchedProfile && (
                            <>
                                <h1>{fetchedProfile?.fullName}</h1>
                                <h4 className='job-title'>{fetchedProfile?.bio}</h4>
                                <h6>{fetchedProfile?.otherDetails}</h6>
                            </>
                        )}
                    </div>
                    <div className='logout-container'>
                        <div className='logout-btn' onClick={handleLogOut}>
                            LogOut
                        </div>
                        <IoMdLogOut />
                    </div>
                </section>
                <section>
                    <Skill />
                </section>
            </div>
        </Layout>
    );
};

export default Profile;
