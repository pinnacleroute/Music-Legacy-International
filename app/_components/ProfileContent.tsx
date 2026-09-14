'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  Crown,
  ExternalLink,
  Eye,
  FileText,
  Heart,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Play,
  Radio,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react';
import {
  getMemberById,
  getRelationshipContext,
  MemberData,
  MemberPortfolioItem,
} from '../../src/data/members';

export default function ProfileContent() {
  const params = useParams();
  const routeId = typeof params?.id === 'string' ? params.id : 'sarah-monroe';

  // Allow easy toggling between viewing Sarah Monroe (other member) and Alex Carter (own profile)
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const activeMemberId = selectedMemberId ?? routeId;

  const profile: MemberData = useMemo(() => getMemberById(activeMemberId), [activeMemberId]);
  const isOwnProfile = profile.id === 'alex-carter';

  // Relationship context (when viewing other member)
  const relationship = useMemo(
    () => getRelationshipContext(profile.id, 'alex-carter'),
    [profile.id]
  );

  // Connection & follow states
  const [connectionStatus, setConnectionStatus] = useState<'Connect' | 'Request Sent' | 'Connected'>(
    relationship.connectionStatus
  );
  const [isFollowing, setIsFollowing] = useState(relationship.followStatus);
  const [isSaved, setIsSaved] = useState(false);
  const [notice, setNotice] = useState<string>('');

  // Profile tabs: Overview, Activity, Portfolio, Connections
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'portfolio' | 'connections'>('overview');

  // Modals & Drawers
  const [showMatchDrawer, setShowMatchDrawer] = useState(false);
  const [showMutualsModal, setShowMutualsModal] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<MemberPortfolioItem | null>(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Connection handler
  const handleConnect = () => {
    if (connectionStatus === 'Connect') {
      setConnectionStatus('Request Sent');
      setNotice(`Connection request sent to ${profile.name.split(' ')[0]}. Direct messaging unlocks once accepted.`);
    } else if (connectionStatus === 'Request Sent') {
      setConnectionStatus('Connected');
      setNotice(`Simulated: ${profile.name.split(' ')[0]} accepted your request! Messaging is now active.`);
    } else {
      setConnectionStatus('Connect');
      setNotice(`Connection removed.`);
    }
  };

  const handleMessage = () => {
    if (connectionStatus !== 'Connected') {
      setShowMessageModal(true);
    } else {
      setShowMessageModal(true);
    }
  };

  return (
    <div className="profile-container">
      {/* Dev / Demonstration Profile Switcher */}
      <div className="profile-preview-bar">
        <div className="preview-bar-left">
          <span className="preview-pill">Profile Mode</span>
          <span className="preview-desc">
            {isOwnProfile
              ? 'Viewing your own profile (Alex Carter) with editable state & completeness.'
              : `Viewing ${profile.name}’s public profile as an MLI member.`}
          </span>
        </div>
        <div className="preview-bar-right">
          <button
            className={`preview-switch-btn ${!isOwnProfile ? 'active' : ''}`}
            onClick={() => {
              setSelectedMemberId('sarah-monroe');
              setConnectionStatus('Connect');
              setIsFollowing(false);
              setActiveTab('overview');
            }}
          >
            Sarah Monroe (Booking Agent)
          </button>
          <button
            className={`preview-switch-btn ${isOwnProfile ? 'active' : ''}`}
            onClick={() => {
              setSelectedMemberId('alex-carter');
              setActiveTab('overview');
            }}
          >
            Alex Carter (My Profile)
          </button>
        </div>
      </div>

      {/* Global Notification Toast */}
      {notice && (
        <div className="profile-toast-banner" role="status">
          <div className="toast-content">
            <Sparkles size={16} />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice('')} aria-label="Dismiss notification">
            <X size={15} />
          </button>
        </div>
      )}

      {/* 1. REFRAMED HERO SECTION */}
      <header className="profile-human-hero">
        {/* Subtle Ambient Cover Visual */}
        <div
          className="hero-cover-visual"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(7, 15, 32, 0.45) 0%, rgba(7, 15, 32, 0.95) 100%), url(${profile.cover})`,
          }}
        >
          <div className="cover-glow-accent" />
        </div>

        <div className="hero-profile-body">
          {/* Real Photo with Trust Badge */}
          <div className="hero-avatar-wrapper" key={profile.id}>
            <img
              src={profile.photo}
              alt={profile.name}
              className="hero-avatar-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'grid';
              }}
            />
            <div className="hero-avatar-fallback" style={{ display: 'none' }}>
              <span>{profile.initials}</span>
            </div>
            <div className="hero-trust-badge" title="Identity and professional information reviewed by Music Legacy">
              <ShieldCheck size={18} />
            </div>
          </div>

          {/* Identity & Status Information */}
          <div className="hero-info-block">
            <div className="hero-badges-line">
              <span className="hero-trust-tag">
                <ShieldCheck size={13} /> {profile.trustStatus}
              </span>
              <span className="hero-membership-tag">
                {['Pro Platinum', 'VIP / Alliance', 'Premium'].includes(profile.membership) ? <Crown size={13} /> : null}
                {profile.membership} Member
              </span>
              <span className="hero-type-tag">{profile.memberType}</span>
            </div>

            <h1 className="hero-name">{profile.name}</h1>

            <div className="hero-meta-row">
              <span className="hero-role-location">
                <b>{profile.role}</b> · <MapPin size={13} className="inline-icon" /> {profile.location}
              </span>
              <span className="hero-separator">·</span>
              <span className="hero-availability">
                <span className="availability-pulse-dot" />
                {profile.availability}
              </span>
            </div>

            {/* Short Human Professional Identity Sentence */}
            <p className="hero-headline-sentence">{profile.headline}</p>

            {/* Secondary Social Graph Counters (Clickable, Not KPI Boxes) */}
            <div className="hero-social-counters">
              <button
                type="button"
                className="counter-link"
                onClick={() => setActiveTab('connections')}
                title="View Connections"
              >
                <b>{profile.followersCount}</b> followers
              </button>
              <span className="counter-dot">·</span>
              <button
                type="button"
                className="counter-link"
                onClick={() => setActiveTab('connections')}
                title="View Connections"
              >
                <b>{profile.followingCount}</b> following
              </button>
              <span className="counter-dot">·</span>
              <button
                type="button"
                className="counter-link"
                onClick={() => setActiveTab('connections')}
                title="View Connections"
              >
                <b>{profile.connectionsCount}</b> connections
              </button>

              {!isOwnProfile && (
                <>
                  <span className="counter-dot">·</span>
                  <span className="hero-fit-tag">
                    <Sparkles size={12} /> {relationship.matchFitLabel}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Primary & Secondary Actions */}
          <div className="hero-actions-block">
            {!isOwnProfile ? (
              <>
                <button
                  type="button"
                  onClick={handleConnect}
                  className={`btn-primary-action ${connectionStatus !== 'Connect' ? 'btn-active-state' : ''}`}
                >
                  {connectionStatus === 'Connected' ? (
                    <>
                      <Check size={16} /> Connected
                    </>
                  ) : connectionStatus === 'Request Sent' ? (
                    <>
                      <Clock3 size={16} /> Request Sent
                    </>
                  ) : (
                    <>
                      <Users size={16} /> Connect
                    </>
                  )}
                </button>

                <button type="button" onClick={handleMessage} className="btn-secondary-action">
                  <MessagesSquare size={16} /> Message
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsFollowing(!isFollowing);
                    setNotice(!isFollowing ? `Now following ${profile.name}.` : `Unfollowed ${profile.name}.`);
                  }}
                  className={`btn-tertiary-action ${isFollowing ? 'btn-active-state' : ''}`}
                  title={isFollowing ? 'Unfollow' : 'Follow'}
                >
                  {isFollowing ? <Check size={15} /> : <Radio size={15} />}
                  <span>{isFollowing ? 'Following' : 'Follow'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`btn-icon-action ${isSaved ? 'btn-saved' : ''}`}
                  aria-label={isSaved ? 'Unsave profile' : 'Save profile'}
                  title={isSaved ? 'Saved to bookmarks' : 'Save profile'}
                >
                  <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
                </button>

                <div className="dropdown-wrapper">
                  <button
                    type="button"
                    onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                    className="btn-icon-action"
                    aria-label="More options"
                  >
                    <ChevronDown size={16} />
                  </button>
                  {moreMenuOpen && (
                    <div className="dropdown-menu">
                      <button
                        onClick={() => {
                          setMoreMenuOpen(false);
                          setShowIntroModal(true);
                        }}
                      >
                        <Zap size={14} /> Request Warm Introduction
                      </button>
                      <button
                        onClick={() => {
                          setMoreMenuOpen(false);
                          setShowMatchDrawer(true);
                        }}
                      >
                        <Sparkles size={14} /> View Match Breakdown
                      </button>
                      <button
                        onClick={() => {
                          setMoreMenuOpen(false);
                          navigator.clipboard?.writeText(window.location.href);
                          setNotice('Profile link copied to clipboard.');
                        }}
                      >
                        <Copy size={14} /> Copy Profile Link
                      </button>
                      <button
                        onClick={() => {
                          setMoreMenuOpen(false);
                          setNotice('Report flagged for community moderation review.');
                        }}
                      >
                        <ShieldAlert size={14} /> Report Profile
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Own Profile Actions */
              <div className="own-profile-action-group">
                <button type="button" onClick={() => setShowEditModal(true)} className="btn-primary-action">
                  Edit My Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMemberId('sarah-monroe');
                    setNotice('Viewing public member profile experience.');
                  }}
                  className="btn-secondary-action"
                >
                  <Eye size={15} /> Preview Public
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Lightweight Own Profile Completeness Bar (No large dashboard gauge) */}
        {isOwnProfile && (
          <div className="hero-own-completeness">
            <div className="completeness-info">
              <span className="completeness-percent">Profile 78% complete</span>
              <span className="completeness-next">Next: Add live performance media to boost booking visibility</span>
            </div>
            <div className="completeness-track">
              <div className="completeness-fill" style={{ width: '78%' }} />
            </div>
          </div>
        )}
      </header>

      {/* 2. ONE STRONG "WHY THIS CONNECTION MAKES SENSE" STRIP (Below Hero) */}
      {!isOwnProfile && (
        <div className="why-connection-strip">
          <div className="why-strip-left">
            <div className="why-sparkle-icon">
              <Sparkles size={18} />
            </div>
            <div className="why-text-content">
              <span className="why-kicker">WHY THIS CONNECTION MAKES SENSE</span>
              <p className="why-summary">
                {profile.name.split(' ')[0]} matches your booking needs, New York market, live-performance goal, and
                Blues & Soul profile.
              </p>
            </div>
          </div>
          <div className="why-strip-actions">
            <button
              type="button"
              className="why-match-btn"
              onClick={() => setShowMatchDrawer(true)}
            >
              Why this match? <ArrowRight size={13} />
            </button>

            <button
              type="button"
              className="why-mutuals-btn"
              onClick={() => setShowMutualsModal(true)}
            >
              <div className="avatar-stack">
                {relationship.mutualConnections.slice(0, 2).map((m) => (
                  <img key={m.id} src={m.photo} alt={m.name} className="stack-avatar" />
                ))}
              </div>
              <span>{relationship.mutualConnections.length} mutual connections</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. SUBNAV TABS (Reduces Vertical Length & Organizes Profile) */}
      <nav className="profile-subnav-tabs" aria-label="Profile navigation tabs">
        <button
          type="button"
          className={`tab-item ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          type="button"
          className={`tab-item ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
          {profile.activity.length > 0 && <span className="tab-pill">{profile.activity.length}</span>}
        </button>
        <button
          type="button"
          className={`tab-item ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          Portfolio & Media
          <span className="tab-pill">{profile.portfolio.length}</span>
        </button>
        <button
          type="button"
          className={`tab-item ${activeTab === 'connections' ? 'active' : ''}`}
          onClick={() => setActiveTab('connections')}
        >
          Connections & Groups
          <span className="tab-pill">{profile.groups.length}</span>
        </button>
      </nav>

      {/* MAIN TWO-COLUMN CONTENT GRID */}
      <div className="profile-layout-grid">
        {/* LEFT PRIMARY COLUMN */}
        <main className="profile-primary-column">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-pane-animate">
              {/* Simplified About Section */}
              <section className="profile-card-clean">
                <div className="card-header-row">
                  <h2>About {profile.name.split(' ')[0]}</h2>
                  {isOwnProfile && (
                    <button onClick={() => setShowEditModal(true)} className="card-action-link">
                      Edit Bio
                    </button>
                  )}
                </div>
                <p className="about-narrative-text">{profile.bio}</p>

                {/* 3 Supporting Trust Facts Only (Clean, not heavy KPI tiles) */}
                <div className="trust-facts-strip">
                  {profile.trustFacts.map((fact, idx) => (
                    <div key={idx} className="trust-fact-item">
                      <span className="fact-value">{fact.value}</span>
                      <span className="fact-label">{fact.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* One Clean "Professional Snapshot" */}
              <section className="profile-card-clean">
                <div className="card-header-row">
                  <h2>Professional Snapshot</h2>
                </div>
                <div className="snapshot-horizontal-grid">
                  <div className="snapshot-item">
                    <span className="snapshot-label">Experience</span>
                    <span className="snapshot-value">{profile.snapshot.experience}</span>
                  </div>
                  <div className="snapshot-item">
                    <span className="snapshot-label">Focus</span>
                    <span className="snapshot-value">{profile.snapshot.focus}</span>
                  </div>
                  <div className="snapshot-item">
                    <span className="snapshot-label">Market</span>
                    <span className="snapshot-value">{profile.snapshot.market}</span>
                  </div>
                  <div className="snapshot-item wide">
                    <span className="snapshot-label">Specialties</span>
                    <span className="snapshot-value">{profile.snapshot.specialties.join(' · ')}</span>
                  </div>
                </div>
              </section>

              {/* Merged Skills + Genres (Expertise & Focus) */}
              <section className="profile-card-clean">
                <div className="card-header-row">
                  <h2>Expertise & Focus</h2>
                </div>
                <div className="expertise-merged-wrap">
                  <div className="expertise-group">
                    <span className="group-label">Skills & Capabilities</span>
                    <div className="pill-tags-list">
                      {profile.skills.map((skill) => (
                        <span key={skill} className="skill-pill">
                          <Check size={12} /> {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="expertise-group">
                    <span className="group-label">Genres & Musical Styles</span>
                    <div className="pill-tags-list">
                      {profile.genres.map((genre) => (
                        <span key={genre} className="genre-pill">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Editorial Timeline Experience (Not over-boxed) */}
              {profile.experience.length > 0 && (
                <section className="profile-card-clean">
                  <div className="card-header-row">
                    <h2>Experience</h2>
                  </div>
                  <div className="editorial-timeline">
                    {profile.experience.map((exp, idx) => (
                      <article key={idx} className="timeline-entry">
                        <div className="timeline-marker">
                          <BriefcaseBusiness size={15} />
                        </div>
                        <div className="timeline-body">
                          <div className="timeline-heading-row">
                            <h3>{exp.role}</h3>
                            <span className="timeline-period">{exp.period}</span>
                          </div>
                          <p className="timeline-org">{exp.organization}</p>
                          <p className="timeline-summary">“{exp.summary}”</p>
                          {exp.highlight && <p className="timeline-highlight">{exp.highlight}</p>}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Visual Portfolio & Media Preview */}
              <section className="profile-card-clean">
                <div className="card-header-row">
                  <h2>Portfolio & Media</h2>
                  <button onClick={() => setActiveTab('portfolio')} className="card-action-link">
                    View all ({profile.portfolio.length}) <ArrowRight size={13} />
                  </button>
                </div>
                <div className="portfolio-visual-grid">
                  {profile.portfolio.map((item) => (
                    <article
                      key={item.id}
                      className="portfolio-thumb-card"
                      onClick={() => setPreviewMedia(item)}
                      role="button"
                      tabIndex={0}
                    >
                      <div
                        className="thumb-image-wrap"
                        style={{ backgroundImage: `url(${item.thumbnail})` }}
                      >
                        <div className="thumb-type-badge">
                          {item.type === 'Video' ? (
                            <Video size={13} />
                          ) : item.type === 'Document' ? (
                            <FileText size={13} />
                          ) : item.type === 'Schedule' ? (
                            <CalendarDays size={13} />
                          ) : item.type === 'Audio' ? (
                            <Play size={13} />
                          ) : (
                            <ImageIcon size={13} />
                          )}
                          <span>{item.type}</span>
                        </div>
                        <div className="thumb-play-overlay">
                          <Play size={24} fill="currentColor" />
                        </div>
                      </div>
                      <div className="thumb-caption">
                        <h4>{item.title}</h4>
                        <p>{item.subtitle}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Recent From Sarah (Consolidated Activity & Social) */}
              <section className="profile-card-clean">
                <div className="card-header-row">
                  <h2>Recent from {profile.name.split(' ')[0]}</h2>
                  <button onClick={() => setActiveTab('activity')} className="card-action-link">
                    View all activity <ArrowRight size={13} />
                  </button>
                </div>
                {/* 2-3 concise activity bullets */}
                <div className="recent-activity-list">
                  {profile.activity.slice(0, 3).map((act) => (
                    <div key={act.id} className="recent-activity-row">
                      <span className="activity-bullet-dot" />
                      <p className="activity-text">{act.title}</p>
                      <span className="activity-time">{act.time}</span>
                    </div>
                  ))}
                </div>

                {/* Most recent social post */}
                {profile.socialPosts.length > 0 && (
                  <div className="embedded-social-post">
                    <div className="post-author-row">
                      <img src={profile.photo} alt={profile.name} className="post-author-avatar" />
                      <div>
                        <b>{profile.name}</b>
                        <span>
                          {profile.role} · {profile.socialPosts[0].time}
                        </span>
                      </div>
                      <span className="post-tag-pill">{profile.socialPosts[0].tag}</span>
                    </div>
                    <p className="post-content-body">{profile.socialPosts[0].content}</p>
                    <div className="post-meta-actions">
                      <span>
                        <Heart size={13} /> {profile.socialPosts[0].likes}
                      </span>
                      <span>
                        <MessageCircle size={13} /> {profile.socialPosts[0].replies} replies
                      </span>
                    </div>
                  </div>
                )}
              </section>

              {/* Opportunities from Sarah (Top 2 only, with View All) */}
              {profile.opportunities.length > 0 && (
                <section className="profile-card-clean">
                  <div className="card-header-row">
                    <h2>Opportunities from {profile.name.split(' ')[0]}</h2>
                    <Link href="/opportunities" className="card-action-link">
                      View All Opportunities <ArrowRight size={13} />
                    </Link>
                  </div>
                  <div className="opportunities-compact-list">
                    {profile.opportunities.slice(0, 2).map((opp) => (
                      <Link key={opp.id} href="/opportunities" className="opp-compact-card">
                        <div className="opp-info">
                          <span className="opp-type">{opp.type}</span>
                          <h4>{opp.title}</h4>
                          <span className="opp-comp">{opp.compensation}</span>
                        </div>
                        <span className="opp-fit-badge">{opp.matchFit}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Upcoming Events (Top 2 only, with View All) */}
              {profile.events.length > 0 && (
                <section className="profile-card-clean">
                  <div className="card-header-row">
                    <h2>Upcoming Events</h2>
                    <Link href="/events" className="card-action-link">
                      View All Events <ArrowRight size={13} />
                    </Link>
                  </div>
                  <div className="events-compact-list">
                    {profile.events.slice(0, 2).map((evt) => (
                      <Link key={evt.id} href="/events" className="event-compact-card">
                        <div className="event-date-block">
                          <CalendarDays size={18} />
                          <span>{evt.date}</span>
                        </div>
                        <div className="event-info">
                          <h4>{evt.title}</h4>
                          <p>
                            {evt.time} · {evt.location}
                          </p>
                        </div>
                        <ArrowRight size={15} className="link-arrow" />
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Recommendations / Testimonials (1-2 strong quotes) */}
              {profile.recommendations.length > 0 && (
                <section className="profile-card-clean">
                  <div className="card-header-row">
                    <h2>Recommendations</h2>
                  </div>
                  <div className="testimonials-editorial-grid">
                    {profile.recommendations.slice(0, 2).map((rec, idx) => (
                      <blockquote key={idx} className="testimonial-quote-card">
                        <p className="quote-body">“{rec.quote}”</p>
                        <footer className="quote-footer">
                          <img src={rec.avatar} alt={rec.author} className="recommender-avatar" />
                          <div>
                            <cite className="recommender-name">{rec.author}</cite>
                            <span className="recommender-role">{rec.role}</span>
                          </div>
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </section>
              )}

              {/* Services & Groups in Common */}
              <div className="two-cards-row">
                {/* Services */}
                {profile.services.length > 0 && (
                  <section className="profile-card-clean flex-1">
                    <div className="card-header-row">
                      <h2>Services</h2>
                      <Link href="/marketplace" className="card-action-link">
                        Marketplace <ArrowRight size={12} />
                      </Link>
                    </div>
                    <div className="services-compact-list">
                      {profile.services.map((srv, idx) => (
                        <Link key={idx} href="/marketplace" className="service-compact-item">
                          <div>
                            <b>{srv.title}</b>
                            <p>{srv.description}</p>
                          </div>
                          <span className="service-price">{srv.pricing}</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Groups in Common */}
                {profile.groups.length > 0 && (
                  <section className="profile-card-clean flex-1">
                    <div className="card-header-row">
                      <h2>Groups in Common</h2>
                      <Link href="/community" className="card-action-link">
                        All Groups <ArrowRight size={12} />
                      </Link>
                    </div>
                    <div className="groups-compact-list">
                      {profile.groups.map((grp) => (
                        <Link key={grp.id} href={`/community/${grp.id}`} className="group-compact-item">
                          <div className="group-icon-wrap">
                            <Users size={16} />
                          </div>
                          <div className="group-info">
                            <b>{grp.name}</b>
                            <small>{grp.members}</small>
                          </div>
                          <span className="group-relevance">{grp.relevance}</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Quiet Professional Links / Contact Footer */}
              {profile.links.length > 0 && (
                <section className="profile-quiet-links-footer">
                  <span className="quiet-label">Professional Links:</span>
                  <div className="links-row">
                    {profile.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="quiet-link-item"
                        onClick={(e) => {
                          e.preventDefault();
                          setNotice(`Navigating to ${link.label} (simulated).`);
                        }}
                      >
                        <ExternalLink size={13} />
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* TAB 2: ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="tab-pane-animate">
              <section className="profile-card-clean">
                <div className="card-header-row">
                  <h2>All Recent Posts & Updates</h2>
                </div>
                <div className="activity-posts-feed">
                  {profile.socialPosts.map((post) => (
                    <article key={post.id} className="embedded-social-post feed-item">
                      <div className="post-author-row">
                        <img src={profile.photo} alt={profile.name} className="post-author-avatar" />
                        <div>
                          <b>{profile.name}</b>
                          <span>
                            {profile.role} · {post.time}
                          </span>
                        </div>
                        <span className="post-tag-pill">{post.tag}</span>
                      </div>
                      <p className="post-content-body">{post.content}</p>
                      <div className="post-meta-actions">
                        <button type="button" className="like-btn" onClick={() => setNotice('Liked post.')}>
                          <Heart size={14} /> {post.likes}
                        </button>
                        <span>
                          <MessageCircle size={14} /> {post.replies} replies
                        </span>
                      </div>
                    </article>
                  ))}

                  <div className="activity-timeline-section">
                    <h3 className="subhead-title">Platform Activity Log</h3>
                    <div className="activity-log-list">
                      {profile.activity.map((act) => (
                        <div key={act.id} className="log-item">
                          <span className="log-bullet" />
                          <div className="log-content">
                            <p>{act.title}</p>
                            <small>{act.time}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* TAB 3: PORTFOLIO & MEDIA */}
          {activeTab === 'portfolio' && (
            <div className="tab-pane-animate">
              <section className="profile-card-clean">
                <div className="card-header-row">
                  <h2>Portfolio, Media & Press Assets</h2>
                </div>
                <p className="section-subtext">
                  Curated proof of work, live showcase recordings, pitch decks, and press features.
                </p>
                <div className="portfolio-expanded-grid">
                  {profile.portfolio.map((item) => (
                    <article
                      key={item.id}
                      className="portfolio-expanded-card"
                      onClick={() => setPreviewMedia(item)}
                    >
                      <div
                        className="expanded-thumb-wrap"
                        style={{ backgroundImage: `url(${item.thumbnail})` }}
                      >
                        <div className="thumb-type-badge">
                          {item.type === 'Video' ? <Video size={13} /> : <FileText size={13} />}
                          <span>{item.type}</span>
                        </div>
                        <div className="thumb-play-overlay">
                          <Play size={28} fill="currentColor" />
                        </div>
                      </div>
                      <div className="expanded-body">
                        <div className="expanded-title-line">
                          <h4>{item.title}</h4>
                          <span className="item-date">{item.date}</span>
                        </div>
                        <p className="item-subtitle">{item.subtitle}</p>
                        <p className="item-desc">{item.description}</p>
                        <button type="button" className="btn-preview-link">
                          Open Preview <ArrowRight size={13} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* TAB 4: CONNECTIONS */}
          {activeTab === 'connections' && (
            <div className="tab-pane-animate">
              <section className="profile-card-clean">
                <div className="card-header-row">
                  <h2>Mutual Connections in Network</h2>
                </div>
                <div className="mutual-connections-list">
                  {relationship.mutualConnections.map((person) => (
                    <div key={person.id} className="mutual-member-card">
                      <img src={person.photo} alt={person.name} className="mutual-avatar" />
                      <div className="mutual-info">
                        <h4>{person.name}</h4>
                        <p>
                          {person.role} · {person.location}
                        </p>
                        <small>Connected via MLI Community</small>
                      </div>
                      <button
                        type="button"
                        className="btn-view-member"
                        onClick={() => {
                          setSelectedMemberId(person.id);
                          setActiveTab('overview');
                        }}
                      >
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="profile-card-clean mt-4">
                <div className="card-header-row">
                  <h2>Shared Groups & Communities</h2>
                </div>
                <div className="groups-compact-list">
                  {profile.groups.map((grp) => (
                    <Link key={grp.id} href={`/community/${grp.id}`} className="group-compact-item">
                      <div className="group-icon-wrap">
                        <Users size={16} />
                      </div>
                      <div className="group-info">
                        <b>{grp.name}</b>
                        <small>{grp.members}</small>
                      </div>
                      <span className="group-relevance">{grp.relevance}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>

        {/* RIGHT CONTEXTUAL RAIL: "AT A GLANCE" (Replaces Large Analytical Dashboard) */}
        <aside className="profile-contextual-rail">
          {/* Main "At a Glance" Card */}
          <div className="rail-at-a-glance-card">
            <h3 className="rail-heading">AT A GLANCE</h3>

            <div className="glance-section">
              <span className="glance-label">Looking For:</span>
              <ul className="glance-list">
                {profile.lookingFor.map((item, idx) => (
                  <li key={idx}>
                    <Check size={14} className="glance-check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glance-section">
              <span className="glance-label">Available For:</span>
              <ul className="glance-list">
                {profile.availableFor.map((item, idx) => (
                  <li key={idx}>
                    <Check size={14} className="glance-check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response Context */}
            <div className="glance-response-time">
              <Clock3 size={14} />
              <span>{profile.responseTime}</span>
            </div>

            {/* Action CTA */}
            {!isOwnProfile && (
              <div className="glance-action-wrap">
                <button
                  type="button"
                  onClick={handleConnect}
                  className="btn-rail-primary"
                >
                  {connectionStatus === 'Connected' ? (
                    <>
                      <MessagesSquare size={15} /> Message {profile.name.split(' ')[0]}
                    </>
                  ) : connectionStatus === 'Request Sent' ? (
                    <>
                      <Clock3 size={15} /> Request Pending
                    </>
                  ) : (
                    <>
                      <Users size={15} /> Connect with {profile.name.split(' ')[0]}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowIntroModal(true)}
                  className="btn-rail-intro"
                >
                  <Zap size={13} /> Request Warm Introduction
                </button>
              </div>
            )}
          </div>

          {/* Quiet FastTrack Relevance Card */}
          {!isOwnProfile && (
            <div className="rail-subtle-card">
              <div className="subtle-card-header">
                <Zap size={14} className="accent-gold" />
                <span>FastTrack Connection</span>
              </div>
              <p className="subtle-card-body">{relationship.fastTrackRelevance}</p>
              <Link href="/fasttrack" className="subtle-card-link">
                View FastTrack goal <ArrowRight size={12} />
              </Link>
            </div>
          )}

          {/* Quiet Social Proof Card */}
          {!isOwnProfile && relationship.socialProof.length > 0 && (
            <div className="rail-subtle-card">
              <div className="subtle-card-header">
                <Users size={14} className="accent-blue" />
                <span>In Your Network</span>
              </div>
              <ul className="social-proof-list">
                {relationship.socialProof.map((proof, idx) => (
                  <li key={idx}>{proof}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* MODALS & DRAWERS */}
      {/* ========================================================================= */}

      {/* 1. MATCH BREAKDOWN DRAWER (Click: "Why this match?") */}
      {showMatchDrawer && (
        <div className="modal-backdrop-overlay" onClick={() => setShowMatchDrawer(false)}>
          <aside className="slide-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <span className="drawer-kicker">WHY YOU’RE A STRONG FIT</span>
                <h2>Relationship Breakdown</h2>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setShowMatchDrawer(false)}
                aria-label="Close match drawer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="drawer-body-scroll">
              <div className="drawer-score-highlight">
                <div className="score-number-box">
                  <span className="score-num">{relationship.matchScore}%</span>
                  <span className="score-label">Relationship Fit</span>
                </div>
                <div className="score-text-box">
                  <h3>{relationship.fitHeadline}</h3>
                  <p>{relationship.bridgingRelevance}</p>
                </div>
              </div>

              <div className="drawer-section">
                <h4>Shared Signals & Verification</h4>
                <div className="signals-checklist">
                  {relationship.sharedSignals.map((signal, idx) => (
                    <div key={idx} className="signal-item">
                      <div className="signal-check-icon">
                        <Check size={14} />
                      </div>
                      <div className="signal-content">
                        <b>{signal.title}</b>
                        <p>{signal.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="drawer-section">
                <h4>Goal Alignment</h4>
                <div className="goal-alignment-box">
                  <div className="align-col">
                    <span className="col-label">Your Bridging Goals</span>
                    <ul>
                      <li>Book more live club dates</li>
                      <li>Find Northeast booking partners</li>
                      <li>Grow live Blues & Soul audience</li>
                    </ul>
                  </div>
                  <div className="align-col">
                    <span className="col-label">Sarah Offers</span>
                    <ul>
                      <li>Northeast venue roster & routing</li>
                      <li>Showcase curation and pitching</li>
                      <li>Intimate venue introductions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="drawer-action-row">
                <Link href="/bridging" className="btn-drawer-outline">
                  Update Bridging Signals <ArrowRight size={13} />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleConnect();
                    setShowMatchDrawer(false);
                  }}
                  className="btn-drawer-primary"
                >
                  {connectionStatus === 'Connected' ? 'Message Sarah' : 'Connect with Sarah'}
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* 2. MUTUAL CONNECTIONS MODAL */}
      {showMutualsModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowMutualsModal(false)}>
          <div className="dialog-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div>
                <span className="drawer-kicker">NETWORK DISCOVERY</span>
                <h2>{relationship.mutualConnections.length} Mutual Connections</h2>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setShowMutualsModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <p className="modal-intro-text">
              Members in your MLI network who know or regularly work with {profile.name}.
            </p>
            <div className="mutual-modal-list">
              {relationship.mutualConnections.map((person) => (
                <div key={person.id} className="mutual-modal-item">
                  <img src={person.photo} alt={person.name} className="item-avatar" />
                  <div className="item-details">
                    <h4>{person.name}</h4>
                    <p>
                      {person.role} · {person.location}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-mini-view"
                    onClick={() => {
                      setSelectedMemberId(person.id);
                      setShowMutualsModal(false);
                      setActiveTab('overview');
                    }}
                  >
                    View <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. MEDIA PREVIEW MODAL (Simulated video / deck viewer) */}
      {previewMedia && (
        <div className="modal-backdrop-overlay" onClick={() => setPreviewMedia(null)}>
          <div className="dialog-modal-card media-preview-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div>
                <span className="drawer-kicker">{previewMedia.type} Preview</span>
                <h2>{previewMedia.title}</h2>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setPreviewMedia(null)}
                aria-label="Close preview"
              >
                <X size={18} />
              </button>
            </div>

            <div className="simulated-media-viewport">
              <img src={previewMedia.thumbnail} alt={previewMedia.title} className="media-cover-bg" />
              <div className="media-player-controls">
                <button
                  type="button"
                  className="play-large-btn"
                  onClick={() => setNotice(`Playing ${previewMedia.title} (simulated stream).`)}
                >
                  <Play size={32} fill="currentColor" />
                </button>
                <span className="media-duration">{previewMedia.subtitle}</span>
              </div>
            </div>

            <div className="media-info-footer">
              <p className="media-desc-main">{previewMedia.description}</p>
              {previewMedia.details && <p className="media-meta-sub">{previewMedia.details}</p>}
            </div>
          </div>
        </div>
      )}

      {/* 4. REQUEST INTRODUCTION MODAL */}
      {showIntroModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowIntroModal(false)}>
          <div className="dialog-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div>
                <span className="drawer-kicker">WARM INTRODUCTION</span>
                <h2>Request Warm Intro to {profile.name}</h2>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setShowIntroModal(false)}
                aria-label="Close introduction modal"
              >
                <X size={18} />
              </button>
            </div>

            <p className="modal-intro-text">
              MLI helps facilitate warm professional introductions between members with verified mutual relevance.
            </p>

            <form
              className="intro-form"
              onSubmit={(e) => {
                e.preventDefault();
                setShowIntroModal(false);
                setNotice(`Warm introduction request sent to ${profile.name.split(' ')[0]}. MLI will notify you upon response.`);
              }}
            >
              <label>
                <span>Why would this connection help you?</span>
                <select className="intro-select" defaultValue="booking">
                  <option value="booking">Discussing live performance & showcase booking</option>
                  <option value="representation">Seeking artist representation for Northeast routing</option>
                  <option value="advice">Booking strategy consultation for upcoming release</option>
                </select>
              </label>

              <label>
                <span>Short introductory note (optional):</span>
                <textarea
                  className="intro-textarea"
                  rows={3}
                  placeholder={`Hi ${profile.name.split(' ')[0]}, I’m an independent Blues & Soul guitarist in New York looking for showcase opportunities...`}
                />
              </label>

              <div className="intro-actions">
                <button type="button" onClick={() => setShowIntroModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit-intro">
                  Send Introduction Request <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. DIRECT MESSAGE / GATE MODAL */}
      {showMessageModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowMessageModal(false)}>
          <div className="dialog-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div>
                <span className="drawer-kicker">DIRECT CONVERSATION</span>
                <h2>Message {profile.name}</h2>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setShowMessageModal(false)}
                aria-label="Close message modal"
              >
                <X size={18} />
              </button>
            </div>

            {connectionStatus !== 'Connected' ? (
              <div className="message-gate-box">
                <div className="gate-icon-circle">
                  <MessagesSquare size={24} />
                </div>
                <h3>Connect first to start messaging</h3>
                <p>
                  {profile.name.split(' ')[0]} receives messages from accepted connections and warm MLI
                  introductions to preserve thoughtful conversations.
                </p>
                <div className="gate-actions">
                  <button
                    type="button"
                    onClick={() => {
                      handleConnect();
                      setShowMessageModal(false);
                    }}
                    className="btn-primary-action"
                  >
                    Send Connection Request
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMessageModal(false);
                      setShowIntroModal(true);
                    }}
                    className="btn-secondary-action"
                  >
                    Request Warm Intro Instead
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="message-compose-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowMessageModal(false);
                  setNotice(`Message sent to ${profile.name.split(' ')[0]}. You can view the thread in Messages.`);
                }}
              >
                <textarea
                  className="intro-textarea"
                  rows={4}
                  placeholder={`Write your message to ${profile.name.split(' ')[0]}...`}
                  autoFocus
                />
                <div className="intro-actions">
                  <button type="button" onClick={() => setShowMessageModal(false)} className="btn-cancel">
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit-intro">
                    <Send size={14} /> Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 6. EDIT OWN PROFILE MODAL */}
      {showEditModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowEditModal(false)}>
          <div className="dialog-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div>
                <span className="drawer-kicker">PROFILE SETTINGS</span>
                <h2>Edit Your Profile</h2>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setShowEditModal(false)}
                aria-label="Close edit modal"
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="intro-form"
              onSubmit={(e) => {
                e.preventDefault();
                setShowEditModal(false);
                setNotice('Your profile updates have been saved.');
              }}
            >
              <label>
                <span>Professional Headline:</span>
                <input
                  type="text"
                  defaultValue={profile.headline}
                  className="intro-input"
                />
              </label>

              <label>
                <span>Bio:</span>
                <textarea
                  defaultValue={profile.bio}
                  rows={4}
                  className="intro-textarea"
                />
              </label>

              <label>
                <span>Current Availability Status:</span>
                <input
                  type="text"
                  defaultValue={profile.availability}
                  className="intro-input"
                />
              </label>

              <div className="intro-actions">
                <button type="button" onClick={() => setShowEditModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit-intro">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
