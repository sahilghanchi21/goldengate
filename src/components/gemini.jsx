import React, { useState } from 'react';
import axios from 'axios';

const GeminiChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (input.trim() === '') return;

        // Add user message to the chat
        setMessages([...messages, { text: input, sender: 'user' }]);
        setInput('');

        try {
            // Send user message to the AI service (replace 'YOUR_API_ENDPOINT' with actual AI service endpoint)
            const response = await axios.post('AIzaSyDfA1Sbdk7xkb9kPn1eDleKkvtYiCZYD5I', {
                message: input,
            });

            // Add AI service's response to the chat
            setMessages([...messages, { text: response.data.message, sender: 'AI' }]);
        } catch (error) {
            console.error('Error sending message to AI service:', error);
        }
    };

    return (
        <div className="gemini-chat">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') sendMessage();
                }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default GeminiChat;
