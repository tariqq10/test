import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About the Online Charity Platform</h1>
      <p>
        Our mission is to support local charity organizations and help them
        secure donations during challenging times. Your contribution can make a
        real difference in the lives of those in need. We believe in transparency
        and ensuring that every penny donated goes directly to those who need it
        the most.
      </p>

      <div className="about-us-details">
        <h2>
          <i className="fas fa-hand-holding-heart"></i> How We Help
        </h2>
        <p>
          We partner with local charities to provide them with the tools they need
          to raise awareness and secure donations efficiently. Our platform is
          designed to make donating easy and accessible for everyone.
        </p>
      </div>

      <div className="contact-us">
        <h2>
          <i className="fas fa-phone-alt"></i> Contact Us
        </h2>
        <p>
          If you have any questions or need more information, feel free to reach out to us!
        </p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook-square"></i> Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter-square"></i> Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram-square"></i> Instagram
          </a>
          <a href="mailto:contact@charityplatform.com">
            <i className="fa fa-envelope"></i> Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
