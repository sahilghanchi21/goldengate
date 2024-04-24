// Typewriter.js
import React, { useEffect, useState } from 'react';
import "./TypeWriter.css"
const Typewriter = ({ text, speed }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let index = 0;

        const intervalId = setInterval(() => {
            setDisplayText((prevText) => prevText + text[index]);
            index++;

            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed]);
    return text ? <div className="left-align">{displayText}</div> : null;
};

export default Typewriter;
