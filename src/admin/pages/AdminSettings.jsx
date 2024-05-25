

import React, { useEffect, useState } from 'react';
import "../../pages/profile/Profile.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { clearUserData, profilleInfoRegister } from '../../redux/features/auth/authSlice';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserPosts from '../../components/userPosts/UserPosts';
import Admin from '../Admin';
import Skill from '../../pages/profile/skills/Skill';

const AdminSettings = () => {
    const user = useSelector((state) => state.auth.user);
    const [fetchedProfile, setFetchedProfile] = useState(null);
    const [fetchedPosts, setFetchedPosts] = useState([]);
    const [fetchedSkills, setFetchedSkills] = useState([]);
    const userToken = useSelector((state) => state.auth.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${userToken}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                };
                const response = await axios.get('http://localhost:7173/api/v1/profiles/me', { headers });
                setFetchedProfile(response.data);
                dispatch(profilleInfoRegister(response.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserProfile();
    }, [dispatch, userToken]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${userToken}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                };
                const response = await axios.get('http://localhost:7173/api/v1/postRequest/me', { headers });
                setFetchedPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserPosts();
    }, [userToken]);

    console.log(fetchedPosts, "post");

    useEffect(() => {
        const fetchUserSkill = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${userToken}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                };
                const response = await axios.get('http://localhost:7173/api/v1/userskills/me', { headers });
                setFetchedSkills(response.data);
                dispatch(profilleInfoRegister(response.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserSkill();
    }, [dispatch, userToken]);

    const handleLogOut = async () => {
        try {
            dispatch(clearUserData());
            navigate('/');
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    return (
        <Admin>
            <div className='main-profile-container'>
                <section className='profile-container'>
                    <div className='banner-container'>
                        <img className='banner-img' src={fetchedProfile?.backgroundImage} alt="banner" />
                    </div>
                    <div className='profile-img-container-admin'>
                        <img className="profile-img-admin" src={fetchedProfile?.avatar} alt="" />
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
                    <Skill fetchedSkills={fetchedSkills} />
                </section>
                <section className='posts-container'>
                    {Array.isArray(fetchedPosts) && <UserPosts fetchedPosts={fetchedPosts} />}
                </section>
            </div>
        </Admin>
    );
};

export default AdminSettings;
