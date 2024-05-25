
// import React, { useState } from 'react';

// const EditUser = ({ profile, onUpdate }) => {
//     const [formData, setFormData] = useState(profile);
//     console.log(formData, "formData");

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await onUpdate(profile.profileId, formData);
//             console.log('Profile updated successfully!');
//         } catch (error) {
//             console.error('Failed to update profile:', error);
//             console.log('Failed to update profile. Please try again.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="profileType">Profile Type</label>
//                 <select
//                     id="profileType"
//                     name="profileType"
//                     value={formData.profileType}
//                     onChange={handleChange}
//                 >
//                     <option value="User">User</option>
//                     <option value="Admin">Admin</option>
//                     <option value="Moderator">Moderator</option>
//                     <option value="Support_Admin">Support Admin</option>
//                 </select>
//             </div>
//             <button type="submit">Update Profile</button>
//         </form>
//     );
// };

// export default EditUser;
import React, { useState } from 'react';
import './EditUser.css';

const EditUser = ({ profile, onUpdate }) => {
    const [formData, setFormData] = useState(profile);
    console.log(formData, "formData");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onUpdate(profile.profileId, formData);
            console.log('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            console.log('Failed to update profile. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-user-form">
            <h2>{formData.fullName}</h2>
            <div>
                <label htmlFor="profileType">Profile Type</label>
                <select
                    id="profileType"
                    name="profileType"
                    value={formData.profileType}
                    onChange={handleChange}
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Support_Admin">Support Admin</option>
                </select>
            </div>
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default EditUser;
