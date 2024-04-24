import React, { useState } from 'react';
import { MdMoreHoriz, MdOutlineEmojiEmotions, MdPermMedia } from "react-icons/md";
import { PiBagSimpleFill } from "react-icons/pi";
import { PiArticleFill } from "react-icons/pi";
import { IoClose, IoDocumentText } from "react-icons/io5";
import { FaCalendarAlt, FaPoll } from "react-icons/fa";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import OpenAI from 'openai';


const CreatePost = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const [generatedText, setGeneratedText] = useState('');
    const [prompt, setPrompt] = useState('');
    const user = useSelector((state) => state.auth.user);
    // console.log(prompt, "prompt")

    const API_KEY = "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";
    // Create an instance of OpenAI
    // const openai = new OpenAI({
    //     apikey: API_KEY,
    //     dangerouslyAllowBrowser: true
    // });

    // const send = async () => {
    //     try {
    //         // Call OpenAI's chat completions endpoint
    //         const result = await openai.chat.create({
    //             messages: [
    //                 { role: "system", content: "You are a helpful assistant." },
    //                 { role: "user", content: prompt }
    //             ]
    //         });
    //         // Set the generated text in the state
    //         setGeneratedText(result.data.choices[0].message.content);
    //     } catch (error) {
    //         // Handle errors
    //         console.error("Error generating text:", error);
    //         setGeneratedText("Something went wrong!");
    //     }
    // };

    // console.log("API key: " + API_KEY)
    console.log("API key: " + API_KEY)
    const generateText = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo-0613", // Specify the model to use
                    messages: [
                        {
                            role: "user", // Role of the message sender (e.g., "user" or "assistant")
                            content: prompt // Content of the message or prompt
                        }
                    ],
                    max_tokens: 100 // Adjust max_tokens as needed
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    }
                }
            );
            setGeneratedText(response.data.choices[0].message.content);
        } catch (error) {
            console.error('Error generating text:', error);
        }
    };


    console.log(generatedText, "generatedText")

    // const generateText = async () => {
    //     try {
    //         const response = await axios.post('https://api.openai.com/v1/completions', {
    //             "choices": [
    //               {
    //                 "finish_reason": "length",
    //                 "index": 0,
    //                 "logprobs": null,
    //                 "text": "\n\n\"Let Your Sweet Tooth Run Wild at Our Creamy Ice Cream Shack"
    //               }
    //             ],
    //             "created": 1683130927,
    //             "id": "cmpl-7C9Wxi9Du4j1lQjdjhxBlO22M61LD",
    //             "model": "gpt-3.5-turbo-instruct",
    //             "object": "text_completion",
    //             "usage": {
    //               "completion_tokens": 16,
    //               "prompt_tokens": 10,
    //               "total_tokens": 26
    //             }
    //           }, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${API_KEY}`
    //             }
    //         });
    //         setGeneratedText(response.data.choices[0].text);
    //     } catch (error) {
    //         console.error('Error generating text:', error);
    //     }
    // };

    const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji);
        // You can now use the selected emoji
        console.log(emoji);
    };

    const toggleEmojiModal = () => {
        setIsEmojiModalOpen(!isEmojiModalOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <div className="create-post-section">
                <div className="upper-section">
                    <div className="user-info">
                        <Link to={`/profile/${user?.userId}`}>
                            <img src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User Profile" className="profile-pic" />
                        </Link>
                    </div>
                    <button onClick={toggleModal} className="create-post-button">Create Post</button>
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <div className="modal-user-info">
                                    <div className='model-user-information'>
                                        <img src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User Profile" className="profile-pic" />
                                        <div className="username">Username</div>
                                    </div>
                                    <div className='close-modal-button ' onClick={toggleModal}><IoClose /></div>
                                </div>
                                <textarea
                                    placeholder="What do you want to talk about?"
                                    className="post-input"
                                ></textarea>
                                <input type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}

                                />
                                <button onClick={generateText}>Generate Text</button>
                                <div>{generatedText}</div>
                                <div className='model-footer'>
                                    {isEmojiModalOpen && (
                                        <div className="emoji-modal">
                                            <div className="emoji-modal-content">
                                                <div className='emoji-modal-content-header'>
                                                    <p>Select an Emoji</p>
                                                    <div onClick={toggleEmojiModal}><IoClose /></div>
                                                </div>
                                                <div className='emojii-keybord'>
                                                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="upper-footer">
                                        <MdOutlineEmojiEmotions className='model-footer-icons' onClick={toggleEmojiModal} />
                                        <MdPermMedia className='model-footer-icons' />
                                        <FaCalendarAlt className='model-footer-icons' />
                                        <IoDocumentText className='model-footer-icons' />
                                        <FaPoll className='model-footer-icons' />
                                        <PiBagSimpleFill className='model-footer-icons' />
                                    </div>
                                    <div className="bottom-footer">
                                        <button>Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="post-options">
                    <div className='inner-post-options'>
                        <MdPermMedia className='post-icons' />
                        <div className='post-options-bth'>Media</div>
                    </div>
                    <div className='inner-post-options'>
                        <PiBagSimpleFill className='post-icons' />
                        <div className='post-options-bth'>Event</div>
                    </div>
                    <div className='inner-post-options'>
                        <PiArticleFill className='post-icons' />
                        <div className='post-options-bth'>Write Article</div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default CreatePost;
