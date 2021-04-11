import React from 'react';
import './AboutPage.css';
import personImage from '../../images/dp.jpg'

const AboutPage = () => {
  return (
    <div className="aboutPage">
      <div className="aboutPage__card">
        <div className="aboutPage__personImage">
          <img src={personImage} alt="" />
        </div>
        <div className="aboutPage__personDetails">
          <h2>John Doe</h2>
          <p>Student at Trinity College Dublin</p>
        </div>
      </div>
      <div className="aboutPage__card">
        <div className="aboutPage__personImage">
          <img src={personImage} alt="" />
        </div>
        <div className="aboutPage__personDetails">
          <h2>John Doe</h2>
          <p>Student at Trinity College Dublin</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;