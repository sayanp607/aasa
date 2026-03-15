import React from 'react';
import './About.css';
import NavbarTrip from '../Navbartrip';

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1544735239-159ec9253fd2?auto=format&fit=crop&q=80&w=1200',
    alt: 'Expedition Beginnings',
    title: 'THE GENESIS',
    text: `HighHawks emerged from the mist of the Western Ghats, founded by a collective of elite mountaineers who recognized that the true soul of adventure lay in the untouched peaks of Karnataka.`,
  },
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    alt: 'The Mission',
    title: 'OUR MANDATE',
    text: `To bridge the gap between human spirit and the wild. We don't just organize treks; we forge epic journeys that challenge your limits while ensuring world-class safety and comfort in the heart of nature.`,
  },
  {
    src: 'https://images.unsplash.com/photo-1627850604058-52e40de1b847?auto=format&fit=crop&q=80&w=1200',
    alt: 'Future Horizons',
    title: '2024 VISION',
    text: `Establishing new technical routes across the Sahyadri range, pioneering wilderness survival matrices, and expanding our high-altitude medical protocols for global-standard expeditions.`,
  },
];

const team = [
  { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600', name: 'Amar Revankar', role: 'Expedition Commander - Lead Mountaineer' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600', name: 'Ashwath Hegde', role: 'Logistics Specialist - Safety Protocol Officer' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600', name: 'Priya Rao', role: 'Content Strategist - Aerial Specialist' },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600', name: 'Sameer Das', role: 'Survival Expert - Combat Tracker' },
];

function AboutPage() {
  return (
    <div className="about-container">
      <NavbarTrip/>
      
      <section className="about-hero">
        <div className="hero-content">
            <span className="subtitle">HighHawks Dossier</span>
            <h1>Architects of Adventure</h1>
        </div>
      </section>

      <section className="story-timeline">
          <div className="container">
              <h2 className="section-title">Expedition History</h2>
              <div className="timeline-grid">
                  {gallery.map((g, i) => (
                    <div key={i} className="timeline-item">
                        <div className="timeline-img-wrapper">
                            <img src={g.src} alt={g.alt} loading="lazy" />
                        </div>
                        <div className="timeline-content">
                            <h3>{g.title}</h3>
                            <p>{g.text}</p>
                        </div>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      <section className="about-video-section">
        <div className="container">
            <h2 className="section-title">Field Operations</h2>
            <div className="about-video">
                <iframe
                src="https://www.youtube.com/embed/V_cGoGUZiN8"
                title="About HighHawks"
                allowFullScreen
                ></iframe>
            </div>
        </div>
      </section>

      <section className="leadership">
        <div className="container">
            <h2 className="section-title">Mission Specialists</h2>
            <div className="team-grid">
            {team.map((m, i) => (
                <div key={i} className="team-member">
                <div className="team-img-wrapper">
                    <img src={m.src} alt={m.name} />
                </div>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
                </div>
            ))}
            </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
