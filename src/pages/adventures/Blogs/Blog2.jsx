import React from 'react';
import './BlogPage.css'; // Separate CSS for styling

const Blog2 = () => {
  return (
    <div className="blog-post-container">
      {/* Hero Image with Overlay */}
      <div className="blog-hero-image">
        <img src='https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600' alt="Blog Banner" loading="lazy" />
        <div className="blog-hero-overlay">
          <p className="blog-category-date">Uncategorized • January 19, 2023</p>
          <h1 className="blog-title">
            Trekking 101: A Beginner’s Guide to Spotting Birds on the Trail
          </h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        <p>
          Trekking is not only a great way to get some exercise and enjoy the great outdoors,
          it’s also an opportunity to learn about the natural world around us.
          One of the best ways to do this is by keeping an eye out for the birds and plants that call the trail home.
        </p>

        <p>
          Bird spotting can be a fun and rewarding activity while trekking. The Western Ghats of India are
          home to a wide variety of birds, including many species that are found nowhere else in the world.
          Some common birds you may spot while trekking include the Malabar whistling thrush, the Indian blackbird,
          and the Malabar trogon.
        </p>

        <p>
          If you are new to bird spotting, a good place to start is by learning to identify the most common birds
          in the area. A field guide or an app with pictures and sounds of birds can be helpful. Also,
          it’s important to keep in mind that many birds are more active during certain times of the day,
          such as dawn and dusk.
        </p>

        <p>
          In addition to birds, it’s also a good idea to take a closer look at the plants and flowers
          that you see along the trail. The Western Ghats are home to a diverse array of plant life,
          including many species of orchids, ferns, and medicinal plants.
        </p>

        <p>
          At HighHawks, we understand the importance of preserving the natural environment and that’s why
          we take great care to minimize our impact on the environment. We also encourage our guests to learn
          about the local flora and fauna.
        </p>

        <p>
          In conclusion, trekking is not only a great way to get some exercise, but it’s also an opportunity to
          learn about the natural world around us. By keeping an eye out for the birds and plants that call the
          trail home, you can make your trekking experience even more enjoyable and rewarding.
        </p>
      </div>
    </div>
  );
};

export default Blog2;
