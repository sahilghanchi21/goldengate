import React, { useState } from 'react';
import "./skill.css";
import { IoAddOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const Skill = () => {
    const [showAll, setShowAll] = useState(false);
    const skills = [
        "HTML5", "CSS3", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Python", "Django", "Flask"
    ];

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className='skill-main-container'>
            <div className="skill-tobar-container">
                <div className='skills-heading'>
                    <p>Skills</p>
                </div>
                <div className='skills-add-edit'>
                    <div><IoAddOutline /></div>
                    <div><MdModeEdit /></div>
                </div>
            </div>
            <div className='skills-content-container'>
                {skills.slice(0, showAll ? skills.length : 2).map((skill, index) => (
                    <p key={index} className='skills-title'>{skill}</p>
                ))}
            </div>
            <div className="skills-footer-container">
                <div className='skills-footer-content' onClick={toggleShowAll}>
                    <p>{showAll ? "Show less" : "Show all 10 skills"}</p>
                    {showAll ? <FaArrowUp /> : <FaArrowDown />}
                </div>
            </div>
        </div>
    )
}

export default Skill;
