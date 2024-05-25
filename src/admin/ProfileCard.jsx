
import React, { useState } from 'react';
import "./ProfileCard.css"
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import EditUser from './pages/EditUser';
const ProfileCard = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  if (!profile) {
    return <div>Invalid profile data</div>;
  }

  const { fullName, bio, avatar } = profile;

  return (
    <div className="profile-card">
      {isEditing ? (
        <EditUser profile={profile} onUpdate={onUpdate} />
      ) : (
        <>

          <div className="profile-info">
            <img src={avatar} alt={`${fullName}'s avatar`} className="profile-avatar" />
            <h2>{fullName}</h2>

          </div>
          <FaEdit onClick={handleEditClick} className="edit-icon" />
        </>)}
      {isEditing && <button onClick={handleCancelClick}>Cancel</button>}


      {/* <div className="profile-card">
        {isEditing ? (
          <EditUser profile={profile} onUpdate={onUpdate} />
        ) : (
          <>
            <h3>{profile.fullName}</h3>
            <p>{profile.profileType}</p>
            <button onClick={handleEditClick}>Edit</button>
          </>
        )}
        {isEditing && <button onClick={handleCancelClick}>Cancel</button>}
      </div> */}
    </div>
  );
};

export default ProfileCard;
