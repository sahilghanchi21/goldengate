// import React, { useEffect, useState } from 'react';
// import "./Profile.css";
// import Layout from '../../layout/Layout'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { IoMdLogOut } from 'react-icons/io';
// import { clearUserData, fetchProfileDetailsById, fetchUserDetailsById, logout, profilleInfoRegister } from '../../redux/features/auth/authSlice';
// import Skill from './skills/Skill';
// import axios from 'axios';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import UserPosts from '../../components/userPosts/UserPosts';

// const Profile = () => {
//     const user = useSelector((state) => state.auth.user);
//     const [fetchedProfile, setFetchedProfile] = useState(null);
//     const [fetchedPosts, setFetchedPosts] = useState(null);
//     const [fetchedSkills, setFetchedSkills] = useState(null);
//     const userToken = useSelector((state) => state.auth.user.token);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const headers = {
//                     'Authorization': `Bearer ${userToken}`,
//                     "Access-Control-Allow-Origin": "*",
//                     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//                 };
//                 const response = await axios.get('http://localhost:7173/api/v1/profiles/me', { headers });
//                 setFetchedProfile(response.data)
//                 dispatch(profilleInfoRegister(response.data))
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchUserProfile();
//     }, []);

//     useEffect(() => {
//         const fetchUserPosts = async () => {
//             try {
//                 const headers = {
//                     'Authorization': `Bearer ${userToken}`,
//                     "Access-Control-Allow-Origin": "*",
//                     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//                 };
//                 const response = await axios.get('http://localhost:7173/api/v1/postRequest/me', { headers });
//                 setFetchedPosts(response.data)
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchUserPosts();
//     }, []);

//     console.log(fetchedPosts, "post")

//     useEffect(() => {
//         const fetchUserSkill = async () => {
//             try {
//                 const headers = {
//                     'Authorization': `Bearer ${userToken}`,
//                     "Access-Control-Allow-Origin": "*",
//                     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//                 };
//                 const response = await axios.get('http://localhost:7173/api/v1/userskills/me', { headers });
//                 setFetchedSkills(response.data)
//                 dispatch(profilleInfoRegister(response.data))
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchUserSkill();
//     }, []);

//     const handleLogOut = async () => {
//         try {
//             dispatch(clearUserData())
//             navigate('/');
//         } catch (error) {
//             console.error("Failed to log out:", error);
//         }
//     };

//     return (
//         <Layout>
//             <div className='main-profile-container'>
//                 <section className='profile-container'>
//                     <div className='banner-container'>
//                         <img className='banner-img' src={fetchedProfile?.backgroundImage} alt="banner" />
//                     </div>
//                     <div className='profile-img-container'>
//                         <img className="profile-img" src={fetchedProfile?.avatar} alt="" />
//                     </div>
//                     <div className='information-container'>
//                         {fetchedProfile && (
//                             <>
//                                 <h1>{fetchedProfile?.fullName}</h1>
//                                 <h4 className='job-title'>{fetchedProfile?.bio}</h4>
//                                 <h6>{fetchedProfile?.otherDetails}</h6>
//                             </>
//                         )}
//                     </div>
//                     <div className='logout-container'>
//                         <div className='logout-btn' onClick={handleLogOut}>
//                             LogOut
//                         </div>
//                         <IoMdLogOut />
//                     </div>
//                 </section>
//                 <section>
//                     <Skill fetchedSkills={fetchedSkills} />
//                 </section>
//                 <section className='posts-container'>
//                     <UserPosts fetchedPosts={fetchedPosts} />
//                 </section>
//             </div >
//         </Layout >
//     );
// };

// export default Profile;




import React, { useEffect, useState } from 'react';
import "./Profile.css";
import Layout from '../../layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { clearUserData, profilleInfoRegister } from '../../redux/features/auth/authSlice';
import Skill from './skills/Skill';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserPosts from '../../components/userPosts/UserPosts';

const Profile = () => {
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
                    <Skill fetchedSkills={fetchedSkills} />
                </section>
                <section className='posts-container'>
                    {Array.isArray(fetchedPosts) && <UserPosts fetchedPosts={fetchedPosts} />}
                </section>
            </div>
        </Layout>
    );
};

export default Profile;
