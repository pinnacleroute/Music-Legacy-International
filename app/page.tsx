import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Crown,
  Headphones,
  MapPin,
  Mic2,
  Network,
  Radio,
  Sparkles,
  Target,
  TrendingUp,
  UserRoundCheck,
  Users,
  Zap,
} from 'lucide-react';
import { BrandLockup } from './_components/BrandLogo';

const proofPoints = [
  ['12K+', 'creative members'],
  ['48', 'industry communities'],
  ['1,200+', 'connections made'],
];

const audiences = [
  { icon: Mic2, title: 'Artists and musicians', text: 'Find stages, collaborators, representation, and the people who can move your music forward.' },
  { icon: Network, title: 'Industry professionals', text: 'Discover talent, grow your network, and build relationships that lead somewhere.' },
  { icon: Building2, title: 'Businesses and venues', text: 'Connect with performers, creative services, audiences, and trusted partners.' },
  { icon: Headphones, title: 'Fans and culture builders', text: 'Find new voices, live experiences, and the stories shaping music culture.' },
];

const journey = [
  ['01', 'Create your profile', 'Show who you are, what you offer, and where you want to go.', UserRoundCheck],
  ['02', 'Complete Bridging', 'Turn goals, needs, skills, and challenges into a clearer signal.', Target],
  ['03', 'Meet the right matches', 'See people, groups, events, and opportunities that fit your path.', Sparkles],
  ['04', 'Build momentum', 'Apply, connect, participate, and track progress through FastTrack.', TrendingUp],
];

function HeroStoryZone() {
  return <div className="hero-story-zone" aria-label="Replaceable hero storytelling visual zone">
    <div className="story-zone-label"><Radio size={14}/> Future hero visual</div>
    <div className="story-zone-stage">
      <span/>
      <span/>
      <span/>
      <div>
        <b>Music opportunity in motion</b>
        <small>Reserved for performance, artist, or venue storytelling</small>
      </div>
    </div>
    <div className="hero-match-note">
      <Sparkles size={15}/>
      <p><b>Your next move, surfaced.</b><small>Personalized opportunities, people, events, and communities.</small></p>
    </div>
  </div>;
}

function EditorialMediaBand() {
  return <div className="editorial-media-band" aria-label="Replaceable editorial media band">
    <span>Future editorial visual</span>
    <div>
      <b>Artist path, industry access, community signal</b>
      <small>Reserved for studio, live room, or creator-culture imagery.</small>
    </div>
  </div>;
}

function CultureStorySection() {
  return <div className="culture-story-zone" aria-label="Replaceable artist and community storytelling zone">
    <span>Future culture visual</span>
    <div>
      <b>Faces, rooms, and scenes that make the network feel alive.</b>
      <small>Reserved for artist portraits, community moments, and music culture.</small>
    </div>
  </div>;
}

function OpportunityStoryPanel() {
  return <div className="opportunity-story-panel" aria-label="Replaceable opportunity and live-event storytelling zone">
    <span>Future opportunity visual</span>
    <div className="opportunity-proof">
      <small>Live performance match</small>
      <h3>Live Blues Guitarist Needed</h3>
      <p><MapPin size={13}/> Brooklyn, NY <i/> <CircleDollarSign size={13}/> Paid</p>
      <Link href="/opportunities">View opportunity <ArrowRight size={14}/></Link>
    </div>
  </div>;
}

export default function Home() {
  return <main className="home-page editorial-home">
    <header className="home-nav-wrap"><nav className="home-nav">
      <Link href="/" className="brand-logo-link home-brand"><BrandLockup className="home-brand-lockup" priority /></Link>
      <div className="home-links"><a href="#path">How it works</a><Link href="/opportunities">Opportunities</Link><Link href="/community">Community</Link><Link href="/membership">Membership</Link></div>
      <div className="home-nav-actions"><Link href="/dashboard" className="nav-signin">Member access</Link><Link href="/onboarding" className="nav-cta">Find My MLI Path <ArrowRight/></Link></div>
    </nav></header>

    <section className="editorial-hero">
      <div className="hero-copy">
        <div className="home-eyebrow"><span><Radio/></span> The future of music opportunity</div>
        <h1>Where Music, <em>Opportunity,</em> and Community Connect.</h1>
        <p>Build your network, discover the right opportunities, and move your career or business forward through one personalized MLI path.</p>
        <div className="hero-actions"><Link href="/onboarding" className="home-button primary">Find My MLI Path <ArrowRight/></Link><Link href="/opportunities" className="home-button secondary">Explore Opportunities <ChevronRight/></Link></div>
      </div>
      <HeroStoryZone/>
    </section>

    <section className="editorial-proof-strip" aria-label="Music Legacy proof">
      <p><b>Built for the people moving music forward.</b> Fans, artists, professionals, businesses, venues, and organizations in one connected ecosystem.</p>
      {proofPoints.map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}
    </section>

    <section id="path" className="editorial-path home-section">
      <div>
        <span className="section-tag">YOUR PATH, PERSONALIZED</span>
        <h2>Music moves differently when the <em>right next step</em> finds you.</h2>
        <p>Music Legacy learns who you are and where you want to go, then brings the people, opportunities, and experiences most likely to help you advance into focus.</p>
        <div className="path-signals"><span><Check/> Your profile</span><span><Check/> Your ambitions</span><span><Check/> Your activity</span></div>
        <Link href="/bridging">Explore the Bridging Engine <ArrowRight/></Link>
      </div>
      <EditorialMediaBand/>
    </section>

    <section className="audience-editorial">
      <div className="home-section audience-editorial-inner">
        <div className="audience-copy">
          <span className="section-tag">ONE INDUSTRY. MANY PATHS.</span>
          <h2>Built for every side of the industry, without making every path look the same.</h2>
          <p>Whether you create, connect, open doors, or champion the culture, Music Legacy gives you a place to move forward.</p>
        </div>
        <div className="audience-lines">
          {audiences.map(({icon:Icon,title,text})=><Link href="/dashboard" key={title}>
            <Icon size={20}/>
            <p><b>{title}</b><span>{text}</span></p>
            <ArrowRight size={14}/>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="culture-editorial home-section">
      <CultureStorySection/>
      <div>
        <span className="section-tag">CULTURE, NOT JUST CONNECTIONS</span>
        <h2>A network should feel like the rooms, stages, and stories it opens.</h2>
        <p>This page now leaves room for the final music storytelling layer: performance visuals, artist portraits, studio scenes, event imagery, and community moments that can carry the emotional weight of the brand.</p>
      </div>
    </section>

    <section className="journey-editorial">
      <div className="home-section journey-editorial-inner">
        <div>
          <span className="section-tag">FROM PROFILE TO POSSIBILITY</span>
          <h2>One connected Music Legacy journey.</h2>
          <p>Your profile and Bridging Tool create the signal behind every connection, group, event, opportunity, and FastTrack step.</p>
          <Link href="/onboarding" className="journey-cta">Build your Music Legacy path <ArrowRight/></Link>
        </div>
        <div className="journey-lines">
          {journey.map(([n,title,text,Icon])=>{const StepIcon=Icon as typeof Target;return <article key={String(n)}>
            <span>{String(n)}</span>
            <StepIcon size={18}/>
            <p><b>{String(title)}</b><small>{String(text)}</small></p>
          </article>})}
        </div>
      </div>
    </section>

    <section className="opportunity-editorial home-section">
      <div>
        <span className="section-tag">OPPORTUNITY IN ACTION</span>
        <h2>Proof should feel active, not boxed in.</h2>
        <p>From the next live stage to the right industry relationship, your Music Legacy path keeps possibility within reach.</p>
        <div className="opportunity-links">
          <Link href="/opportunities"><Mic2 size={16}/> Matched opportunities <ArrowRight size={14}/></Link>
          <Link href="/community"><Users size={16}/> Recommended connections <ArrowRight size={14}/></Link>
          <Link href="/events"><CalendarDays size={16}/> Live events <ArrowRight size={14}/></Link>
        </div>
      </div>
      <OpportunityStoryPanel/>
    </section>

    <section className="closing-vision editorial-closing">
      <div className="closing-inner"><span><Crown/></span><div><small>THE MUSIC LEGACY VISION</small><h2>More than a network.<br/>A place for the industry to <em>move forward together.</em></h2><p>For artists. For professionals. For businesses. For the people who believe music creates lasting connection, culture, and opportunity.</p></div><Link href="/dashboard" className="home-button gold">Enter Music Legacy <ArrowRight/></Link></div>
    </section>

    <footer className="home-footer"><div className="footer-main"><div className="footer-brand"><Link href="/" className="brand-logo-link footer-logo-link"><BrandLockup /></Link><p>Where music, opportunity, and community connect, and where every member can find a clearer way forward.</p><span>Music · Arts · Entertainment · Opportunity</span></div><div><h4>Explore</h4><Link href="/community">Community</Link><Link href="/opportunities">Opportunities</Link><Link href="/bridging">Your Path</Link><Link href="/membership">Membership</Link></div><div><h4>Connect</h4><Link href="/profile/sarah-monroe">Members</Link><a href="#path">How It Works</a><a href="mailto:hello@musiclegacyinternational.com">Contact</a><Link href="/dashboard">Member Access</Link></div><div className="footer-callout"><span><Zap/></span><h3>Ready for your next move?</h3><p>Discover what Music Legacy recommends for you.</p><Link href="/dashboard">Get started <ArrowRight/></Link></div></div><div className="footer-bottom"><p>© 2026 Music Legacy International. All rights reserved.</p><p>Built to move music forward.</p></div></footer>
  </main>;
}
