import React from 'react';
import './BlogPage.css'; // Separate CSS for styling

const Blog3 = () => {
  return (
    <div className="blog-post-container">
      {/* Hero Image with Overlay */}
      <div className="blog-hero-image">
        <img src='/blog3.jpg' alt="Blog Banner" />
        <div className="blog-hero-overlay">
          <p className="blog-category-date">Mountains January 19, 2023</p>
          <h1 className="blog-title">
           Trekking 101: Essential Do’s and Don’ts for a Safe and Enjoyable Experience
          </h1>
        </div>
      </div>

      {/* Blog Content */}
  <div className="blog-content">
  <p>
    Trekking in the great outdoors can be an exhilarating and rewarding experience,
    but it’s important to be prepared and to know the do’s and don’ts of trekking
    to ensure a safe and enjoyable trip.
  </p>

  <h3>DO’s</h3>
  <ul>
    <li>Wear proper footwear and clothing. Ensure your shoes have a good grip and dress for the weather.</li>
    <li>Carry enough water and snacks to stay hydrated and energized during the trek.</li>
    <li>Bring a first aid kit and know how to use it.</li>
    <li>Carry a map and compass and be familiar with them.</li>
    <li>Let someone know your trekking plans and expected return time.</li>
    <li>Follow Leave No Trace principles and respect the environment.</li>
  </ul>

  <h3>DON’Ts</h3>
  <ul>
    <li>Don’t litter or leave trash on the trail.</li>
    <li>Don’t damage or remove any plants or wildlife.</li>
    <li>Don’t wander off the designated trail.</li>
    <li>Don’t rely solely on technology for navigation.</li>
    <li>Don’t ignore warning signs or advice from forest officials.</li>
    <li>Don’t overestimate your abilities or take unnecessary risks.</li>
  </ul>

  <p>
  By following these do’s and don’ts, you can help ensure a safe and enjoyable trekking experience for yourself and for others. Remember, the most important thing is to have fun and enjoy the great outdoors, but also to be responsible and respectful of the environment.
  </p>

  <p>
At HighHawks we have experienced guide who will make sure you have a great and safe trek. they will also brief you about the do’s and dont’s before starting the trek and will also be there to take care of you during the trek.
  </p>

 
</div>

    </div>
  );
};

export default Blog3;
