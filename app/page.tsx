import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Building2, CalendarDays, Crown, Headphones, Lightbulb, Mic2, Network, Sparkles, Target, UserRoundCheck, Users } from 'lucide-react';

const audiences = [
  { icon: Mic2, title: 'Artist / Musician', text: 'Find stages, collaborators, representation, and the people who can move your music forward.' },
  { icon: Network, title: 'Industry Professional', text: 'Discover talent, grow your network, and build meaningful industry relationships.' },
  { icon: Building2, title: 'Business / Venue', text: 'Connect with performers, creative services, audiences, and trusted partners.' },
  { icon: Headphones, title: 'Fan / Audiophile', text: 'Discover new voices, live experiences, and the stories shaping music culture.' },
];
const features = [
  {icon:Target,title:'Discover Opportunities',text:'See the gigs, roles, collaborations, and services most relevant to your ambitions.'},
  {icon:Users,title:'Connect with Industry Professionals',text:'Build relationships with people who understand your sound, goals, and market.'},
  {icon:CalendarDays,title:'Join Events & Live Sessions',text:'Learn, perform, and meet your next collaborator in spaces designed for connection.'},
  {icon:Crown,title:'Access Premium Career Tools',text:'Turn insight into action with deeper discovery, visibility, and introductions.'},
  {icon:Lightbulb,title:'Grow Through Recommendations',text:'Get personal next steps shaped by your profile, goals, skills, and activity.'},
];

export default function Home() {
  return (
    <main className="landing-page min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 lg:px-14">
        <Link href="/" className="brand-mark"><span className="brand-emblem">ML</span><span>Music Legacy <b>International</b></span></Link>
        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#journey">How it works</a><Link href="/opportunities">Opportunities</Link><Link href="/community">Community</Link><Link href="/membership">Membership</Link>
        </div>
        <Link href="/dashboard" className="button button-small button-outline">Member access</Link>
      </nav>

      <section className="relative mx-auto grid min-h-[640px] max-w-[1440px] items-center gap-12 px-5 pb-24 pt-16 md:px-10 lg:grid-cols-[1.05fr_.95fr] lg:px-14 lg:pt-10">
        <div className="hero-glow" />
        <div className="relative z-10">
          <div className="eyebrow"><Sparkles size={14} /> The future of music community</div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.045em] text-white md:text-7xl xl:text-[86px]">Where Music, <span>Opportunity,</span> and Community Connect.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">Build your network, discover opportunities, and move your career forward with a community built for music, arts, and entertainment.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/dashboard" className="button button-primary">Enter Music Legacy <ArrowRight size={18} /></Link>
            <Link href="/opportunities" className="button button-ghost">Explore Opportunities</Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <span><b className="text-white">12K+</b> creative members</span><span className="h-1 w-1 rounded-full bg-[#dab65c]"/><span><b className="text-white">48</b> industry communities</span><span className="h-1 w-1 rounded-full bg-[#dab65c]"/><span><b className="text-white">1,200+</b> connections made</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[600px]">
          <div className="orbit-card relative">
            <div className="mb-7 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-300">Your path, personalized</p><h2 className="mt-2 text-2xl font-semibold">A better next move starts here.</h2></div><div className="pulse-dot"><span /></div></div>
            <div className="space-y-3">
              <div className="journey-row"><span>01</span><div><b>Tell us who you are</b><p>Artist · New York · Blues & Soul</p></div><div className="status-check">✓</div></div>
              <div className="journey-row active"><span>02</span><div><b>Share where you want to go</b><p>More performances · Industry connections</p></div><div className="sound-bars"><i/><i/><i/><i/></div></div>
              <div className="journey-row"><span>03</span><div><b>Meet your best matches</b><p>People, opportunities, events, and resources</p></div><ArrowRight size={18} className="text-[#dab65c]"/></div>
            </div>
            <div className="mt-6 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dab65c] text-[#08142e]"><BriefcaseBusiness size={19}/></div><div className="flex-1"><p className="text-sm font-semibold">Live Blues Guitarist Needed</p><p className="mt-1 text-xs text-slate-400">Brooklyn · Paid · 92% match</p></div><span className="match-pill">Top match</span></div></div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 pb-28 md:px-10 lg:px-14">
        <div className="mb-8 flex items-end justify-between"><div><p className="section-kicker">Find your place</p><h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Built for every side of the industry.</h2></div><p className="hidden max-w-sm text-right text-sm leading-6 text-slate-400 md:block">One connected community. Different paths, goals, and possibilities.</p></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{audiences.map(({icon: Icon,title,text},i)=><Link href="/dashboard" className="audience-card group" key={title}><div className="flex items-center justify-between"><span className="audience-icon"><Icon size={22}/></span><span className="text-xs text-slate-500">0{i+1}</span></div><h3>{title}</h3><p>{text}</p><span className="card-link">Explore <ArrowRight size={15}/></span></Link>)}</div>
      </section>

      <section className="needs-section">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:px-14">
          <p className="section-kicker">More than a network</p><h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">Built Around What You Need</h2>
          <div className="feature-grid">{features.map(({icon:Icon,title,text},i)=><div className="feature-card" key={title}><span className="feature-number">0{i+1}</span><Icon/><h3>{title}</h3><p>{text}</p></div>)}</div>
        </div>
      </section>

      <section id="journey" className="journey-section mx-auto max-w-[1440px] px-5 py-28 md:px-10 lg:px-14">
        <div><p className="section-kicker">A path made personal</p><h2>Your Journey</h2><p>We turn what you share into clearer connections, better-fit opportunities, and meaningful next steps.</p><Link href="/bridging" className="button button-primary">See your Music Legacy path <ArrowRight size={17}/></Link></div>
        <div className="journey-map">{[['01','Create Profile',UserRoundCheck],['02','Tell Us Your Goals',Target],['03','Get Matched',Sparkles],['04','Connect',Network],['05','Advance',ArrowRight]].map(([n,label,Icon],i)=>{const JourneyIcon=Icon as typeof Target;return <div className="journey-step" key={String(label)}><span>{String(n)}</span><i><JourneyIcon/></i><b>{String(label)}</b>{i<4&&<ArrowRight className="journey-arrow"/>}</div>})}</div>
      </section>

      <footer><div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14"><Link href="/" className="brand-mark"><span className="brand-emblem">ML</span><span>Music Legacy <b>International</b></span></Link><div className="footer-links"><Link href="/community">Community</Link><Link href="/opportunities">Opportunities</Link><Link href="/membership">Membership</Link><a href="#journey">About</a><a href="mailto:hello@musiclegacyinternational.com">Contact</a></div><p>© 2026 Music Legacy International</p></div></footer>
    </main>
  );
}
