import React from 'react';
import './BlogPage.css'; // Separate CSS for styling

const Blog7 = () => {
  return (
    <div className="blog-post-container">
      {/* Hero Image with Overlay */}
      <div className="blog-hero-image">
        <img src='https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=1600' alt="Blog Banner" loading="lazy" />
        <div className="blog-hero-overlay">
          <p className="blog-category-date">Trek January 18, 2023</p>
          <h1 className="blog-title">
            First-Time Trekker? A Beginner’s Guide to Preparing for an Trek
          </h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        <p>
       Trekking in the Western Ghats is an unforgettable experience, but it’s important to be prepared for the journey ahead. At HighHawks, we want to make sure that your trekking experience is as comfortable and enjoyable as possible, so we’ve put together this 101 guide on how to prepare for your trek.
        </p>

     <p>1. Get in shape: Trekking can be physically demanding, so it’s important to start preparing your body well in advance. Incorporate cardio and strength training exercises into your routine, and make sure to wear comfortable shoes for walking and hiking.</p>
     <p>2. Research the trek: Make sure you know what you’re getting yourself into. Read about the trail, the difficulty level, and the distance. It’s also important to know the weather conditions and what to expect.</p>
     <p>3. Pack essentials: Make a list of essential items you’ll need to bring on your treks, such as a backpack, water bottles, a first aid kit, sunscreen, and warm layers. For a more detailed list of what to pack, please visit our FAQ page.</p>
     <p>4. Learn about the area: The Western Ghats are home to a rich variety of flora and fauna, and it’s important to know a little bit about the area you’ll be trekking in. This will help you appreciate the natural beauty of the Western Ghats and also help you identify any potential hazards.</p>
     <p>5. Be flexible: Keep in mind that the weather in the Western Ghats can be unpredictable, and it’s important to be flexible and adaptable. Be prepared for unexpected changes in the weather and trail conditions.</p>
     <p>6. Listen to your body: Listen to your body and know your limits. If you feel unwell or injured, it’s important to stop and seek help.</p>
     <p>7. Follow the guide’s instructions: Our guides are knowledgeable about the area and have your safety in mind. Follow their instructions and ask for help if you need it.
     </p>
     <p>By following these tips, you’ll be well on your way to having an enjoyable and comfortable trekking experience in the Western Ghats with HighHawks. We look forward to trekking with you and creating an unforgettable experience.</p>
      </div>
    </div>
  );
};

export default Blog7;
