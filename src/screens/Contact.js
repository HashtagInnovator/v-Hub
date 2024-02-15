import React from 'react';
import '../assets/contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <h2 className="text-center text-3xl font-bold mt-5 text-info">Contact Me</h2>
      <div className="contact-info">
        <div className="animated-text">
          <span className="highlight">Name:</span> Chetan Ohri
        </div>
        <div className="animated-text">
          <span className="highlight">Email:</span> {' '}
          <a href='mailto:chetanohri2000@gmail.com' target='_blank' rel='noreferrer'>
            chetanohri2000@gmail.com
          </a>
        </div>
        <div className="animated-text">
          <span className="highlight">Phone:</span> +91 9971637657
        </div>
        <div className="animated-text">
          <span className="highlight">LinkedIn:</span>{' '}
          <a href="https://linkedin.com/in/chetan-ohri" target="_blank" rel="noreferrer" >
            Chetan Ohri
          </a>
        </div>
      </div>
    </div>
  );
}


