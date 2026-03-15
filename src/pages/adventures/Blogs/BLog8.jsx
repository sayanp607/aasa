import React from 'react';
import './BlogPage.css'; // Separate CSS for styling

const Blog8 = () => {
  return (
    <div className="blog-post-container">
      {/* Hero Image with Overlay */}
      <div className="blog-hero-image">
        <img src='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1600' alt="Blog Banner" loading="lazy" />
        <div className="blog-hero-overlay">
          <p className="blog-category-date">Highhawks January 16, 2023</p>
          <h1 className="blog-title">
         Connecting with the Western Ghats: A Personal Journey with HighHawks
          </h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        <p>
          The Western Ghats are an integral part of HighHawks. As a company, we are deeply connected to this beautiful mountain range and are passionate about showcasing its natural beauty to others.
        </p>

        <p>
       The Western Ghats, also known as Sahyadri, is a mountain range that runs parallel to the western coast of India. It stretches over 1600 km, covering six states of India. It is one of the eight hotspots of biological diversity in the world and is home to a rich variety of flora and fauna, including several endangered species.
        </p>

        <p>
          For HighHawks, the Western Ghats are more than just a location for trekking, they are a source of inspiration. The natural beauty of the Western Ghats is what drives us to keep exploring and discovering new trails. The Western Ghats are a treasure trove of natural beauty, and we are passionate about sharing this beauty with others.
        </p>

        <p>
    We believe that by providing safe and comfortable trekking experiences in the Western Ghats, we can inspire others to explore this beautiful mountain range and appreciate the beauty and importance of preserving our natural environment.
        </p>

        <p>
         We have a deep understanding of the Western Ghats and we know the best trails and viewpoints to showcase the natural beauty of the area. We work closely with local communities to ensure that our treks are sustainable and that we are doing our part to preserve the natural environment.
        </p>

        <p>
          At HighHawks, we are committed to providing the best trekking experiences in the Western Ghats, and we are proud to be a part of the Western Ghats community. We look forward to sharing the beauty of the Western Ghats with you, and creating an unforgettable trekking experience.”
        </p>
        <p>
          This blog post highlights the deep connection that Highhawks has with the Western Ghats and how the natural beauty of this mountain range is an inspiration for the company. Also, it mentions the biodiversity of the Western Ghats, the role of Highhawks in preserving the natural environment and the company’s deep understanding of the area.
        </p>
      </div>
    </div>
  );
};

export default Blog8;
