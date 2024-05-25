import React, { useState } from 'react';
import "../Auth.css";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { profileSkills } from '../../../redux/features/auth/authSlice';



function UserSkills() {
    const [newSkill, setNewSkill] = useState('');
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const userToken = useSelector((state) => state.auth.user.token);
    console.log(userToken, "userToken in userSkills");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (!newSkill.trim()) return; // Prevent adding empty skills

        const updatedSkills = [...skills, newSkill];
        setSkills(updatedSkills);
        setNewSkill('');
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    // const handleSubmitSkills = async (e) => {
    //     e.preventDefault();
    //     const skillName = skills

    //     try {
    //         // Make a POST request to create a new profile
    //         const headers = {
    //             'Authorization': `Bearer ${userToken}`,
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    //         };
    //         const response = await axios.post('http://localhost:7173/api/v1/userskills', skillName, { headers });

    //         // Dispatch an action to store the response in the Redux store
    //         dispatch(profileSkills(response.data));

    //         // Navigate to the home page after successful profile creation
    //         navigate("/home");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    const handleSubmitSkills = async (e) => {
        e.preventDefault();
        // Assuming UserSkill requires at least a skillName field
        const skillData = {
            skillName: skills.join(', '), // Adjust this based on what your server expects
            // Add other required fields here
        };
        console.log(skillData, "skillsData");

        try {
            const headers = {
                'Authorization': `Bearer ${userToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            };
            const response = await axios.post('http://localhost:7173/api/v1/userskills', skillData, { headers });

            dispatch(profileSkills(response.data));
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };


    console.log(skills, "skills")

    return (
        <div>
            {/* <Link to={`/profiles/me/${user?.user?.userId}`}>back</Link> */}
            <div className='box-container'>
                <form onSubmit={handleAddSkill}>
                    <p className='title'>Add User Skills</p>

                    <div className="input-field-skill">
                        <input
                            value={newSkill}
                            onChange={e => setNewSkill(e.target.value)}
                            placeholder="Enter skill name"
                        />
                        <button type='submit' className='skill-btn'><IoAddCircle /></button>
                    </div>
                    <div className="skills-container">
                        {skills.map((skill, index) => (
                            <div key={index} className="skill">
                                <span>{skill}</span>
                                <button onClick={() => handleRemoveSkill(index)}><IoIosRemoveCircle /></button>
                            </div>
                        ))}
                    </div>
                    <button className='btn' onClick={handleSubmitSkills} disabled={isLoading}>
                        {isLoading ? 'Adding Skills...' : 'Submit Skills'}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default UserSkills;
