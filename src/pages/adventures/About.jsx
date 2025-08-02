import React from 'react';
import './About.css';
import NavbarTrip from '../Navbartrip';

const gallery = [
  {
    src: '/abou1.jpeg',
    alt: 'Adventure 1',
    title: 'Our Story',
    text: `HighHawks was founded by a group of nature enthusiasts who shared a passion for trekking and exploring the great outdoors. What started as a hobby quickly turned into a mission to share the beauty and serenity of the Western Ghats with others.

We began organizing treks for friends and family, and soon our reputation for providing safe and comfortable trekking experiences began to spread. As demand grew, we decided to turn our passion into a business, and HighHawks was born.

We take pride in our commitment to safety and comfort and strive to make the Western Ghats accessible to everyone. Join us on an adventure and see for yourself why the Western Ghats are truly one of the most beautiful and diverse landscapes in India.`,
  },
  {
    src: '/about2.jpeg',
    alt: 'Adventure 2',
    title: 'Our Mission',
    text: `At HighHawks, our mission is to provide our guests with an unforgettable trekking experience in the Western Ghats. We believe that the beauty and serenity of nature should be accessible to everyone and we strive to make that happen through our well-planned and organized treks.

Our team of experienced guides and instructors are dedicated to providing a safe and comfortable trekking experience. We pride ourselves on our commitment to safety and comfort, ensuring that our treks are well-planned and equipped with all necessary safety measures. Our guides are knowledgeable about the area and will provide you with information about the trail and local environment.`,
  },
  {
    src: '/about3.jpg',
    alt: 'Adventure 3',
    title: 'Our Goal for 2023',
    text: `As we look ahead to 2023, the team at HighHawks is committed to continuing to provide exceptional trekking experiences in the Western Ghats. Our goal is to continue to push boundaries and offer new, challenging routes for our experienced trekkers while also making trekking accessible to first-time trekkers. We strive to provide an unparalleled level of service to our guests and make sure that our treks are tailored to the individual needs and interests of our guests.

In the upcoming year, we are also planning to expand our offerings to include camping and wilderness survival training, to provide a more immersive and exciting adventure for our guests. We look forward to taking you on an unforgettable journey in the Western Ghats in 2023

`,
  },
];

const scrollGallery = ['/blog1.jpeg', '/blog2.png', '/blog3.jpg'];

const team = [
  { src: '/amar.jpg', name: 'Amar Revankar', role: 'Highhawks Trek Leader - Certified Advance Mountaineer' },
  { src: '/ashwath.jpg', name: 'Ashwath Hegde', role: 'Highhawks Trek Leader - Certified Advance Mountaineer' },
  { src: '/kaushal.jpg', name: 'Priya Rao', role: 'Highhawks Trek Leader - Drone Pilot & Content Creator' },
  { src: '/pankaj.jpg', name: 'Sameer Das', role: 'Highhawks Trek Leader - Content Creator' },
  { src: '/shridhar.jpg', name: 'Neha Sharma', role: 'Highhawks Trek Leader - Certified Mountaineer' },
];

function AboutPage() {
  return (
    <div className="about-container">
      <NavbarTrip/>
      <div className="hero-image-wrapper">
        <img
          src="/bandaje.jpg"
          alt="About HighHawks"
          className="hero-image"
        />
      </div>
      <div className="about-gallery">
        {gallery.map((g, i) => (
          <div key={i} className="about-item">
            <img src={g.src} alt={g.alt} />
            <h3 className="about-section-title">{g.title}</h3>
            <p>{g.text}</p>
          </div>
        ))}
      </div>

      {/* YouTube embed */}
   {/* YouTube embed */}
<div className="about-video-section">
  <h2 className="video-heading">HighHawks in Action</h2>
  <div className="about-video">
    <iframe
      src="https://www.youtube.com/embed/V_cGoGUZiN8"
      title="About HighHawks"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>


      {/* Horizontal scroll gallery */}
      <div className="scroll-gallery">
        {scrollGallery.map((src, i) => (
          <img key={i} src={src} alt={`Gallery ${i + 1}`} />
        ))}
      </div>

      {/* Leadership Team */}
      <section className="leadership">
        <h2>Leadership Team</h2>
        <div className="team-grid">
          {team.map((m, i) => (
            <div key={i} className="team-member">
              <img src={m.src} alt={m.name} />
              <h4>{m.name}</h4>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
