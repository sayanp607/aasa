import React, { useState } from 'react';
import './Blog.css';
import NavbarTrip from '../Navbartrip';

const blogs = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1544735239-159ec9253fd2?auto=format&fit=crop&q=80&w=1200',
    title: 'ಓಂಕಾರೇಶ್ವರ ಚಾರಣ',
    category: 'HIGHHAWKS',
    date: '19 Jan 2023',
    excerpt: 'ಮಾರ್ಚ್ ೧೭, ೨೦೨೩ರಂದು ಆರಂಭವಾದ ಪುಟ್ಟ ಪ್ರ ವಾಸ, ಇಷ್ಟ ಂದು ನೆನಪುಗಳನ್ನು ಕಟ್ಟಟ ಕೊಡುವುದಂದುಭಾವಿಸಿರಲಿಲ್ಲ...',
    route: '/blog1',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    title: 'Trekking 101: A Beginner’s Guide to Spotting Birds on the Trail',
    category: 'UNCATEGORIZED',
    date: '19 Jan 2023',
    excerpt: 'Trekking is not only a great way to get some exercise and enjoy the great outdoors...',
    route: '/blog2',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070',
    title: 'Trekking 101: Essential Do’s and Don’ts for a Safe and Enjoyable Experience',
    category: 'MOUNTAINS',
    date: '19 Jan 2023',
    excerpt: 'Trekking in the great outdoors can be an exhilarating and rewarding experience...',
    route: '/blog3',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1974',
    title: 'How to pack your bag for a trek: A Comprehensive guide',
    category: 'TREK',
    date: '19 Jan 2023',
    excerpt: 'Preparing for a trek in the Western Ghats can be daunting, but with the right planning...',
    route: '/blog4',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070',
    title: 'Responsible trekking: The importance of preserving the natural environment',
    category: 'TREK',
    date: '19 Jan 2023',
    excerpt: 'Trekking in the Western Ghats is an unforgettable experience...',
    route: '/blog5',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=2070',
    title: 'Trekking 101: Camping in the Mountains a DIY Guide for pitching the Tents',
    category: 'TREK',
    date: '19 Jan 2023',
    excerpt: 'Camping in the mountains is a great way to experience the beauty of the Western Ghats...',
    route: '/blog6',
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=2070',
    title: 'First-Time Trekker? A Beginner’s Guide to Preparing for an Trek',
    category: 'TREK',
    date: '19 Jan 2023',
    excerpt: 'Trekking in the Western Ghats is an unforgettable experience...',
    route: '/blog7',
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1974',
    title: 'Connecting with the Western Ghats: A Personal Journey with HighHawks',
    category: 'HIGHHAWKS',
    date: '19 Jan 2023',
    excerpt: 'The Western Ghats are an integral part of HighHawks...',
    route: '/blog8',
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=2070',
    title: 'Our Story',
    category: 'HIGHHAWKS',
    date: '19 Jan 2023',
    excerpt: 'Welcome to the HighHawks blog! Here, we want to share with you the story...',
    route: '/blog9',
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac911881?auto=format&fit=crop&q=80&w=2070',
    title: 'Peek-A-Boo',
    category: 'TREK',
    date: '19 Jan 2023',
    excerpt: 'This is The Adrenaline Trek Story of “19 Friends” Exploring the Pristine...',
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

  const featuredBlog = blogs[0];
  const remainingBlogs = filteredBlogs.filter(b => b.id !== featuredBlog.id);

  return (
    <div className="blog-container">
      <NavbarTrip/>
      <section className="blog-header">
        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600" alt="Blog Banner" className="blog-banner-img" loading="lazy" />
        <div className="blog-search-overlay">
          <input
            type="text"
            placeholder="Search adventure logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="blog-filter-dropdown"
          >
            <option value="ALL">All Categories</option>
            <option value="TREK">Trek</option>
            <option value="HIGHHAWKS">HighHawks</option>
            <option value="MOUNTAINS">Mountains</option>
            <option value="UNCATEGORIZED">Uncategorized</option>
          </select>
        </div>
      </section>

      {/* Featured Section */}
      {searchTerm === '' && filterCategory === 'ALL' && (
          <section className="blog-featured-section">
              <div className="featured-card">
                  <img src={featuredBlog.image} alt={featuredBlog.title} className="featured-img" loading="lazy" />
                  <div className="featured-content">
                      <div className="card-meta">
                          <span className="cat">{featuredBlog.category}</span>
                          <span className="date">{featuredBlog.date}</span>
                      </div>
                      <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: '1.1' }}>{featuredBlog.title}</h2>
                      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#64748b' }}>{featuredBlog.excerpt}</p>
                      <a href={featuredBlog.route} className="view-btn" style={{ width: 'fit-content' }}>Read Full Story</a>
                  </div>
              </div>
          </section>
      )}

      <section className="blog-list-wrapper">
        <h2 className="blog-section-title">Expedition Journals</h2>
        <div className="blog-grid">
          {(searchTerm === '' && filterCategory === 'ALL' ? remainingBlogs : filteredBlogs).map((b) => (
            <div key={b.id} className="blog-card">
              <img src={b.image} alt={b.title} loading="lazy" />
              <div className="card-content">
                <div className="card-meta">
                    <span className="cat">{b.category}</span>
                    <span className="date">{b.date}</span>
                </div>
                <h3>
                    <a href={b.route}>{b.title}</a>
                </h3>
                <p>{b.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;









