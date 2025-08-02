import React from 'react';
import './BlogPage.css'; // Separate CSS for styling

const Blog4 = () => {
  return (
    <div className="blog-post-container">
      {/* Hero Image with Overlay */}
      <div className="blog-hero-image">
        <img src='/blog4.png' alt="Blog Banner" />
        <div className="blog-hero-overlay">
          <p className="blog-category-date">Trek January 19, 2023</p>
          <h1 className="blog-title">
           How to pack your bag for a trek : A Comprehensive guide
          </h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        <p>
         Preparing for a trek in the Western Ghats can be daunting, but with the right planning and packing, it can be a breeze. At HighHawks, we believe that being prepared for a trek is crucial for a safe and enjoyable experience.


        </p>

        <p>
      When it comes to packing for a trek, the most important thing to keep in mind is to pack light. You will be carrying your own backpack, and keeping the weight as light as possible is essential. A good rule of thumb is to pack only the essentials and leave behind anything that is not absolutely necessary.
        </p>

        <p>
        One of the most important things to pack is a good pair of hiking boots. Make sure they are comfortable, well-worn, and appropriate for the terrain you will be trekking on. Also, pack comfortable and quick-dry clothes that are appropriate for the weather.
        </p>

        <p>
          Other essential items to pack include a waterproof jacket and pants, a warm layer, a hat and sunglasses, sunscreen, insect repellent, a first-aid kit, a flashlight or headlamp, a water bottle, and a personal hygiene kit.
        </p>

        <p>
         Packing enough food and water to sustain you during the trek is also important. Pack high-energy snacks such as nuts, dried fruits, and energy bars to keep you going during the trek. And don’t forget to bring a small daypack to keep your essentials like a camera, phone, etc.
        </p>

        <p>
        At HighHawks, we understand that packing for a trek can be overwhelming, but we are here to help. We provide our guests with a detailed packing list to help ensure that they have everything they need for a safe and enjoyable trek.
        </p>
        <p>
          If you have any questions or concerns about packing for a trek in the Western Ghats, please don’t hesitate to contact us. Happy trekking!
        </p>
      </div>
    </div>
  );
};

export default Blog4;
