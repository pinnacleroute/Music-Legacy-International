'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, Bookmark, CalendarDays, Check, Clock3, MapPin, MessageCircle,
  Play, Radio, Search, Share2, SlidersHorizontal, Sparkles, Users, X,
} from 'lucide-react';
import { events, marketplace, members, opportunities, getCanonicalProfileImage } from './mockData';

type EventStatus = 'Upcoming' | 'Waitlist' | 'Sold Out' | 'On Demand' | 'Completed';
type EventItem = (typeof events)[number] & {
  typeLabel: string;
  image: string;
  imageAlt: string;
  status: EventStatus;
  matchLabel: string;
  matchScore?: number;
  matchReason: string;
  why: string[];
  social: string;
  people: typeof members;
  description: string;
  attendance: string;
  price: string;
  primaryCta: string;
  secondaryCta?: string;
  schedule: string[];
  relatedGroup: { name: string; href: string };
  relatedOpportunity?: { title: string; href: string; note: string };
  sponsor?: string;
  fastTrackGoal: string;
  recording?: string;
  sortDate: number;
};

const categoryTabs = ['All Events', 'Live Showcase', 'Networking', 'Workshop', 'Industry Panel', 'Virtual Meeting', 'Artist Performance'];
const eventById = Object.fromEntries(events.map(event => [event.id, event]));
const cbsOpportunity = opportunities.find(opp => opp.title === 'CBS Studio Artist Showcase');

const eventCatalog: EventItem[] = [
  {
    ...eventById['cbs-showcase'],
    typeLabel: 'Live Showcase',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Artist performing on a lit concert stage',
    status: 'Upcoming',
    matchLabel: '95% Match',
    matchScore: cbsOpportunity?.match ?? 95,
    matchReason: 'Strong fit for your live-performance goal and current booking needs.',
    why: ['New York', 'Live-performance goal', 'Blues & Soul', 'Booking opportunities'],
    social: 'Sarah Monroe and 2 people you follow are attending.',
    people: [members[0], members[1], members[2]],
    description: cbsOpportunity?.description ?? 'A curated evening connecting independent artists with booking professionals, venue partners, and music media.',
    attendance: '120 attending',
    price: 'Members free · guest tickets $25',
    primaryCta: 'Apply to Perform',
    secondaryCta: 'Attend Event',
    schedule: ['7:30 PM doors', '8:00 PM artist showcase', '9:20 PM industry introductions', '9:45 PM networking'],
    relatedGroup: { name: 'Live Events & Touring', href: '/community/live-events-touring' },
    relatedOpportunity: { title: '2 performer slots available', href: '/opportunities', note: 'Applications close May 18' },
    sponsor: 'Presented with The Lantern Room',
    fastTrackGoal: 'Book more live performances',
    sortDate: 24,
  },
  {
    ...eventById['artist-workshop'],
    typeLabel: 'Workshop',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Workshop attendees learning around a table',
    status: 'Upcoming',
    matchLabel: 'Recommended',
    matchScore: 84,
    matchReason: 'Relevant to your current music-business learning needs.',
    why: ['Independent artist goals', 'Release planning', 'Online access', 'Education milestone'],
    social: 'Marcus Lee is joining the mentor Q&A.',
    people: [members[1], members[3], members[0]],
    description: 'A practical workshop on release planning, artist development, and building a sustainable music career.',
    attendance: 'Only 34 spots left',
    price: 'Free',
    primaryCta: 'RSVP',
    schedule: ['7:00 PM welcome', '7:10 PM release planning session', '7:45 PM mentor Q&A'],
    relatedGroup: { name: 'Music Business Network', href: '/community/music-business-network' },
    relatedOpportunity: { title: 'Mentor applications open', href: '/opportunities', note: 'Good follow-up after attending' },
    fastTrackGoal: 'Build your music-business knowledge',
    sortDate: 14,
  },
  {
    ...eventById['networking-night'],
    typeLabel: 'Networking',
    image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'People meeting at a professional networking event',
    status: 'Upcoming',
    matchLabel: 'Strong Fit',
    matchScore: 89,
    matchReason: 'This networking session aligns with your booking and industry-connection goals.',
    why: ['New York', 'Booking relationships', 'Venue contacts', 'Professional network'],
    social: '3 people worth meeting will be there.',
    people: [members[0], members[2], members[1]],
    description: 'Meet artists, venue teams, and music professionals for focused conversations and new collaborations.',
    attendance: '68 attending',
    price: 'Members free',
    primaryCta: 'Reserve Spot',
    schedule: ['6:30 PM arrivals', '6:45 PM guided introductions', '7:30 PM open networking'],
    relatedGroup: { name: 'Live Events & Touring', href: '/community/live-events-touring' },
    relatedOpportunity: { title: 'Looking for event photographers', href: '/opportunities', note: 'Follow-up opportunity from the host' },
    fastTrackGoal: 'Attend 2 networking sessions',
    sortDate: 18,
  },
  {
    ...eventById['producer-session'],
    typeLabel: 'Virtual Meeting',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Producer working in a recording studio',
    status: 'Waitlist',
    matchLabel: 'Relevant to You',
    matchReason: 'Useful for your collaboration and production network.',
    why: ['Remote access', 'Producer network', 'Collaboration needs', 'Producers & Engineers group'],
    social: 'Marcus Lee is hosting.',
    people: [members[1], members[3], members[0]],
    description: 'A focused online room for producers and artists to exchange ideas, discuss tracks, and find collaborators.',
    attendance: 'Waitlist available',
    price: 'Members free',
    primaryCta: 'Join Waitlist',
    schedule: ['5:00 PM room opens', '5:10 PM listening prompts', '5:45 PM collaboration matching'],
    relatedGroup: { name: 'Producers & Engineers', href: '/community/producers-engineers' },
    relatedOpportunity: { title: 'Explore production collaborations', href: '/opportunities', note: 'Remote collaboration paths' },
    fastTrackGoal: 'Build a collaboration network',
    sortDate: 29,
  },
  {
    id: 'industry-panel',
    day: '21',
    month: 'MAY',
    date: 'May 21',
    time: '6:00 PM ET',
    title: 'Inside the Independent Music Business',
    category: 'Industry Panel',
    location: 'Online',
    organizer: 'MLI Industry Network',
    capacity: '75 members',
    access: 'All members',
    cta: 'Register',
    typeLabel: 'Industry Panel',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Panel speakers on stage in conversation',
    status: 'Upcoming',
    matchLabel: 'Recommended',
    matchReason: 'Relevant to representation, rights, and sustainable music business goals.',
    why: ['Music business learning', 'Rights education', 'Online access', 'Professional context'],
    social: 'MLI industry professionals are speaking.',
    people: [members[0], members[1], members[2]],
    description: 'A member panel on representation, rights, and sustainable music businesses.',
    attendance: '52 attending',
    price: 'Free',
    primaryCta: 'Register',
    schedule: ['6:00 PM panel begins', '6:40 PM member questions', '7:00 PM follow-up resources'],
    relatedGroup: { name: 'Music Business Network', href: '/community/music-business-network' },
    fastTrackGoal: 'Strengthen your professional confidence',
    sortDate: 21,
  },
  {
    id: 'artist-performance',
    day: '30',
    month: 'MAY',
    date: 'May 30',
    time: '8:00 PM ET',
    title: 'Soul at The Lantern Room',
    category: 'Artist Performance',
    location: 'Manhattan, NY',
    organizer: 'The Lantern Room',
    capacity: '100 guests',
    access: 'All members',
    cta: 'Get Tickets',
    typeLabel: 'Artist Performance',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Singer performing in a warm venue',
    status: 'Sold Out',
    matchLabel: 'Popular',
    matchReason: 'A strong live-music discovery night connected to the MLI venue network.',
    why: ['Live music discovery', 'Manhattan venue', 'Soul audience', 'Venue relationships'],
    social: 'Jessica Reed is hosting.',
    people: [members[2], members[3], members[0]],
    description: 'An evening of soul and blues performances from the Music Legacy community.',
    attendance: 'Waitlist available',
    price: '$25 · member discount available',
    primaryCta: 'Join Waitlist',
    schedule: ['8:00 PM doors', '8:30 PM first set', '9:30 PM headline set'],
    relatedGroup: { name: 'Fans & Audiophiles', href: '/community/fans-audiophiles' },
    relatedOpportunity: { title: 'Explore future performance opportunities', href: '/opportunities', note: 'New venue slots open monthly' },
    sponsor: 'Produced by The Lantern Room',
    fastTrackGoal: 'Understand live audience signals',
    sortDate: 30,
  },
  {
    id: 'past-workshop',
    day: '08',
    month: 'MAY',
    date: 'May 8',
    time: '7:00 PM ET',
    title: 'Build Your Artist Presence',
    category: 'Workshop',
    location: 'Online',
    organizer: 'MLI Education',
    capacity: 'Recorded session',
    access: 'All members',
    cta: 'Watch Recording',
    typeLabel: 'Workshop',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Creative team reviewing work on laptops',
    status: 'On Demand',
    matchLabel: 'On Demand',
    matchReason: 'Useful follow-up for building a stronger professional profile.',
    why: ['Profile strength', 'Artist positioning', 'On-demand access', 'FastTrack milestone'],
    social: '3 people you met are now recommended connections.',
    people: [members[0], members[1], members[3]],
    description: 'A recorded workshop on presenting your music, story, and professional identity.',
    attendance: 'Recording available',
    price: 'Free',
    primaryCta: 'Watch Recording',
    schedule: ['Recording', 'Highlights', 'Follow-up resources'],
    relatedGroup: { name: 'Independent Artists', href: '/community/independent-artists' },
    relatedOpportunity: { title: 'View follow-up opportunities', href: '/opportunities', note: 'Profile-ready artists get stronger matches' },
    fastTrackGoal: 'Build professional presence',
    recording: 'Showcase Sessions follow-up',
    sortDate: 8,
  },
];

const liveItems = [
  {
    state: 'LIVE NOW',
    title: 'Live from CBS Studio',
    artist: 'Amara Cole',
    genre: 'Soul / Blues',
    time: '238 watching',
    action: 'Watch Live',
    image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=1200&q=80',
  },
  {
    state: 'UP NEXT',
    title: 'Friday Artist Showcase',
    artist: 'Four emerging New York artists',
    genre: 'Soul · R&B · Blues',
    time: 'Friday · 8 PM ET',
    action: 'RSVP',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
  },
  {
    state: 'FEATURED ARTIST',
    title: 'Nia Brooks',
    artist: 'Artist spotlight',
    genre: 'Soul / Jazz',
    time: 'Performance + conversation',
    action: 'View Artist',
    image: 'https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?auto=format&fit=crop&w=800&q=80',
  },
  {
    state: 'ON DEMAND',
    title: 'Showcase Sessions Vol. 04',
    artist: 'MLI archive',
    genre: 'Live performance collection',
    time: 'Recorded',
    action: 'Watch Recording',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
  },
];

const filtersInitial = {
  type: 'All Events',
  location: 'All locations',
  format: 'Any format',
  date: 'Any date',
  access: 'Any access',
  ticketing: 'Any ticketing',
  tier: 'Any tier',
  state: 'Live / Upcoming / On Demand',
};

function categoryMatches(event: EventItem, category: string) {
  return category === 'All Events' || event.typeLabel === category;
}

function EventImage({ event, className = '' }: { event: EventItem; className?: string }) {
  return <img className={`event-photo ${className}`} src={event.image} alt={event.imageAlt} loading="lazy" />;
}

function AttendeeStack({ people }: { people: EventItem['people'] }) {
  return <div className="event-attendee-stack" aria-label={`${people.length} people in your network`}>
    {people.slice(0, 3).map(person => {
      const photo = (person as { photo?: string }).photo || getCanonicalProfileImage(person.id) || getCanonicalProfileImage(person.name);
      return photo ? (
        <span className="avatar has-image" key={person.id} title={person.name}>
          <img src={photo} alt={person.name} />
        </span>
      ) : (
        <span className={`avatar avatar-${person.tone}`} key={person.id}>{person.initials}</span>
      );
    })}
  </div>;
}

export default function EventsContent() {
  const [category, setCategory] = useState('All Events');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(filtersInitial);
  const [sort, setSort] = useState('Recommended');
  const [view, setView] = useState('For You');
  const [saved, setSaved] = useState<string[]>(['past-workshop']);
  const [states, setStates] = useState<Record<string, string>>({});
  const [reminders, setReminders] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<EventItem>(eventCatalog[0]);
  const [modal, setModal] = useState('');
  const [notice, setNotice] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [liveIndex, setLiveIndex] = useState(0);
  const [liveRsvp, setLiveRsvp] = useState(false);

  useEffect(() => {
    if (!modal && !filterOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function keydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setModal('');
        setFilterOpen(false);
      }
    }
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', keydown);
      previousFocus?.focus();
    };
  }, [modal, filterOpen]);

  const visible = useMemo(() => eventCatalog
    .filter(event => categoryMatches(event, category))
    .filter(event => `${event.title} ${event.typeLabel} ${event.location} ${event.organizer}`.toLowerCase().includes(query.toLowerCase()))
    .filter(event => filters.type === 'All Events' || categoryMatches(event, filters.type))
    .filter(event => filters.location === 'All locations' || (filters.location === 'Online' ? event.location === 'Online' : event.location !== 'Online'))
    .filter(event => filters.format === 'Any format' || (filters.format === 'Online' ? event.location === 'Online' : event.location !== 'Online'))
    .filter(event => filters.access === 'Any access' || event.access === filters.access)
    .filter(event => filters.ticketing === 'Any ticketing' || event.price.toLowerCase().includes(filters.ticketing.toLowerCase()))
    .filter(event => filters.tier === 'Any tier' || event.access.toLowerCase().includes(filters.tier.toLowerCase()))
    .filter(event => filters.state === 'Live / Upcoming / On Demand' || event.status === filters.state)
    .filter(event => filters.date === 'Any date' || (filters.date === 'This week' ? event.sortDate <= 21 : event.sortDate > 21))
    .filter(event => {
      if (view === 'For You') return event.status !== 'Completed';
      if (view === 'Saved') return saved.includes(event.id);
      if (view === 'RSVP’d') return states[event.id] === 'RSVP’d';
      if (view === 'Applied') return states[event.id] === 'Applied';
      if (view === 'Past') return ['On Demand', 'Completed'].includes(event.status);
      return true;
    })
    .sort((a, b) => sort === 'Recommended'
      ? (b.matchScore ?? 0) - (a.matchScore ?? 0)
      : sort === 'Upcoming Soonest'
        ? a.sortDate - b.sortDate
        : b.sortDate - a.sortDate), [category, filters, query, saved, sort, states, view]);

  const featured = eventCatalog.find(event => event.id === 'cbs-showcase')!;
  const comingUp = visible.filter(event => event.id !== featured.id && event.status === 'Upcoming').slice(0, 4);
  const moreEvents = visible.filter(event => ![featured.id, ...comingUp.map(item => item.id)].includes(event.id)).slice(0, 5);
  const onDemand = eventCatalog.filter(event => ['On Demand', 'Completed'].includes(event.status));
  const liveItem = liveItems[liveIndex];

  function open(kind: string, event = selected) {
    setSelected(event);
    setModal(kind);
    setSubmitted(false);
  }

  function saveEvent(id: string) {
    setSaved(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }

  function confirmEvent(event: EventItem, state: string) {
    setStates(current => ({ ...current, [event.id]: state }));
    if (['RSVP’d', 'Registered', 'Applied'].includes(state)) {
      setReminders(current => ({ ...current, [event.id]: '1 day before' }));
    }
    setSubmitted(true);
  }

  function handlePrimary(event: EventItem) {
    if (states[event.id]) return open('Your Event', event);
    if (event.status === 'On Demand' || event.status === 'Completed') return open('Media Player', event);
    if (event.status === 'Waitlist' || event.status === 'Sold Out') return open('Join Waitlist', event);
    return open(event.primaryCta, event);
  }

  function resetFilters() {
    setQuery('');
    setCategory('All Events');
    setFilters(filtersInitial);
    setView('For You');
  }

  return <div className="events-screen event-discovery">
    <header className="events-hero">
      <div>
        <p className="kicker">MLI Events</p>
        <h1>Discover showcases, workshops, networking sessions, performances, and conversations worth showing up for.</h1>
        <p>Recommendations are shaped by your goals, location, interests, membership, and activity.</p>
      </div>
      <div className="events-hero-actions">
        <Link href="#mli-live" className="primary-action"><Radio size={17} /> MLI Live</Link>
        <button className="subtle-host-action" onClick={() => open('Create Event', featured)}>Create Event +</button>
      </div>
    </header>

    <section className="event-toolbar" aria-label="Event discovery controls">
      <label className="event-search"><Search size={18} /><input aria-label="Search events" placeholder="Search events..." value={query} onChange={event => setQuery(event.target.value)} /></label>
      <label><span>Type</span><select value={category} onChange={event => setCategory(event.target.value)}>{categoryTabs.map(tab => <option key={tab}>{tab}</option>)}</select></label>
      <label><span>Location</span><select value={filters.location} onChange={event => setFilters(current => ({ ...current, location: event.target.value }))}><option>All locations</option><option>New York area</option><option>Online</option></select></label>
      <button onClick={() => setFilterOpen(true)}><SlidersHorizontal size={17} /> Filters</button>
      <label className="sort-control"><span>Sort</span><select value={sort} onChange={event => setSort(event.target.value)}><option>Recommended</option><option>Upcoming Soonest</option><option>Recently Added</option></select></label>
    </section>

    <div className="events-tabs tabs" aria-label="Event categories">{categoryTabs.map(tab => <button aria-pressed={category === tab} className={category === tab ? 'active' : ''} onClick={() => setCategory(tab)} key={tab}>{tab}</button>)}</div>

    <div className="event-view-row">
      <label>View: <select value={view} onChange={event => setView(event.target.value)}>{['For You', 'Saved', 'RSVP’d', 'Applied', 'Past'].map(option => <option key={option}>{option}</option>)}</select></label>
      <button onClick={() => open('Your Events', featured)}>Your Events <ArrowRight size={14} /></button>
    </div>

    {notice && <p className="events-notice" role="status">{notice}<button aria-label="Dismiss notice" onClick={() => setNotice('')}><X size={15} /></button></p>}

    <section className="featured-event" aria-labelledby="featured-event-title">
      <EventImage event={featured} />
      <div className="featured-event-copy">
        <p className="mini-label">Featured for you</p>
        <div className="event-chip-row"><span>{featured.typeLabel}</span><span>Pro Members</span></div>
        <h2 id="featured-event-title">{featured.title}</h2>
        <p>{featured.date} · {featured.location}</p>
        <p className="featured-organizer">Hosted by {featured.organizer}</p>
        <blockquote>{featured.matchReason}</blockquote>
        <div className="featured-metrics"><b>{featured.matchLabel}</b><span>Applications close May 18</span><span>2 performer slots remaining</span></div>
        <div className="featured-social"><AttendeeStack people={featured.people} /><span>{featured.social}</span></div>
        <div className="featured-actions">
          <button className="primary-action" onClick={() => handlePrimary(featured)}>{featured.primaryCta} <ArrowRight size={15} /></button>
          <button onClick={() => open('Why This Event?', featured)}>Why this event?</button>
          <button aria-pressed={saved.includes(featured.id)} onClick={() => saveEvent(featured.id)}><Bookmark size={15} fill={saved.includes(featured.id) ? 'currentColor' : 'none'} /> {saved.includes(featured.id) ? 'Saved' : 'Save'}</button>
        </div>
      </div>
    </section>

    <section className="events-section">
      <div className="section-heading-inline"><div><p className="kicker">This week</p><h2>Coming Up</h2></div><p>Events with the strongest timing, network, and goal fit.</p></div>
      <div className="coming-events">{comingUp.map(event => <CompactEventCard event={event} key={event.id} saved={saved.includes(event.id)} state={states[event.id]} reminder={reminders[event.id]} onOpen={open} onSave={saveEvent} onAction={handlePrimary} />)}</div>
    </section>

    <section className="events-section">
      <div className="section-heading-inline"><div><p className="kicker">More to explore</p><h2>Rooms, stages, and conversations</h2></div></div>
      {moreEvents.length ? <div className="event-list">{moreEvents.map(event => <EventListRow event={event} state={states[event.id]} saved={saved.includes(event.id)} onOpen={open} onSave={saveEvent} onAction={handlePrimary} key={event.id} />)}</div> : <div className="events-empty"><CalendarDays /><h2>No events in this view.</h2><p>Try a different category or clear your filters.</p><button onClick={resetFilters}>Clear filters</button></div>}
    </section>

    <section className="mli-live-media" id="mli-live">
      <div className="section-heading-inline"><div><p className="kicker">MLI Live</p><h2>Live music, interviews, and showcase sessions.</h2></div><Link href="/events">Browse MLI Live <ArrowRight size={14} /></Link></div>
      <div className="live-media-grid">
        <button className="live-now-feature" onClick={() => { setLiveIndex(0); setModal('Live Player'); }} style={{ backgroundImage: `linear-gradient(90deg,rgba(4,12,26,.9),rgba(4,12,26,.22)),url(${liveItems[0].image})` }}>
          <span><i /> LIVE NOW</span>
          <h3>{liveItems[0].title}</h3>
          <p>{liveItems[0].artist} · {liveItems[0].genre}</p>
          <small>{liveItems[0].time}</small>
          <b><Play size={16} /> Watch Live</b>
        </button>
        <div className="live-thumbs">{liveItems.slice(1).map((item, index) => <button key={item.title} onClick={() => { setLiveIndex(index + 1); setModal('Live Player'); }}>
          <img src={item.image} alt="" loading="lazy" />
          <span><Play size={15} /></span>
          <p><small>{item.state}</small><b>{item.title}</b><em>{item.time}</em></p>
        </button>)}</div>
      </div>
    </section>

    <section className="events-section on-demand-events">
      <div className="section-heading-inline"><div><p className="kicker">On demand / past</p><h2>Useful after the room closes.</h2></div></div>
      <div className="event-list">{onDemand.map(event => <EventListRow event={event} state={states[event.id]} saved={saved.includes(event.id)} onOpen={open} onSave={saveEvent} onAction={handlePrimary} key={event.id} />)}</div>
    </section>

    {filterOpen && <FilterDrawer filters={filters} setFilters={setFilters} visibleCount={visible.length} onClose={() => setFilterOpen(false)} onClear={resetFilters} />}
    {modal && <EventModal
      modal={modal}
      event={selected}
      state={states[selected.id]}
      submitted={submitted}
      reminder={reminders[selected.id]}
      liveItem={liveItem}
      liveIndex={liveIndex}
      liveRsvp={liveRsvp}
      saved={saved.includes(selected.id)}
      onClose={() => setModal('')}
      onOpen={open}
      onSave={saveEvent}
      onPrimary={handlePrimary}
      onConfirm={confirmEvent}
      onReminder={value => setReminders(current => ({ ...current, [selected.id]: value }))}
      onNotice={setNotice}
      onLiveRsvp={() => setLiveRsvp(true)}
      setSubmitted={setSubmitted}
    />}
  </div>;
}

function CompactEventCard({ event, saved, state, reminder, onOpen, onSave, onAction }: {
  event: EventItem;
  saved: boolean;
  state?: string;
  reminder?: string;
  onOpen: (kind: string, event: EventItem) => void;
  onSave: (id: string) => void;
  onAction: (event: EventItem) => void;
}) {
  return <article className="compact-event-card">
    <EventImage event={event} />
    <div className="event-card-labels"><span>{event.typeLabel}</span><span>{state ?? event.status}</span></div>
    <button className="event-title" onClick={() => onOpen('Event Details', event)}><h3>{event.title}</h3></button>
    <p><Clock3 size={14} /> {event.date} · {event.time}</p>
    <p><MapPin size={14} /> {event.location}</p>
    <p className="human-reason">{event.matchReason}</p>
    <div className="event-social-line"><AttendeeStack people={event.people} /><span>{event.social}</span></div>
    {reminder && <small className="event-reminder"><Check size={13} /> Reminder set · {reminder}</small>}
    <footer>
      <button className="primary-action" onClick={() => onAction(event)}>{state ?? event.primaryCta} <ArrowRight size={14} /></button>
      <button onClick={() => onOpen('Why This Event?', event)}>Why?</button>
      <button aria-label={`${saved ? 'Unsave' : 'Save'} ${event.title}`} aria-pressed={saved} onClick={() => onSave(event.id)}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /></button>
    </footer>
  </article>;
}

function EventListRow({ event, state, saved, onOpen, onSave, onAction }: {
  event: EventItem;
  state?: string;
  saved: boolean;
  onOpen: (kind: string, event: EventItem) => void;
  onSave: (id: string) => void;
  onAction: (event: EventItem) => void;
}) {
  return <article className="event-list-row">
    <EventImage event={event} />
    <time><b>{event.day}</b><span>{event.month}</span></time>
    <div>
      <span>{event.typeLabel} · {state ?? event.status}</span>
      <button onClick={() => onOpen('Event Details', event)}>{event.title}</button>
      <p>{event.date} · {event.location} · {event.matchReason}</p>
      <small>{event.social}</small>
    </div>
    <button className="event-row-save" aria-label={`${saved ? 'Unsave' : 'Save'} ${event.title}`} aria-pressed={saved} onClick={() => onSave(event.id)}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /></button>
    <button className="primary-action" onClick={() => onAction(event)}>{state ?? event.primaryCta}</button>
  </article>;
}

function FilterDrawer({ filters, setFilters, visibleCount, onClose, onClear }: {
  filters: typeof filtersInitial;
  setFilters: React.Dispatch<React.SetStateAction<typeof filtersInitial>>;
  visibleCount: number;
  onClose: () => void;
  onClear: () => void;
}) {
  const fields: [keyof typeof filtersInitial, string, string[]][] = [
    ['type', 'Event Type', categoryTabs],
    ['location', 'Location', ['All locations', 'New York area', 'Online']],
    ['format', 'Online / In Person', ['Any format', 'Online', 'In Person']],
    ['access', 'Access Level', ['Any access', 'All members', 'Pro Silver', 'VIP / Alliance']],
    ['ticketing', 'Free / Ticketed', ['Any ticketing', 'Free', '$25']],
    ['tier', 'Member Tier', ['Any tier', 'Fan / Audiophile', 'Pro Silver', 'Pro Gold', 'Pro Platinum', 'VIP / Alliance']],
    ['state', 'Live / Upcoming / On Demand', ['Live / Upcoming / On Demand', 'Upcoming', 'Waitlist', 'On Demand']],
  ];
  return <div className="modal-backdrop" onClick={onClose}>
    <section className="detail-modal events-filter-modal event-bottom-sheet" role="dialog" aria-modal="true" aria-label="Advanced event filters" onClick={event => event.stopPropagation()}>
      <button autoFocus className="modal-close" aria-label="Close filters" onClick={onClose}><X /></button>
      <p className="kicker">Advanced Filters</p>
      <h2>Refine event discovery</h2>
      <div>{fields.map(([key, label, options]) => <label key={key}><span>{label}</span><select value={filters[key]} onChange={event => setFilters(current => ({ ...current, [key]: event.target.value }))}>{options.map(option => <option key={option}>{option}</option>)}</select></label>)}</div>
      <div className="filter-modal-actions"><button onClick={onClear}>Clear Filters</button><button className="primary-action" onClick={onClose}>Apply Filters · {visibleCount}</button></div>
    </section>
  </div>;
}

function EventModal(props: {
  modal: string;
  event: EventItem;
  state?: string;
  submitted: boolean;
  reminder?: string;
  liveItem: typeof liveItems[number];
  liveIndex: number;
  liveRsvp: boolean;
  saved: boolean;
  onClose: () => void;
  onOpen: (kind: string, event?: EventItem) => void;
  onSave: (id: string) => void;
  onPrimary: (event: EventItem) => void;
  onConfirm: (event: EventItem, state: string) => void;
  onReminder: (value: string) => void;
  onNotice: (value: string) => void;
  onLiveRsvp: () => void;
  setSubmitted: (value: boolean) => void;
}) {
  const { modal, event, state, submitted, reminder, liveItem, liveIndex, liveRsvp, saved, onClose, onOpen, onSave, onPrimary, onConfirm, onReminder, onNotice, onLiveRsvp, setSubmitted } = props;
  const isDetail = modal === 'Event Details';
  return <div className="modal-backdrop" onClick={onClose}>
    <section className={`detail-modal events-modal ${isDetail ? 'event-full-detail' : ''}`} role="dialog" aria-modal="true" aria-label={modal} onClick={event => event.stopPropagation()}>
      <button autoFocus className="modal-close" aria-label="Close dialog" onClick={onClose}><X /></button>
      {modal === 'Event Details' && <EventDetail event={event} state={state} saved={saved} onSave={onSave} onOpen={onOpen} onPrimary={onPrimary} />}
      {modal === 'Why This Event?' && <><p className="kicker">Why it fits</p><h2>{event.title}</h2><p>{event.matchReason}</p><div className="why-fit-list">{event.why.map(item => <span key={item}><Check size={15} /> {item}</span>)}</div><p className="event-fasttrack"><Sparkles size={14} /> FastTrack relevance: {event.fastTrackGoal}.</p></>}
      {modal === 'Your Events' && <><p className="kicker">Your Events</p><h2>Your event path</h2><div className="your-events-panel">{['RSVP’d', 'Registered', 'Applied', 'Saved', 'Past'].map(item => <button key={item}>{item}<ArrowRight size={14} /></button>)}</div><p className="event-demo-note">This is a lightweight prototype view. Event states are simulated locally.</p></>}
      {modal === 'Live Player' && <><p className="kicker">{liveItem.state}</p><h2>{liveItem.title}</h2><div className="media-player-preview" style={{ backgroundImage: `linear-gradient(rgba(5,13,30,.25),rgba(5,13,30,.86)),url(${liveItem.image})` }}><Play size={42} /><strong>{liveItem.artist}</strong><span>{liveItem.genre}</span><small>{liveItem.time}</small></div>{liveIndex === 1 ? <button className="primary-action" onClick={onLiveRsvp}>{liveRsvp ? 'RSVP’d · Reminder set' : 'RSVP'}</button> : <p className="event-demo-note">Streaming preview only. No live backend is connected.</p>}</>}
      {modal === 'Media Player' && <><p className="kicker">On Demand</p><h2>{event.title}</h2><div className="media-player-preview" style={{ backgroundImage: `linear-gradient(rgba(5,13,30,.25),rgba(5,13,30,.86)),url(${event.image})` }}><Play size={42} /><strong>Watch Recording</strong><span>{event.recording ?? event.organizer}</span></div><div className="post-event-links"><Link href="/profile/sarah-monroe">View related members <ArrowRight size={14} /></Link><Link href="/opportunities">View follow-up opportunities <ArrowRight size={14} /></Link></div></>}
      {modal === 'Share Event' && <><p className="kicker">Share</p><h2>{event.title}</h2><div className="event-share-options"><Link href={`/messages?provider=Sarah%20Monroe&event=${encodeURIComponent(event.title)}`}><MessageCircle size={16} /> Send in Message</Link><Link href={event.relatedGroup.href}><Users size={16} /> Share to Community</Link><button onClick={() => { onNotice(`Link copied for ${event.title} (demo).`); onClose(); }}><Share2 size={16} /> Copy Link</button></div></>}
      {modal === 'Add to Calendar' && <><p className="kicker">Calendar</p><h2>{event.title}</h2><div className="event-calendar-options">{['Google', 'Apple', 'Outlook'].map(calendar => <button key={calendar} onClick={() => { onNotice(`${calendar} calendar preview created for ${event.title}. No calendar was changed.`); onClose(); }}><CalendarDays size={18} /> {calendar}<ArrowRight size={14} /></button>)}</div></>}
      {modal === 'Your Event' && <><p className="kicker">Event State</p><h2>{state}</h2><p>{event.title}<br />{event.date} · {event.time} · {event.location}</p>{reminder && <label className="event-reminder-select">Reminder<select value={reminder} onChange={change => onReminder(change.target.value)}><option>1 day before</option><option>1 hour before</option></select></label>}<button className="events-text-button" onClick={() => onOpen('Add to Calendar', event)}>Add to Calendar</button><button className="events-text-button" onClick={() => onOpen('People You May Meet', event)}>People You May Meet</button></>}
      {modal === 'People You May Meet' && <><p className="kicker">People you may want to meet</p><h2>{event.title}</h2>{event.people.map(person => {
        const photo = (person as { photo?: string }).photo || getCanonicalProfileImage(person.id) || getCanonicalProfileImage(person.name);
        return (
          <div className="event-member" key={person.id}>
            {photo ? (
              <span className="avatar has-image" title={person.name}>
                <img src={photo} alt={person.name} />
              </span>
            ) : (
              <span className={`avatar avatar-${person.tone}`}>{person.initials}</span>
            )}
            <div><Link href={`/profile/${person.id}`}>{person.name}</Link><small>{person.role} · {person.reason}</small></div>
          </div>
        );
      })}</>}
      {modal === 'Create Event' && <CreateEventForm submitted={submitted} setSubmitted={setSubmitted} />}
      {['Apply to Perform', 'Attend Event', 'RSVP', 'Reserve Spot', 'Register', 'Join / RSVP', 'Get Tickets', 'Join Waitlist'].includes(modal) && <EventActionForm modal={modal} event={event} submitted={submitted} onConfirm={onConfirm} />}
    </section>
  </div>;
}

function EventDetail({ event, state, saved, onSave, onOpen, onPrimary }: {
  event: EventItem;
  state?: string;
  saved: boolean;
  onSave: (id: string) => void;
  onOpen: (kind: string, event?: EventItem) => void;
  onPrimary: (event: EventItem) => void;
}) {
  return <>
    <div className="event-detail-hero-media"><EventImage event={event} /><div><span>{event.typeLabel}</span><h2>{event.title}</h2><p>{event.description}</p></div></div>
    <div className="event-detail-facts"><p><b>Date / time</b>{event.date} · {event.time}</p><p><b>Location</b>{event.location}</p><p><b>Organizer</b>{event.organizer} · MLI Verified</p><p><b>Access</b>{event.access}</p><p><b>Ticketing</b>{event.price}</p><p><b>Capacity</b>{event.attendance}</p></div>
    <div className="event-detail-columns"><section><h3>Schedule</h3>{event.schedule.map(item => <p key={item}>{item}</p>)}</section><section><h3>People attending</h3><p>{event.social}</p><AttendeeStack people={event.people} /><button onClick={() => onOpen('People You May Meet', event)}>People You May Meet <ArrowRight size={14} /></button></section></div>
    <div className="event-detail-columns"><section><h3>Related opportunity</h3><p>{event.relatedOpportunity?.title ?? 'Follow-up opportunities will appear here.'}</p><small>{event.relatedOpportunity?.note}</small>{event.relatedOpportunity && <Link href={event.relatedOpportunity.href}>View Opportunity <ArrowRight size={14} /></Link>}</section><section><h3>Related group</h3><p>{event.relatedGroup.name}</p><Link href={event.relatedGroup.href}>View Group <ArrowRight size={14} /></Link></section></div>
    <section className="event-prep-panel"><h3>Preparing for this event?</h3>{marketplace.slice(0, 4).map(service => <Link href="/marketplace?recommended=1" key={service.id}>{service.subtype}<ArrowRight size={13} /></Link>)}</section>
    <p className="event-fasttrack"><Sparkles size={14} /> This supports your FastTrack goal: {event.fastTrackGoal}.</p>
    {event.sponsor && <p className="event-sponsor">{event.sponsor}<small>Sponsor placement is contextual and secondary.</small></p>}
    <div className="event-detail-cta"><button className="primary-action" onClick={() => onPrimary(event)}>{state ?? event.primaryCta}<ArrowRight size={15} /></button>{event.secondaryCta && <button onClick={() => onOpen(event.secondaryCta!, event)}>{event.secondaryCta}</button>}<button onClick={() => onOpen('Add to Calendar', event)}>Add to Calendar</button><button onClick={() => onOpen('Share Event', event)}><Share2 size={15} /> Share</button><button aria-pressed={saved} onClick={() => onSave(event.id)}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}</button></div>
  </>;
}

function EventActionForm({ modal, event, submitted, onConfirm }: {
  modal: string;
  event: EventItem;
  submitted: boolean;
  onConfirm: (event: EventItem, state: string) => void;
}) {
  const isApplication = modal === 'Apply to Perform';
  const state = isApplication ? 'Applied' : modal === 'Register' ? 'Registered' : modal === 'Join Waitlist' ? 'Waitlist' : 'RSVP’d';
  if (submitted) return <><p className="kicker">Confirmed</p><h2>{state}</h2><p>Reminder set · 1 day before. This is simulated; no backend submission or payment was made.</p></>;
  return <>
    <p className="kicker">{modal}</p>
    <h2>{event.title}</h2>
    <p>{event.date} · {event.time}<br />{event.location} · {event.price}</p>
    {isApplication && <p><b>2 performer slots remaining.</b> This application is separate from attending the event.</p>}
    <form className="events-form" onSubmit={formEvent => { formEvent.preventDefault(); onConfirm(event, state); }}>
      <label>Profile<input required defaultValue="Alex Carter · Artist / Musician" /></label>
      <label>{isApplication ? 'Performance link' : 'Guest name'}<input required placeholder={isApplication ? 'https://...' : 'Alex Carter'} /></label>
      <label className="wide">Note<textarea rows={3} defaultValue={isApplication ? 'I would like to be considered for a performer slot.' : 'Looking forward to attending.'} /></label>
      <button className="primary-action" type="submit">{isApplication ? 'Submit application' : 'Confirm'} <ArrowRight size={15} /></button>
    </form>
  </>;
}

function CreateEventForm({ submitted, setSubmitted }: { submitted: boolean; setSubmitted: (value: boolean) => void }) {
  if (submitted) return <><p className="kicker">Submitted</p><h2>Submitted for MLI review</h2><p>Your event creation request was saved in this prototype only. No event was published.</p></>;
  return <>
    <p className="kicker">Eligible host flow</p>
    <h2>Create Event</h2>
    <p>Available to MLI Admins, Pro Gold business / venue accounts, and approved MLI partners.</p>
    <form className="events-form" onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>
      {['Title', 'Date', 'Time', 'Location / Online', 'Capacity', 'Access', 'Ticketing', 'Performer Applications', 'Related Group', 'Sponsor', 'Cover Image'].map(label => <label key={label}>{label}<input required={['Title', 'Date', 'Time', 'Location / Online'].includes(label)} placeholder={label} /></label>)}
      <label className="wide">Event Type<select>{categoryTabs.slice(1).map(type => <option key={type}>{type}</option>)}</select></label>
      <label className="wide">Description<textarea rows={3} required /></label>
      <button className="primary-action" type="submit">Submit for MLI review <ArrowRight size={15} /></button>
    </form>
  </>;
}
