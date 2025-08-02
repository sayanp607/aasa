import React from 'react';
import './BlogPage.css'; // Separate CSS for styling

const Blog9 = () => {
  return (
    <div className="blog-post-container">
      {/* Hero Image with Overlay */}
      <div className="blog-hero-image">
        <img src='/blog9.jpg' alt="Blog Banner" />
        <div className="blog-hero-overlay">
          <p className="blog-category-date">Highhawks January 16, 2023</p>
          <h1 className="blog-title">
           Our Story
          </h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        <p>
          Welcome to the HighHawks blog! Here, we want to share with you the story behind our company and the passion that drives us to provide the best trekking experiences in the Western Ghats.
        </p>

        <p>
          HighHawks was founded by a group of outdoor enthusiasts who were passionate about exploring the natural beauty of the Western Ghats. We saw a need for a trekking company that could provide a safe and comfortable experience while also showcasing the unique flora and fauna of the Western Ghats.
        </p>

        <p>
          We started small, leading treks for friends and family, but as word of mouth spread, we started to attract more and more people interested in exploring the Western Ghats. Today, HighHawks is a well-established company with a team of experienced guides and instructors who share the same passion for the outdoors as our founders.
        </p>

        <p>
         One of the things that sets HighHawks apart is our commitment to safety and comfort. We understand that trekking can be challenging and we strive to make sure that our treks are well-planned and equipped with all necessary safety measures. Our guides are knowledgeable about the area and will provide you with information about the trail and the local environment.
        </p>

        <p>
          We also pride ourselves on our ability to tailor our treks to suit the individual needs and interests of our guests. Whether you’re an experienced trekker looking for a challenging expedition or a first-time trekker looking to experience the Western Ghats, we have a trek that’s right for you.
        </p>

        <p>
          We believe that the Western Ghats are a treasure trove of natural beauty and we are passionate about sharing this beauty with others. We hope that through our treks, we can inspire others to explore the Western Ghats and appreciate the beauty and importance of preserving our natural environment.
        </p>
        <p>
          Thank you for choosing HighHawks for your trekking adventure in the Western Ghats. We look forward to sharing the beauty of the Western Ghats with you and creating an unforgettable trekking experience.”
        </p>
        <p>
          This blog post gives an overview of the story of Highhawks, how the company was born, the passion that drives the company and the different aspects that make Highhawks different from other trekking companies, such as the commitment to safety, comfort, and the tailoring of the treks to the individual needs and interests of the guests. Also, it highlights the importance of preserving the natural environment and the inspiration that Highhawks want to provide with their treks.
        </p>
      </div>
    </div>
  );
};

export default Blog9;
