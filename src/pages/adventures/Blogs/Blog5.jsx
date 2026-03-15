import React from 'react';
import './BlogPage.css'; // Separate CSS for styling

const Blog5 = () => {
  return (
    <div className="blog-post-container">
      {/* Hero Image with Overlay */}
      <div className="blog-hero-image">
        <img src='https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1600' alt="Blog Banner" loading="lazy" />
        <div className="blog-hero-overlay">
          <p className="blog-category-date">Trek January 18, 2023</p>
          <h1 className="blog-title">
           Responsible trekking: The importance of preserving the natural environment
          </h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        <p>
        Trekking in the Western Ghats is an unforgettable experience, but it’s important to remember that we are guests in this natural environment and it’s our responsibility to take care of it. At HighHawks, we are committed to responsible trekking and preserving the natural environment for future generations to enjoy.
        </p>

        <p>
         One of the most important ways to preserve the natural environment is to practice the Leave No Trace principle. This means leaving the area in the same condition as when you arrived, and not leaving any trash or other debris behind. It’s important to pack out all of your trash and to be mindful of the impact that your trekking group has on the environment
        </p>

        <p>
          Another important aspect of responsible trekking is being respectful of the local communities and their way of life. The Western Ghats are home to many indigenous communities, and it’s important to respect their culture and not interfere with their way of life.
        </p>

        <p>
         We also strive to minimize our impact on the environment by using sustainable practices such as camping in designated areas, using eco-friendly products, and supporting local communities.


        </p>

        <p>
         By being responsible trekkers, we can ensure that the Western Ghats remains a beautiful and pristine environment for future generations to enjoy. At HighHawks, we encourage all of our guests to take an active role in preserving the natural environment and to respect the local communities and culture.


        </p>

        <p>
        We are committed to providing our guests with an enjoyable and responsible trekking experience in the Western Ghats, please do not hesitate to contact us if you have any questions or concerns about responsible trekking.
        </p>
      </div>
    </div>
  );
};

export default Blog5;
