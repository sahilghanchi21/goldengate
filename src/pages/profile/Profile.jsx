import React, { useEffect, useState } from 'react';
import "./Profile.css";
import Layout from '../../layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { clearUserData, fetchProfileDetailsById, fetchUserDetailsById, logout } from '../../redux/features/auth/authSlice';
import Skill from './skills/Skill';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    // const profile = useSelector((state) => state.auth.userProfileData.data || state.auth.userProfileData);
    const [fetchedProfile, setFetchedProfile] = useState(null); // State to store fetched profile
    console.log(fetchedProfile, "fetchedProfile")
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (userId) {
    //         dispatch(fetchUserDetailsById(userId));
    //     }
    // }, [dispatch, userId]);

    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //         try {
    //             const response = await dispatch(fetchProfileDetailsById(profile.profileId)); // Assuming you need to pass userId to fetch profile details
    //             setFetchedProfile(response.payload); // Store the fetched profile in state
    //         } catch (error) {
    //             console.error("Failed to fetch profile details:", error);
    //         }
    //     };

    //     fetchUserProfile();

    // }, [dispatch, profile.profileId]);

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
                        <img className='banner-img' src="https://t4.ftcdn.net/jpg/02/71/29/75/360_F_271297554_0DAlzyFb8jzYg0lfmUOzyhtMer0orz4h.jpg" alt="banner" />
                    </div>
                    <div className='profile-img-container'>
                        <img className="profile-img" src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                    </div>
                    <div className='information-container'>
                        {fetchedProfile && (
                            <>
                                <h1>{fetchedProfile.fullName}</h1>
                                <h4 className='job-title'>{fetchedProfile.bio}</h4>
                                <h6>{fetchedProfile.otherDetails}</h6>
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
