import React from 'react';
import './BlogPage.css'; // Separate CSS for styling

const Blog10 = () => {
  return (
    <div className="blog-post-container">
      {/* Hero Image with Overlay */}
      <div className="blog-hero-image">
        <img src='https://images.unsplash.com/photo-1530541930197-ff16ac911881?auto=format&fit=crop&q=80&w=1600' alt="Blog Banner" loading="lazy" />
        <div className="blog-hero-overlay">
          <p className="blog-category-date">Trek October 5, 2021</p>
          <h1 className="blog-title">
        Peek-A-Boo
          </h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        <p>
         This is The Adrenaline Trek Story of “19 Friends” Exploring the Pristine Rivulet emerging from the Green Shola Covers of Kudremuka and Emblazoned Chikmagaluru.
Trekking accross many Segments of the River skirting through Dense Deciduous Jungles, the All Terrain Adventure Begun from Campsite to the Best aspects of Western Ghats of Karnataka above the Clouds.
        </p>

        <p>
          During our Final Portion of the Trek, the Hike was Steep but We were Voraciously Climbing in the Open Meadows with Predetermined Will. As We Clenched 4900Ft ASL (Above Sea Level) Everybody Were Rewarded with Delirious Views as We Could See Paramount peaks including Kudremuka and Kallusanka.
        </p>

        <p>
          With Cool Breeze And Deep Sighs, As the Team was Cherishing Triumphant at the Summit during Golden Hours, A Beautiful Female Sambar Deer just Grabbed our attention by running down the Netravati peak.
‘WOAAW’ was the Feeling in Every Heart!
As We were Overwhelmed with the Wildlife, Just in another Few Seconds A Sambar Stag left us Awestruck with its heavy leaps following his Partner down the Peak.
        </p>

        <p>
          An Experience that just soaked Each and Everyone’s Heart with Sheer Compassion and Love.
Grateful For Mother Nature.
Dhanyosmi Netravati.

Cheers to All “19 Indomitable Friends”
        </p>
      </div>
    </div>
  );
};

export default Blog10;
