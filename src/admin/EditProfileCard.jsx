import React, { useState } from 'react';
import EditUser from './pages/EditUser';
import './EditProfileCard.css';

const EditProfileCard = ({ profile, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <div className="profile-card">
            {isEditing ? (
                <EditUser profile={profile} onUpdate={onUpdate} />
            ) : (
                <>
                    <h3>{profile.fullName}</h3>
                    <p>{profile.profileType}</p>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}
            {isEditing && <button onClick={handleCancelClick} className="cancel-button">Cancel</button>}
        </div>
    );
};

export default EditProfileCard;
