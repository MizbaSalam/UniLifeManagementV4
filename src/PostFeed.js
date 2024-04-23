import React, { useState } from 'react';
import image1 from './post1.jpeg';
import image2 from './post2.jpeg';
import image3 from './post3.jpeg';
import image4 from './post4.jpeg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './PostFeed.css';

const PostFeed = () => {
  const posts = [
    {
      id: 'John',
      content: 'Embracing the vibrant spirit of campus life! Our students make the most of sunny days, blending learning with laughter and camaraderie. From study sessions to spontaneous meet-ups, the green is where ideas flourish and friendships bloom. #UniversityLife #CampusDays',
      imageUrl: image1,
    },
    {
      id: 'GeorgeMasonUni',
      content: 'As the day winds down, the quest for knowledge lights up the evening. 📚✨ Inside the hallowed halls of our library, students from all walks of academia delve deep into their studies, surrounded by centuries of wisdom. It\'s not just about exams; it\'s about the journey of learning. #AcademicExcellence #StudyGoals',
      imageUrl: image2,
    },
    {
      id: 'Sarah',
      content: 'Finding my zone in the coziest corner of the coffee shop. Whether it\'s prepping for midterms or chipping away at that term paper, a good brew and a quiet spot make all the difference. #StudyMode #CoffeeFuel',
      imageUrl: image3,
    },
    {
      id: 'Doe',
      content: 'Teamwork under the sun! 🌳💻 Nothing beats the brainstorming sessions with my project group, surrounded by nature and fueled by fresh ideas. Here\'s to making learning an adventure. #GroupProject #CampusLife',
      imageUrl: image4,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const goToPreviousPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };

  return (
    <div className="postFeed">
      <div className="postFeed__header">
        <h2 className="postFeed__title">Campus Life</h2>
      </div>
      <div className="postFeed__content">
        <div className="postFeed__uploaderId">{posts[currentIndex].id}</div>
        <div className="postFeed__post">
          <img className="postFeed__image" src={posts[currentIndex].imageUrl} alt={`Post ${currentIndex + 1}`} />
          <p className="postFeed__text">{posts[currentIndex].content}</p>
        </div>
      </div>
      <div className="postFeed__navigation">
        <button className="postFeed__button" onClick={goToPreviousPost}>
          <FaArrowLeft className="postFeed__icon" />
        </button>
        <button className="postFeed__button" onClick={goToNextPost}>
          <FaArrowRight className="postFeed__icon" />
        </button>
      </div>
    </div>
  );
};

export default PostFeed;
