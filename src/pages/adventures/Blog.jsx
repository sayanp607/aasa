import React, { useState } from 'react';
import './Blog.css';
import NavbarTrip from '../Navbartrip';

const blogs = [
  {
    id: '1',
    image: '/blog1.jpeg',
    title: 'ಓಂಕಾರೇಶ್ವರ ಚಾರಣ',
    category: ' HIGHHAWKS',
    date: '19 Jan 2023',
    excerpt: 'ಮಾರ್ಚ್ ೧೭, ೨೦೨೩ರಂದು ಆರಂಭವಾದ ಪುಟ್ಟ ಪ್ರ ವಾಸ, ಇಷ್ಟ ಂದು ನೆನಪುಗಳನ್ನು ಕಟ್ಟಟ ಕೊಡುವುದಂದುಭಾವಿಸಿರಲಿಲ್ಲ. ಕಣ್ಣು ಮುಚ್ಚಿ ಕುಳಿತರೆ, ಕಣು ಪ್ರದಯಮೇಲೆ ಚ್ಚತರ ವಾಗಿ ಮೂಡಿಬರುವಂತಹ ಸಂದರ ಕ್ಷಣಗಳು. ಸಂಜೆ ೭ಗಂಟೆಗೆ ಶಿರಸಿಯಂದಹೊರಟು, ಮಲೆನಾಡಿನ ಕಾಡುಗಳ ಮಧ್ಯೆ ಇರುವ ಸಂದರಗೂಡು ತವರುಮನೆ Homestay ಯನ್ನು ತಲುಪಿದವು. ಸಿಹಿಯಾದ ಕಬ್ಬಿ ನಹಾಲಿನಂದಿಗೆ ಶುರುವಾದ ಹರಟೆ, ರುಚ್ಚಯಾದಊಟ್ಹಾಗೂನೆಮಮ ದಿಯನಿದರ ಯಂದಿಗೆಮುಗಿಯತು. ಮುಂಜಾನೆ ಬೇಗ ಎದುು, ತಯಾರಾಗಿ, ಹವೆ ಕರ ನೆಚ್ಚಿ ನ ತಂಡಿ ತೆಳ್ಳ ೇವು ತಂದು, ತೆರೆದ […]',
    route: '/blog1',
  },
  {
    id: '2',
    image: '/blog2.png',
    title: 'Trekking 101: A Beginner’s Guide to Spotting Birds on the Trail',
    category: 'UNCATEGORIZED',
    date: '19 Jan 2023',
    excerpt: 'Trekking is not only a great way to get some exercise and enjoy the great outdoors, it’s also an opportunity to learn about the natural world around us. One of the best ways to do this is by keeping an eye out for the birds and plants that call the trail home. Bird spotting can […]',
    route: '/blog2',
  },
  {
    id: '3',
    image: '/blog3.jpg',
    title: 'Trekking 101: Essential Do’s and Don’ts for a Safe and Enjoyable Experience',
    category: 'MOUNTAINS',
    date: '19 Jan 2023',
    excerpt: 'Trekking in the great outdoors can be an exhilarating and rewarding experience, but it’s important to be prepared and to know the do’s and don’ts of trekking to ensure a safe and enjoyable trip. DO’s Do wear proper footwear and clothing. Make sure your shoes have a good grip and your clothing is appropriate for […]',
    route: '/blog3',
  },
  {
    id: '4',
    image: '/blog4.png',
    title: 'How to pack your bag for a trek: A Comprehensive guide',
    category: 'TREK',
    date: '19 Jan 2023',
    excerpt: 'Preparing for a trek in the Western Ghats can be daunting, but with the right planning and packing, it can be a breeze. At HighHawks, we believe that being prepared for a trek is crucial for a safe and enjoyable experience. When it comes to packing for a trek, the most important thing to keep […]',
    route: '/blog4',
  },
  {
    id: '5',
    image: '/blog5.jpg',
    title: 'Responsible trekking: The importance of preserving the natural environment',
    category: 'TREK',
    date: '19 Jan 2023',
    excerpt: 'Trekking in the Western Ghats is an unforgettable experience, but it’s important to remember that we are guests in this natural environment and it’s our responsibility to take care of it. At HighHawks, we are committed to responsible trekking and preserving the natural environment for future generations to enjoy. One of the most important ways […]',
    route: '/blog5',
  },
  {
    id: '6',
    image: '/blog6.jpeg',
    title: 'Trekking 101: Camping in the Mountains a DIY Guide for pitching the Tents',
    category: 'TREK',
    date: '19 Jan 2023',
    excerpt: 'Camping in the mountains is a great way to experience the beauty of the Western Ghats. At HighHawks, we understand that not everyone is comfortable with the idea of camping, especially if you’re new to it. That’s why we’re here to provide you with a guide on how to pitch a tent in the mountains. […]',
    route: '/blog6',
  },
  {
    id: '7',
    image: '/blog7.jpg',
    title: 'First-Time Trekker? A Beginner’s Guide to Preparing for an Trek',
    category: 'TREK',
    date: '19 Jan 2023',
    excerpt: 'Trekking in the Western Ghats is an unforgettable experience, but it’s important to be prepared for the journey ahead. At HighHawks, we want to make sure that your trekking experience is as comfortable and enjoyable as possible, so we’ve put together this 101 guide on how to prepare for your trek. Get in shape: Trekking […]',
    route: '/blog7',
  },
  {
    id: '8',
    image: '/blog8.jpg',
    title: 'Connecting with the Western Ghats: A Personal Journey with HighHawks',
    category: 'HIGHHAWKS',
    date: '19 Jan 2023',
    excerpt: 'The Western Ghats are an integral part of HighHawks. As a company, we are deeply connected to this beautiful mountain range and are passionate about showcasing its natural beauty to others. The Western Ghats, also known as Sahyadri, is a mountain range that runs parallel to the western coast of India. It stretches over 1600 […]',
    route: '/blog8',
  },
  {
    id: '9',
    image: '/blog9.jpg',
    title: 'Our Story',
    category: 'HIGHHAWKS',
    date: '19 Jan 2023',
    excerpt: 'Welcome to the HighHawks blog! Here, we want to share with you the story behind our company and the passion that drives us to provide the best trekking experiences in the Western Ghats. HighHawks was founded by a group of outdoor enthusiasts who were passionate about exploring the natural beauty of the Western Ghats. We […]',
    route: '/blog9',
  },
  {
    id: '10',
    image: '/blog10.jpg',
    title: 'Peek-A-Boo',
    category: 'TREK',
    date: '19 Jan 2023',
    excerpt: 'This is The Adrenaline Trek Story of “19 Friends” Exploring the Pristine Rivulet emerging from the Green Shola Covers of Kudremuka and Emblazoned Chikmagaluru. Trekking accross many Segments of the River skirting through Dense Deciduous Jungles, the All Terrain Adventure Begun from Campsite to the Best aspects of Western Ghats of Karnataka above the Clouds. […]',
    route: '/blog10',
  },
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || b.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="blog-container">
      <NavbarTrip/>
      <section className="blog-header">
        <img src="/bandaje.jpg" alt="Blog Banner" className="blog-banner-img" />
        <div className="blog-search-overlay">
          <input
            type="text"
            placeholder="Search blog articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="blog-filter-dropdown"
          >
            <option value="ALL">Categories</option>
            <option value="TREK">Trek</option>
            <option value="HIGHHAWKS">HighHawks</option>
            <option value="MOUNTAINS">Mountains</option>
            <option value="UNCATEGORIZED">Uncategorized</option>
          </select>
        </div>
      </section>

      <section className="blog-list-wrapper">
        <h2 className="blog-section-title">Latest Blogs</h2>
        <div className="blog-grid">
          {filteredBlogs.map((b) => (
            <div key={b.id} className="blog-card">
              <img src={b.image} alt={b.title} />
              <div className="card-meta">
                <span className="cat">{b.category}</span>
                <span className="date">{b.date}</span>
              </div>
              <h3>
                <a href={b.route}>{b.title}</a>
              </h3>
              <p>{b.excerpt}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;









