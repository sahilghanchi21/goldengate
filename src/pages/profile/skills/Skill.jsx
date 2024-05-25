import React, { useState } from 'react';
import "./skill.css";
import { IoAddOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Skill = ({ fetchedSkills }) => {
    const [showAll, setShowAll] = useState(false);
    // const skills = [
    //     "HTML5", "CSS3", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Python", "Django", "Flask"
    // ];
    const navigate = useNavigate()
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };
    console.log(fetchedSkills, "fetchedSkills")
    return (
        <div className='skill-main-container'>
        
            <div className="skill-tobar-container">
                <div className='skills-heading'>
                    <p>Skills</p>
                </div>
                <div className='skills-add-edit'>
                    <div style={{ cursor: "pointer" }} onClick={() => navigate("/add-your-skills")}><IoAddOutline /></div>
                    <div style={{ cursor: "pointer" }}><MdModeEdit /></div>
                </div>
            </div>
            {/* <div className='skills-content-container'>
                {skills.slice(0, showAll ? skills.length : 2).map((skill, index) => (
                    <p key={index} className='skills-title'>{skill}</p>
                ))}
            </div> */}
            <div className='skills-content-container'>
                {fetchedSkills?.slice(0, showAll ? fetchedSkills.length : 2).map((skill, index) => (
                    <p key={index} className='skills-title'>{skill.skillName}</p>
                ))}
            </div>
            {/* {fetchedSkills?.length === 2 ? <div className="skills-footer-container">
                <div className='skills-footer-content' onClick={toggleShowAll}>
                    <p>{showAll ? "Show less" : "Show all skills"}</p>
                    {showAll ? <FaArrowUp /> : <FaArrowDown />}
                </div>
            </div> : ""} */}
            <div className="skills-footer-container">
                <div className='skills-footer-content' onClick={toggleShowAll}>
                    <p>{showAll ? "Show less" : "Show all skills"}</p>
                    {showAll ? <FaArrowUp /> : <FaArrowDown />}
                </div>
            </div>
        </div>
    )
}

export default Skill;
