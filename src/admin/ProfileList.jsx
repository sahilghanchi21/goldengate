
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProfileCard from "./ProfileCard";
// import { useSelector } from "react-redux";

// const ProfileList = () => {
//     const [profiles, setProfiles] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const userToken = useSelector((state) => state.auth.user.token);

//     useEffect(() => {
//         const fetchProfiles = async () => {
//             try {
//                 const headers = {
//                     'Authorization': `Bearer ${userToken}`,
//                     "Access-Control-Allow-Origin": "*",
//                     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//                 };
//                 const response = await axios.get('http://localhost:7173/api/v1/profiles', { headers });
//                 setProfiles(response.data.content);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Failed to fetch profiles:", error);
//                 setLoading(false);
//             }
//         };

//         fetchProfiles();
//     }, [userToken]);

//     // const updateProfile = async (profileId, updatedProfile) => {
//     //     try {
//     //         const headers = {
//     //             'Authorization': `Bearer ${userToken}`,
//     //             "Access-Control-Allow-Origin": "*",
//     //             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//     //         };
//     //         const response = await axios.put(`http://localhost:7173/api/v1/profiles/${profileId}`, updatedProfile, { headers });
//     //         return response.data;
//     //     } catch (error) {
//     //         console.error("Failed to update profile:", error);
//     //         throw error;
//     //     }
//     // };

//     console.log("profiles:", profiles);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="profile-list">
//             {profiles.map((profile) => (
//                 <ProfileCard key={profile.profileId} profile={profile}  />
//             ))}
//         </div>
//     );
// };

// export default ProfileList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import EditProfileCard from "./EditProfileCard";  // Import the new EditProfileCard component
import ProfileCard from "./ProfileCard";

const ProfileList = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const userToken = useSelector((state) => state.auth.user.token);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${userToken}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                };
                const response = await axios.get('http://localhost:7173/api/v1/profiles', { headers });
                setProfiles(response.data.content);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch profiles:", error);
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [userToken]);

    const updateProfile = async (profileId, updatedProfile) => {
        try {
            const headers = {
                'Authorization': `Bearer ${userToken}`,
                "Content-Type": "application/json"
            };
            const response = await axios.put(`http://localhost:7173/api/v1/profiles/${profileId}`, updatedProfile, { headers });
            setProfiles(profiles.map(profile => profile.profileId === profileId ? response.data : profile));
            console.log(profiles, "updated profile");
        } catch (error) {
            console.error("Failed to update profile:", error);
            throw error;
        }
    };

    console.log("profiles:", profiles);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-list">
            {profiles.map((profile) => (
                <ProfileCard key={profile.profileId} profile={profile} onUpdate={updateProfile} />
                // <EditProfileCard key={profile.profileId} profile={profile} onUpdate={updateProfile} />
            ))}
        </div>
    );
};

export default ProfileList;
