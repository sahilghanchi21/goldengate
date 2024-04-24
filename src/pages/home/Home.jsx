import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import './Home.css';
import { MdMoreHoriz } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import CreatePost from '../../components/createPost/CreatePost';
import PostCard from '../../components/postCard/PostCard';

const Home = () => {
  const [showFullCaption, setShowFullCaption] = useState(false);

  const toggleCaption = () => {
    setShowFullCaption(!showFullCaption);
  };

  return (
    <Layout>
      <div className="home-container">
        {/* Create Post Section */}
        <CreatePost />
        {/* Scrollable Posts Section */}
        <PostCard />
      </div>
    </Layout>
  );
};

export default Home;
