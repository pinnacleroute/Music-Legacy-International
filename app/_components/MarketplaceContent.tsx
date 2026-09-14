'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight, Bookmark, BriefcaseBusiness, Camera, Check,
  MapPin, MessageCircle, Mic2, MoreHorizontal, Package, Search, Share2, ShieldCheck,
  SlidersHorizontal, Sparkles, Star, Store, Users, X,
} from 'lucide-react';
import { marketplace, members } from './mockData';

const rawCategories = ['Services', 'Businesses', 'Vendors', 'Artist Services', 'Products', 'Affiliates'];
const primaryCategories = ['Services', 'Venues & Businesses', 'Creative Professionals', 'Products'];
const trustDescriptions: Record<string, string> = {
  'MLI Verified': 'Identity and business details reviewed by Music Legacy.',
  'MLI Trusted': 'Established provider with strong member feedback.',
  'MLI Partner': 'Preferred partner for MLI events and member opportunities.',
};

const imagery = [
  {
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=700&q=80',
    ],
    alt: 'Recording studio with mixing console and microphones',
  },
  {
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80',
    ],
    alt: 'Creative campaign planning session',
  },
  {
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80',
    ],
    alt: 'Photographer holding a camera during a shoot',
  },
  {
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=700&q=80',
    ],
    alt: 'Videographer filming a performance setup',
  },
  {
    image: 'https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=700&q=80',
    ],
    alt: 'Live production and tour equipment backstage',
  },
  {
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1506629905607-d9fb7c0b3a6f?auto=format&fit=crop&w=700&q=80',
    ],
    alt: 'Merchandise apparel displayed on racks',
  },
  {
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80',
    ],
    alt: 'Small live music venue with stage lights',
  },
];

const extras = [
  {
    price: 75,
    pricing: 'From $75/hr',
    availability: 'Next opening: Thursday',
    mode: 'In-person',
    reviews: 18,
    score: 92,
    fit: '92% Fit',
    reason: 'You’re preparing for more live opportunities, and this studio specializes in independent artists in your area.',
    description: 'Recording rooms, vocal tracking, and production support for independent artists preparing release-ready material.',
    focus: 'Recording',
    primary: 'View Studio',
    secondary: 'Check Availability',
    distance: 8,
    profile: '/profile/marcus-lee',
    connected: true,
    services: ['Vocal tracking', 'Mix prep', 'Production support', 'Session musicians'],
    review: 'Marcus made the recording process incredibly easy and understood exactly what we were trying to capture.',
    reviewer: 'Sarah Monroe · Booking Agent',
    community: 'Producers & Engineers',
    fastTrack: 'Build Professional Presence',
  },
  {
    price: 350,
    pricing: 'Packages from $350',
    availability: 'Accepting June projects',
    mode: 'Remote',
    reviews: 24,
    score: 88,
    fit: 'Recommended',
    reason: 'Promotion is one of your current challenges, and this service focuses on release strategy and local press.',
    description: 'Release planning, local press, and audience development for artists getting ready for a new chapter.',
    focus: 'Marketing',
    primary: 'View Service',
    secondary: 'Request Info',
    distance: 999,
    profile: '',
    connected: false,
    services: ['Campaign strategy', 'Local press', 'Audience development', 'Release calendar'],
    review: 'They helped turn a loose release plan into a real campaign with clear next steps.',
    reviewer: 'Nia Brooks · Singer / Songwriter',
    community: 'Promotion & Marketing',
    fastTrack: 'Strengthen your professional presence',
  },
  {
    price: 250,
    pricing: 'Packages from $250',
    availability: 'Limited May availability',
    mode: 'In-person',
    reviews: 21,
    score: 84,
    fit: 'Strong Fit',
    reason: 'Useful for your upcoming showcase because current performance visuals can strengthen booking conversations.',
    description: 'Live photography and artist portraits for press kits, tour campaigns, and showcase applications.',
    focus: 'Photography',
    primary: 'View Portfolio',
    secondary: 'Contact',
    distance: 5,
    profile: '',
    connected: false,
    services: ['Live show coverage', 'Artist portraits', 'Press kit selects', 'Tour documentation'],
    review: 'The live photos felt polished without losing the energy of the room.',
    reviewer: 'Jessica Reed · Venue Manager',
    community: 'Live Events & Touring',
    fastTrack: 'Book more live performances',
  },
  {
    price: 450,
    pricing: 'Sessions from $450',
    availability: 'Available this week',
    mode: 'In-person',
    reviews: 12,
    score: 76,
    fit: 'Relevant',
    reason: 'Performance video can help you show readiness before applying to showcases or venue opportunities.',
    description: 'Performance videos and short-form sessions for music releases, showcases, and social proof.',
    focus: 'Video',
    primary: 'View Portfolio',
    secondary: 'Contact',
    distance: 12,
    profile: '',
    connected: false,
    services: ['Performance reels', 'Session videos', 'Short-form edits', 'Showcase clips'],
    review: 'Fast turnaround and the edits gave us exactly what we needed for booking outreach.',
    reviewer: 'Marcus Lee · Producer',
    community: 'Independent Artists',
    fastTrack: 'Build Professional Presence',
  },
  {
    price: null,
    pricing: 'Request a quote',
    availability: 'Available for June tours',
    mode: 'In-person',
    reviews: 16,
    score: 86,
    fit: 'Recommended',
    reason: 'Relevant to your tour planning and live-performance goals across the Northeast.',
    description: 'Regional tour logistics and live-show support across the Northeast for emerging artists.',
    focus: 'Tour Support',
    primary: 'Request Quote',
    secondary: 'Request Info',
    distance: 60,
    profile: '',
    connected: false,
    services: ['Routing support', 'Advance coordination', 'Production support', 'Crew referrals'],
    review: 'They helped us understand what a realistic first regional run would require.',
    reviewer: 'Sarah Monroe · Booking Agent',
    community: 'Live Events & Touring',
    fastTrack: 'Expand your live-industry network',
  },
  {
    price: 25,
    pricing: 'From $25/item',
    availability: 'Ships nationwide',
    mode: 'Shipping',
    reviews: 30,
    score: 0,
    fit: 'Product',
    reason: 'A practical merch option once your next show or release campaign is ready.',
    description: 'Small-batch artist merchandise with nationwide shipping and flexible minimums.',
    focus: 'Merchandise',
    primary: 'View Products',
    secondary: 'Request Info',
    distance: 999,
    profile: '',
    connected: false,
    services: ['Apparel', 'Tour merchandise', 'Small-batch orders', 'Nationwide shipping'],
    review: 'The small-batch minimum made it easier to test merch without overcommitting.',
    reviewer: 'Nia Brooks · Singer / Songwriter',
    community: 'Fans & Audiophiles',
    fastTrack: 'Grow a regional audience',
  },
  {
    price: 500,
    pricing: 'From $500/event',
    availability: 'Booking holds open this week',
    mode: 'In-person',
    reviews: 27,
    score: 90,
    fit: 'Featured by MLI',
    reason: 'Relevant to your live-performance goal and New York location.',
    description: 'An intimate live-music venue and MLI partner for showcases, artist events, and filmed performances.',
    focus: 'Venue Services',
    primary: 'View Venue',
    secondary: 'Request Booking',
    distance: 4,
    profile: '/profile/jessica-reed',
    connected: true,
    services: ['Showcase room', 'Stage support', 'Event booking', 'Audience environment'],
    review: 'The Lantern Room understands independent artists and creates a real listening-room feel.',
    reviewer: 'Marcus Lee · Producer',
    community: 'Venues & Booking',
    fastTrack: 'Book more live performances',
  },
];

const listings = marketplace.map((item, index) => {
  const [trustRaw, ratingRaw] = item.rating.split(' · ');
  const trust = trustRaw === 'Verified' ? 'MLI Verified' : trustRaw;
  return {
    ...item,
    ...extras[index],
    ...imagery[index],
    trust,
    stars: Number(ratingRaw),
    network: [members[index % members.length], members[(index + 1) % members.length], members[(index + 2) % members.length]],
  };
});

type Listing = typeof listings[number];
const defaultFilters = {
  category: 'All categories',
  location: 'All locations',
  mode: 'Any format',
  tier: 'All tiers',
  rating: 'Any rating',
  price: 'Any price',
  availability: 'Any availability',
  verified: 'Any trust',
  serviceType: 'Any service type',
};

function MarketplaceImage({ listing, className = '' }: { listing: Listing; className?: string }) {
  return <img className={`market-photo ${className}`} src={listing.image} alt={listing.alt} loading="lazy" />;
}

function AvatarStack({ people }: { people: Listing['network'] }) {
  return <span className="market-avatar-stack">{people.slice(0, 3).map(person => <span className={`avatar avatar-${person.tone}`} key={person.id}>{person.initials}</span>)}</span>;
}

export default function MarketplaceContent() {
  return <Suspense><MarketplaceQuery /></Suspense>;
}

function MarketplaceQuery() {
  const params = useSearchParams();
  return <MarketplaceView key={params.toString()} initialRecommended={params.get('recommended') === '1'} initialFocus={params.get('focus') || ''} />;
}

function MarketplaceView({ initialRecommended, initialFocus }: { initialRecommended: boolean; initialFocus: string }) {
  const [category, setCategory] = useState('Services');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState('Recommended');
  const [recommended, setRecommended] = useState(initialRecommended);
  const [focus, setFocus] = useState(initialFocus);
  const [saved, setSaved] = useState<number[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [compare, setCompare] = useState<number[]>([]);
  const [menu, setMenu] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [modal, setModal] = useState('');
  const [selected, setSelected] = useState<Listing>(listings[0]);
  const [notice, setNotice] = useState('');
  const [requested, setRequested] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [contactIntent, setContactIntent] = useState('Request Info');

  function open(kind: string, item = selected) {
    setSelected(item);
    setModal(kind);
    setMenu(null);
    setSubmitted(false);
  }

  function clear() {
    setFilters(defaultFilters);
    setFocus('');
    setRecommended(false);
    setSavedOnly(false);
    setQuery('');
    setCategory('Services');
  }

  function toggleSaved(id: number) {
    setSaved(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }

  function toggleCompare(id: number) {
    setCompare(current => {
      if (current.includes(id)) return current.filter(item => item !== id);
      if (current.length >= 3) {
        setNotice('Compare up to 3 listings. Remove one to add another.');
        return current;
      }
      return [...current, id];
    });
    setMenu(null);
  }

  const visible = useMemo(() => listings
    .filter(item => {
      if (category === 'Services') return ['Services', 'Artist Services'].includes(item.category);
      if (category === 'Venues & Businesses') return ['Businesses', 'Affiliates'].includes(item.category);
      if (category === 'Creative Professionals') return ['Vendors', 'Artist Services'].includes(item.category);
      if (category === 'Products') return item.category === 'Products';
      return true;
    })
    .filter(item => !recommended || item.score > 0)
    .filter(item => !savedOnly || saved.includes(item.id))
    .filter(item => !focus || item.focus === focus)
    .filter(item => `${item.title} ${item.provider} ${item.subtype} ${item.location} ${item.description}`.toLowerCase().includes(query.toLowerCase()))
    .filter(item => filters.category === 'All categories' || item.category === filters.category)
    .filter(item => filters.location === 'All locations' || (filters.location === 'New York area' ? /NY|Brooklyn|Manhattan/.test(item.location) : item.location === filters.location))
    .filter(item => filters.mode === 'Any format' || item.mode === filters.mode)
    .filter(item => filters.tier === 'All tiers' || item.tier === filters.tier)
    .filter(item => filters.rating === 'Any rating' || item.stars >= parseFloat(filters.rating))
    .filter(item => filters.price === 'Any price' || (filters.price === 'Request a Quote' ? item.price === null : item.price !== null && (filters.price === 'Under $100' ? item.price < 100 : filters.price === '$100-$400' ? item.price >= 100 && item.price <= 400 : item.price > 400)))
    .filter(item => filters.availability === 'Any availability' || item.availability.includes(filters.availability))
    .filter(item => filters.verified === 'Any trust' || item.trust === filters.verified)
    .filter(item => filters.serviceType === 'Any service type' || item.focus === filters.serviceType)
    .sort((a, b) => sort === 'Highest Rated' ? b.stars - a.stars : sort === 'Nearest' ? a.distance - b.distance : sort === 'Price: Low to High' ? (a.price ?? 9999) - (b.price ?? 9999) : sort === 'Price: High to Low' ? (b.price ?? 0) - (a.price ?? 0) : b.score - a.score), [category, filters, focus, query, recommended, saved, savedOnly, sort]);

  const featured = listings[0];
  const recommendedListings = visible.filter(item => item.id !== featured.id && item.score > 0).slice(0, 4);
  const exploreListings = visible.filter(item => ![featured.id, ...recommendedListings.map(x => x.id)].includes(item.id)).slice(0, 6);

  return <div className="marketplace-screen marketplace-discovery">
    <header className="market-hero">
      <div><p className="kicker">Trusted MLI ecosystem</p><h1>Marketplace</h1><p>Find trusted people, places, and services built around the needs of artists and the music industry.</p><small>Recommendations are shaped by what you’re working toward and what support you need right now.</small></div>
      <button className="market-secondary-action" onClick={() => open('List a Service', featured)}>+ List a Service</button>
    </header>

    <section className="market-insight">
      <Sparkles />
      <div><span>MLI recommends</span><p>Because promotion and booking are two of your current priorities, we’re showing marketing, photography, booking, and venue support first.</p></div>
      <button onClick={() => open('Why These Recommendations?', featured)}>Why these recommendations?</button>
    </section>

    <section className="market-toolbar" aria-label="Marketplace discovery controls">
      <label className="market-search-main"><Search size={18} /><input aria-label="Search marketplace" placeholder="Search services, venues, businesses..." value={query} onChange={event => setQuery(event.target.value)} /></label>
      <label><span>Category</span><select value={category} onChange={event => { setCategory(event.target.value); setFocus(''); }}>{primaryCategories.map(item => <option key={item}>{item}</option>)}</select></label>
      <label><span>Location</span><select value={filters.location} onChange={event => setFilters(current => ({ ...current, location: event.target.value }))}><option>All locations</option><option>New York area</option><option>Remote</option><option>East Coast</option><option>Ships nationwide</option></select></label>
      <button onClick={() => setFilterOpen(true)}><SlidersHorizontal size={17} /> Filters</button>
      <label className="market-sort"><span>Sort</span><select value={sort} onChange={event => setSort(event.target.value)}><option>Recommended</option><option>Highest Rated</option><option>Nearest</option><option>Price: Low to High</option><option>Price: High to Low</option></select></label>
    </section>

    <section className="goal-support">
      <div className="section-heading-inline"><div><p className="kicker">Support for your current goals</p><h2>Preparing for more live performances?</h2></div><button onClick={() => open('Saved', featured)}>Saved <ArrowRight size={14} /></button></div>
      <div className="goal-shortcuts">{[
        { key: 'Recording', label: 'Recording & Production', icon: Mic2, image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=500&q=80' },
        { key: 'Photography', label: 'Photography & Video', icon: Camera, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80' },
        { key: 'Marketing', label: 'Marketing & Promotion', icon: BriefcaseBusiness, image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=500&q=80' },
        { key: 'Venue Services', label: 'Venues', icon: Store, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80' },
        { key: 'Merchandise', label: 'Merchandise', icon: Package, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=80' },
      ].map(({ key, label, icon: Icon, image }) => <button className={focus === key ? 'active' : ''} aria-pressed={focus === key} onClick={() => { setFocus(focus === key ? '' : key); setRecommended(false); }} key={key} style={{ backgroundImage: `linear-gradient(180deg,rgba(6,16,34,.18),rgba(6,16,34,.88)),url(${image})` }}><Icon size={19} /><span>{label}</span></button>)}</div>
    </section>

    {notice && <p role="status" className="market-notice">{notice}<button aria-label="Dismiss notice" onClick={() => setNotice('')}><X size={15} /></button></p>}

    <section className="featured-provider">
      <MarketplaceImage listing={featured} />
      <div>
        <p className="mini-label">Recommended for your next move</p>
        <h2>{featured.title}</h2>
        <p className="provider-line">{featured.provider} · {featured.location}</p>
        <p>{featured.reason}</p>
        <div className="provider-proof"><span><Star size={14} /> {featured.stars.toFixed(1)} · {featured.reviews} reviews</span><span>{featured.pricing}</span><span>{featured.availability}</span></div>
        <button className="trust-line" onClick={() => open('Trust', featured)}><ShieldCheck size={15} /> {featured.trust}: {trustDescriptions[featured.trust]}</button>
        <div className="network-proof"><AvatarStack people={featured.network} /><span>Sarah Monroe and 2 people in your network recommend this studio.</span></div>
        <div className="featured-provider-actions"><button className="primary-action" onClick={() => open('Service Detail', featured)}>{featured.primary} <ArrowRight size={15} /></button><button onClick={() => open('Contact', featured)}>Contact</button><button onClick={() => open('Portfolio', featured)}>Portfolio</button></div>
      </div>
    </section>

    <section className="market-section">
      <div className="section-heading-inline"><div><p className="kicker">More recommended</p><h2>People and services worth a closer look.</h2></div><small>{visible.length} recommendations</small></div>
      <div className="recommended-market-grid">{recommendedListings.map(item => <ProviderCard key={item.id} listing={item} saved={saved.includes(item.id)} compared={compare.includes(item.id)} menuOpen={menu === item.id} onOpen={open} onSave={toggleSaved} onCompare={toggleCompare} onMenu={setMenu} />)}</div>
    </section>

    <section className="market-section">
      <div className="section-heading-inline"><div><p className="kicker">Explore Marketplace</p><h2>Studios, spaces, creative professionals, and products.</h2></div><label className="market-toggle"><input type="checkbox" checked={savedOnly} onChange={event => setSavedOnly(event.target.checked)} /> Saved only</label></div>
      {exploreListings.length ? <div className="explore-market-list">{exploreListings.map(item => <ProviderRow key={item.id} listing={item} saved={saved.includes(item.id)} compared={compare.includes(item.id)} onOpen={open} onSave={toggleSaved} onCompare={toggleCompare} />)}</div> : <div className="market-empty"><Search /><h2>No listings match these filters.</h2><p>Try another category or clear your filters.</p><button onClick={clear}>Clear filters</button></div>}
    </section>

    <section className="market-context-strip">
      <div><span>Preparing for CBS Studio Artist Showcase?</span><p>Photography, video, marketing, and studio support can help strengthen your application and follow-up.</p></div>
      <Link href="/events">View event <ArrowRight size={14} /></Link>
      <Link href="/opportunities">View opportunity <ArrowRight size={14} /></Link>
    </section>

    {compare.length > 0 && <div className="market-compare-tray"><span>Compare {compare.length} {compare.length === 1 ? 'service' : 'services'}</span><button disabled={compare.length < 2} onClick={() => open('Compare', featured)}>View Comparison <ArrowRight size={15} /></button><button onClick={() => setCompare([])}>Clear</button></div>}
    {filterOpen && <FilterDrawer filters={filters} setFilters={setFilters} visibleCount={visible.length} onClose={() => setFilterOpen(false)} onClear={clear} />}
    {modal && <MarketModal modal={modal} listing={selected} listings={listings} compare={compare} saved={saved.includes(selected.id)} submitted={submitted} requested={requested.includes(selected.id)} contactIntent={contactIntent} onClose={() => setModal('')} onOpen={open} onSave={toggleSaved} onCompare={toggleCompare} onSubmit={() => setSubmitted(true)} onRequest={() => setRequested(current => [...current, selected.id])} onContactIntent={setContactIntent} />}
  </div>;
}

function ProviderCard({ listing, saved, compared, menuOpen, onOpen, onSave, onCompare, onMenu }: {
  listing: Listing;
  saved: boolean;
  compared: boolean;
  menuOpen: boolean;
  onOpen: (kind: string, item: Listing) => void;
  onSave: (id: number) => void;
  onCompare: (id: number) => void;
  onMenu: (id: number | null) => void;
}) {
  return <article className="provider-card">
    <MarketplaceImage listing={listing} />
    <div className="provider-card-body">
      <div className="provider-card-top"><span>{listing.focus}</span><div className="provider-menu"><button aria-label={`More actions for ${listing.title}`} onClick={() => onMenu(menuOpen ? null : listing.id)}><MoreHorizontal size={17} /></button>{menuOpen && <div><button onClick={() => onSave(listing.id)}>{saved ? 'Unsave' : 'Save'}</button><button onClick={() => onCompare(listing.id)}>{compared ? 'Remove compare' : 'Add to Compare'}</button><button onClick={() => onOpen('Share', listing)}>Share</button></div>}</div></div>
      <button className="provider-title" onClick={() => onOpen('Service Detail', listing)}><h3>{listing.title}</h3></button>
      <p className="provider-name">{listing.provider}</p>
      <p className="provider-meta"><MapPin size={13} /> {listing.location} · {listing.mode}</p>
      <p className="provider-rating"><Star size={13} /> {listing.stars.toFixed(1)} · {listing.reviews} reviews</p>
      <p className="provider-description">{listing.description}</p>
      <div className="provider-price"><b>{listing.pricing}</b><span>{listing.availability}</span></div>
      <button className="trust-line compact" onClick={() => onOpen('Trust', listing)}><ShieldCheck size={14} /> {listing.trust}</button>
      <p className="goal-context">{listing.reason}</p>
    </div>
    <footer><button className="primary-action" onClick={() => onOpen('Service Detail', listing)}>{listing.primary}</button><button onClick={() => onOpen('Contact', listing)}>{listing.secondary}</button></footer>
  </article>;
}

function ProviderRow({ listing, saved, compared, onOpen, onSave, onCompare }: {
  listing: Listing;
  saved: boolean;
  compared: boolean;
  onOpen: (kind: string, item: Listing) => void;
  onSave: (id: number) => void;
  onCompare: (id: number) => void;
}) {
  return <article className="provider-row">
    <MarketplaceImage listing={listing} />
    <div><span>{listing.category} · {listing.trust}</span><button onClick={() => onOpen('Service Detail', listing)}>{listing.title}</button><p>{listing.provider} · {listing.location}</p><small>{listing.pricing} · {listing.availability}</small></div>
    <button aria-label={`${saved ? 'Unsave' : 'Save'} ${listing.title}`} aria-pressed={saved} onClick={() => onSave(listing.id)}><Bookmark size={16} fill={saved ? 'currentColor' : 'none'} /></button>
    <button aria-label={`${compared ? 'Remove from' : 'Add to'} comparison`} aria-pressed={compared} onClick={() => onCompare(listing.id)}><Check size={15} /></button>
    <button className="primary-action" onClick={() => onOpen('Service Detail', listing)}>{listing.primary}</button>
  </article>;
}

function FilterDrawer({ filters, setFilters, visibleCount, onClose, onClear }: {
  filters: typeof defaultFilters;
  setFilters: React.Dispatch<React.SetStateAction<typeof defaultFilters>>;
  visibleCount: number;
  onClose: () => void;
  onClear: () => void;
}) {
  const fields: [keyof typeof defaultFilters, string, string[]][] = [
    ['category', 'Category', ['All categories', ...rawCategories]],
    ['location', 'Location', ['All locations', 'New York area', 'Remote', 'East Coast', 'Ships nationwide']],
    ['mode', 'Remote / In Person', ['Any format', 'Remote', 'In-person', 'Shipping']],
    ['tier', 'Member Tier', ['All tiers', 'Professional', 'Pro', 'Premium']],
    ['rating', 'Rating', ['Any rating', '4.8 and up', '4.9 and up']],
    ['price', 'Price Range', ['Any price', 'Under $100', '$100-$400', 'Over $400', 'Request a Quote']],
    ['availability', 'Availability', ['Any availability', 'Available', 'Limited', 'June', 'Thursday']],
    ['verified', 'Verified / Trusted', ['Any trust', 'MLI Verified', 'MLI Trusted', 'MLI Partner']],
    ['serviceType', 'Service Type', ['Any service type', 'Recording', 'Marketing', 'Photography', 'Video', 'Tour Support', 'Merchandise', 'Venue Services']],
  ];
  return <div className="modal-backdrop" onClick={onClose}>
    <section className="detail-modal market-filter-modal market-bottom-sheet" role="dialog" aria-modal="true" aria-label="Marketplace filters" onClick={event => event.stopPropagation()}>
      <button autoFocus className="modal-close" aria-label="Close filters" onClick={onClose}><X /></button>
      <p className="kicker">Advanced Filters</p><h2>Filter Marketplace</h2>
      <div>{fields.map(([key, label, options]) => <label key={key}><span>{label}</span><select value={filters[key]} onChange={event => setFilters(current => ({ ...current, [key]: event.target.value }))}>{options.map(option => <option key={option}>{option}</option>)}</select></label>)}</div>
      <div className="filter-modal-actions"><button onClick={onClear}>Clear Filters</button><button className="primary-action" onClick={onClose}>Apply Filters · {visibleCount}</button></div>
    </section>
  </div>;
}

function MarketModal(props: {
  modal: string;
  listing: Listing;
  listings: Listing[];
  compare: number[];
  saved: boolean;
  submitted: boolean;
  requested: boolean;
  contactIntent: string;
  onClose: () => void;
  onOpen: (kind: string, item?: Listing) => void;
  onSave: (id: number) => void;
  onCompare: (id: number) => void;
  onSubmit: () => void;
  onRequest: () => void;
  onContactIntent: (intent: string) => void;
}) {
  const { modal, listing, listings, compare, saved, submitted, requested, contactIntent, onClose, onOpen, onSave, onCompare, onSubmit, onRequest, onContactIntent } = props;
  return <div className="modal-backdrop" onClick={onClose}>
    <section className={`detail-modal market-detail ${modal === 'Compare' ? 'market-comparison' : ''} ${modal === 'Service Detail' ? 'provider-detail-modal' : ''}`} role="dialog" aria-modal="true" aria-label={modal} onClick={event => event.stopPropagation()}>
      <button autoFocus className="modal-close" aria-label="Close dialog" onClick={onClose}><X /></button>
      {modal === 'Service Detail' && <ProviderDetail listing={listing} saved={saved} compared={compare.includes(listing.id)} onOpen={onOpen} onSave={onSave} onCompare={onCompare} />}
      {modal === 'Why These Recommendations?' && <><p className="kicker">Why these recommendations?</p><h2>Support matched to your next move.</h2><div className="why-fit-list"><span><Check size={15} /> Your need: promotion and booking support</span><span><Check size={15} /> Provider offers: campaign strategy, live visuals, venue support</span><span><Check size={15} /> Location: New York and remote options</span><span><Check size={15} /> Member trust: verified, trusted, and partner providers</span></div></>}
      {modal === 'Trust' && <><p className="kicker">Trust context</p><h2>{listing.trust}</h2><p>{trustDescriptions[listing.trust]}</p><p>{listing.tier} member status is separate from trust review and describes provider membership level.</p></>}
      {modal === 'Portfolio' && <><p className="kicker">Portfolio</p><h2>{listing.title}</h2><div className="portfolio-gallery">{listing.gallery.map((image, index) => <img src={image} alt={`${listing.title} work sample ${index + 1}`} key={image} />)}</div><p>{listing.services.join(' · ')}</p><button className="primary-action" onClick={() => onOpen('Contact', listing)}>Ask about this work <ArrowRight size={15} /></button></>}
      {modal === 'Reviews' && <><p className="kicker">Member reviews</p><h2>{listing.stars.toFixed(1)} · {listing.reviews} MLI member reviews</h2><blockquote>{listing.review}<small>{listing.reviewer}</small></blockquote><div className="network-proof"><AvatarStack people={listing.network} /><span>{listing.network[0].name} and 2 people in your network recommend this provider.</span></div></>}
      {modal === 'Contact' && <ContactPanel listing={listing} requested={requested} contactIntent={contactIntent} onIntent={onContactIntent} onRequest={onRequest} />}
      {modal === 'Saved' && <><p className="kicker">Saved</p><h2>Saved marketplace</h2><div className="your-events-panel"><button>Saved services <ArrowRight size={14} /></button><button>Saved businesses <ArrowRight size={14} /></button><button>Saved products <ArrowRight size={14} /></button></div><p className="event-demo-note">Saved state is simulated locally in this prototype.</p></>}
      {modal === 'Share' && <><p className="kicker">Share</p><h2>{listing.title}</h2><div className="event-share-options"><Link href={`/messages?provider=Sarah%20Monroe&listing=${encodeURIComponent(listing.title)}`}><MessageCircle size={16} /> Send in Message</Link><button><Share2 size={16} /> Copy Link</button></div></>}
      {modal === 'Compare' && <CompareTable listings={listings.filter(item => compare.includes(item.id))} />}
      {modal === 'List a Service' && <ListServiceForm submitted={submitted} onSubmit={onSubmit} />}
    </section>
  </div>;
}

function ProviderDetail({ listing, saved, compared, onOpen, onSave, onCompare }: {
  listing: Listing;
  saved: boolean;
  compared: boolean;
  onOpen: (kind: string, item?: Listing) => void;
  onSave: (id: number) => void;
  onCompare: (id: number) => void;
}) {
  return <>
    <div className="provider-detail-hero"><MarketplaceImage listing={listing} /><div><span>{listing.focus}</span><h2>{listing.title}</h2><p>{listing.provider} · {listing.location}</p><p>{listing.description}</p></div></div>
    <div className="provider-detail-summary"><p><b>Starting price</b>{listing.pricing}</p><p><b>Availability</b>{listing.availability}</p><p><b>Rating</b>{listing.stars.toFixed(1)} · {listing.reviews} reviews</p><p><b>Trust</b>{listing.trust}</p></div>
    <section className="provider-services"><h3>Services offered</h3>{listing.services.map(service => <span key={service}>{service}</span>)}</section>
    <section><h3>Portfolio</h3><div className="portfolio-gallery compact-gallery">{listing.gallery.map((image, index) => <button onClick={() => onOpen('Portfolio', listing)} key={image}><img src={image} alt={`${listing.title} gallery ${index + 1}`} /></button>)}</div></section>
    <section><h3>Featured review</h3><blockquote>{listing.review}<small>{listing.reviewer}</small></blockquote></section>
    <div className="network-proof"><AvatarStack people={listing.network} /><span>{listing.network[0].name} and 2 people in your network have used or recommended this.</span></div>
    <div className="market-ecosystem-links"><p><Sparkles size={14} /> This can support your FastTrack step: {listing.fastTrack}.</p><p><Users size={14} /> Active in: {listing.community}.</p><Link href="/events">Preparing for: CBS Studio Artist Showcase <ArrowRight size={14} /></Link><Link href="/opportunities">May help with: Live performance opportunities <ArrowRight size={14} /></Link></div>
    <div className="event-detail-cta"><button className="primary-action" onClick={() => onOpen('Contact', listing)}>{listing.secondary} <ArrowRight size={15} /></button><button onClick={() => onOpen('Reviews', listing)}>Reviews</button><button onClick={() => onOpen('Portfolio', listing)}>Portfolio</button><button onClick={() => onCompare(listing.id)}>{compared ? 'Remove Compare' : 'Add to Compare'}</button><button aria-pressed={saved} onClick={() => onSave(listing.id)}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}</button></div>
  </>;
}

function ContactPanel({ listing, requested, contactIntent, onIntent, onRequest }: {
  listing: Listing;
  requested: boolean;
  contactIntent: string;
  onIntent: (intent: string) => void;
  onRequest: () => void;
}) {
  return <>
    <p className="kicker">Contact provider</p><h2>{listing.title}</h2><p>{listing.provider} · {listing.availability}</p>
    <div className="market-contact-intents">{['Request Info', 'Check Availability', 'Request Quote', 'Book'].map(intent => <button aria-pressed={contactIntent === intent} className={contactIntent === intent ? 'active' : ''} onClick={() => onIntent(intent)} key={intent}>{intent}</button>)}</div>
    {listing.connected ? <Link className="primary-action" href={`/messages?provider=${encodeURIComponent(listing.provider)}&listing=${encodeURIComponent(listing.title)}&intent=${encodeURIComponent(contactIntent)}`}>Continue in Messages <ArrowRight size={16} /></Link> : <><p>Connect with this provider before messaging.</p><button disabled={requested} className="primary-action" onClick={onRequest}>{requested ? 'Connection request pending' : 'Send connection request'}</button></>}
  </>;
}

function CompareTable({ listings }: { listings: Listing[] }) {
  return <><p className="kicker">Comparison</p><h2>Compare your shortlist</h2><div className="market-table-scroll"><table><thead><tr><th>Details</th>{listings.map(item => <th key={item.id}>{item.title}</th>)}</tr></thead><tbody>{[
    ['Category', 'focus'],
    ['Location', 'location'],
    ['Price', 'pricing'],
    ['Reviews', 'reviews'],
    ['Availability', 'availability'],
    ['Trust', 'trust'],
    ['Included services', 'services'],
  ].map(([label, key]) => <tr key={label}><th>{label}</th>{listings.map(item => <td key={item.id}>{key === 'reviews' ? `${item.stars.toFixed(1)} · ${item.reviews}` : key === 'services' ? item.services.join(', ') : String(item[key as keyof Listing])}</td>)}</tr>)}</tbody></table></div></>;
}

function ListServiceForm({ submitted, onSubmit }: { submitted: boolean; onSubmit: () => void }) {
  if (submitted) return <><p className="kicker">Submitted</p><h2>Submitted for MLI review</h2><p>Your marketplace listing was submitted in this prototype only. Nothing was published.</p></>;
  return <>
    <p className="kicker">Provider flow</p><h2>List a Service</h2><p>Available to business / venue accounts, Professional members, approved Pro/Premium members, and MLI partners.</p>
    <form className="market-list-form" onSubmit={event => { event.preventDefault(); onSubmit(); }}>
      {['Service / Business Name', 'Category', 'Description', 'Location', 'Remote / In Person', 'Pricing', 'Availability', 'Portfolio', 'Contact Method', 'Cover Image'].map(label => <label className={label === 'Description' ? 'wide' : ''} key={label}>{label}{label === 'Description' ? <textarea required rows={3} /> : <input required={!['Portfolio', 'Cover Image'].includes(label)} placeholder={label} />}</label>)}
      <button className="primary-action" type="submit">Submit for MLI review <ArrowRight size={15} /></button>
    </form>
  </>;
}
