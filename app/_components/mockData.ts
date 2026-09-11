export const memberTypes = ['Fan / Audiophile','Artist / Musician','Music Industry Professional','Business / Venue / Organization'];
export const professionalTypes = ['Producer','Booking Agent','Promoter','Photographer','Videographer','Stage Crew','Music Marketing','Mentor / Teacher','Venue Manager'];

export const members = [
  { id:'sarah-monroe', initials:'SM', name:'Sarah Monroe', type:'Music Industry Professional', role:'Booking Agent', location:'New York, NY', specialty:'Live Music · Independent Artists', reason:'You both work in live music and are located in New York.', tone:'violet', state:'Connect' },
  { id:'marcus-lee', initials:'ML', name:'Marcus Lee', type:'Music Industry Professional', role:'Producer', location:'Brooklyn, NY', specialty:'Soul · R&B Production', reason:'Works with independent artists and matches your production needs.', tone:'blue', state:'Connected' },
  { id:'jessica-reed', initials:'JR', name:'Jessica Reed', type:'Business / Venue / Organization', role:'Venue Manager', location:'Manhattan, NY', specialty:'Live Events · Showcases', reason:'Located in New York and matches your booking needs.', tone:'gold', state:'Accept' },
  { id:'nia-brooks', initials:'NB', name:'Nia Brooks', type:'Artist / Musician', role:'Singer / Songwriter', location:'Queens, NY', specialty:'Soul · Jazz · Live Performance', reason:'Shares your genres and is looking for a guitarist.', tone:'cyan', state:'Connect' },
];

export const opportunities = [
  { id:1,title:'CBS Studio Artist Showcase',organization:'CBS Studio, New York',category:'Performance',lookingFor:'Artist / Musician',genre:'Blues · Soul',location:'New York, NY',date:'May 24',deadline:'May 17',compensation:'Paid · $650',match:95,description:'A curated evening connecting independent artists with booking professionals, venue partners, and music media.',reasons:['Matches your Blues & Soul profile','Near your New York location','Fits your live-performance goal','Requires your listed guitar skills'] },
  { id:2,title:'Live Blues Guitarist Needed',organization:'The Harbor Room',category:'Gig',lookingFor:'Artist / Musician',genre:'Blues',location:'Brooklyn, NY',date:'May 18',deadline:'May 14',compensation:'Paid · $450',match:92,description:'Seeking an expressive blues guitarist for a featured weekend set with an established house band.',reasons:['Matches your primary genre','12 miles from your location','Fits your booking goal','Requires live performance experience'] },
  { id:3,title:'Producer Seeking Female Vocalist',organization:'Northline Sound',category:'Collaboration',lookingFor:'Artist / Musician',genre:'Soul · R&B',location:'Remote',date:'Rolling',deadline:'June 1',compensation:'Revenue share',match:88,description:'Soul-forward vocalist wanted for a polished three-track collaboration and release campaign.',reasons:['Matches your collaboration interests','Remote participation available','Aligned with your Soul profile'] },
  { id:4,title:'Tour Photographer Needed',organization:'Morrow Artist Co.',category:'Crew',lookingFor:'Photographer',genre:'Multi-genre',location:'East Coast',date:'Jun 2–16',deadline:'May 19',compensation:'Paid',match:80,description:'Document an emerging artist’s first regional tour across six cities.',reasons:['Matches your touring interests','Professional member opportunity','Regional travel preference'] },
  { id:5,title:'Independent Artist Marketing Program',organization:'Brightnote Creative',category:'Services',lookingFor:'Artist / Musician',genre:'All genres',location:'Remote',date:'Starts Jun 8',deadline:'May 30',compensation:'Member rate',match:84,description:'A four-week strategy program for artists preparing a release or live-show campaign.',reasons:['Addresses your promotion needs','Supports your audience-growth goal','Available remotely'] },
];

export const events = [
  { id:'artist-workshop', day:'14',month:'MAY',date:'May 14',time:'7:00 PM ET',title:'Independent Artist Workshop',category:'Workshop',location:'Online',organizer:'MLI Education',capacity:'120 members',access:'All members',cta:'RSVP' },
  { id:'networking-night', day:'18',month:'MAY',date:'May 18',time:'6:30 PM ET',title:'Music Business Networking Night',category:'Networking Session',location:'Brooklyn, NY',organizer:'MLI New York',capacity:'80 members',access:'Professional+',cta:'RSVP' },
  { id:'cbs-showcase', day:'24',month:'MAY',date:'May 24',time:'8:00 PM ET',title:'CBS Studio Artist Showcase',category:'Live Showcase',location:'Manhattan, NY',organizer:'Music Legacy International',capacity:'150 guests',access:'Pro members only',cta:'Request access' },
  { id:'producer-session', day:'29',month:'MAY',date:'May 29',time:'5:00 PM ET',title:'Producer Collaboration Session',category:'Virtual Meeting',location:'Online',organizer:'Producers & Engineers',capacity:'40 members',access:'Professional+',cta:'RSVP' },
];

export const groups = [
  {id:'welcome',name:'Welcome – Getting Started',description:'Meet the community, learn the platform, and complete your first MLI actions.',members:'12.4K',activity:'Very active',joined:true},
  {id:'independent-artists',name:'Independent Artists',description:'Share releases, find collaborators, and grow sustainable independent careers.',members:'4.8K',activity:'36 posts today',joined:true},
  {id:'producers-engineers',name:'Producers & Engineers',description:'Studio craft, production opportunities, gear, and trusted creative partnerships.',members:'2.6K',activity:'18 posts today',joined:false},
  {id:'live-events-touring',name:'Live Events & Touring',description:'Showcases, touring, booking, production, and everything that happens on stage.',members:'3.1K',activity:'24 posts today',joined:false},
  {id:'music-business-network',name:'Music Business Network',description:'Practical knowledge and relationships for a changing music business.',members:'5.2K',activity:'Very active',joined:false},
  {id:'venues-booking',name:'Venues & Booking',description:'Connect artists, agents, promoters, and venue decision-makers.',members:'1.9K',activity:'12 posts today',joined:false},
  {id:'promotion-marketing',name:'Promotion & Marketing',description:'Campaign strategy, press, content, radio, and audience development.',members:'2.3K',activity:'16 posts today',joined:false},
  {id:'fans-audiophiles',name:'Fans & Audiophiles',description:'Discover artists, share listening notes, and find memorable live experiences.',members:'3.7K',activity:'21 posts today',joined:false},
];

export const marketplace = [
  {id:1,title:'Northline Recording Studio',provider:'Marcus Lee',category:'Services',subtype:'Recording Studio',location:'Brooklyn, NY',rating:'Verified · 4.9',tier:'Professional'},
  {id:2,title:'Release Campaign Strategy',provider:'Brightnote Creative',category:'Artist Services',subtype:'Music Marketing Consultant',location:'Remote',rating:'MLI Trusted · 4.8',tier:'Pro'},
  {id:3,title:'Live & Tour Photography',provider:'Maya Ellis',category:'Vendors',subtype:'Photographer',location:'New York, NY',rating:'Verified · 4.9',tier:'Professional'},
  {id:4,title:'Performance Video Sessions',provider:'Framehouse Media',category:'Businesses',subtype:'Videographer',location:'Queens, NY',rating:'Verified · 4.7',tier:'Professional'},
  {id:5,title:'Northeast Tour Support',provider:'Roadcraft Touring',category:'Services',subtype:'Tour Services',location:'East Coast',rating:'MLI Trusted · 4.8',tier:'Pro'},
  {id:6,title:'Small-Batch Artist Merchandise',provider:'Signal Merch Co.',category:'Products',subtype:'Merchandise Vendor',location:'Ships nationwide',rating:'Verified · 4.6',tier:'Professional'},
  {id:7,title:'The Lantern Room',provider:'Jessica Reed',category:'Affiliates',subtype:'Venue Rental',location:'Manhattan, NY',rating:'MLI Partner · 4.9',tier:'Premium'},
];

export const posts = [
  { id:1,initials:'AC',name:'Amara Cole',role:'Artist / Musician',time:'18m',content:'My new single “Stay Until Sunrise” is finally out. This community helped me find the horn players who brought it to life.',tag:'NEW RELEASE',visual:'release' },
  { id:2,initials:'JR',name:'Jessica Reed',role:'Business / Venue / Organization',time:'1h',content:'Booking two opening acts for our June soul series in Manhattan. Looking for strong live performers with 30-minute sets.',tag:'OPPORTUNITY',visual:'venue' },
  { id:3,initials:'ML',name:'Marcus Lee',role:'Music Industry Professional · Producer',time:'3h',content:'Studio B has two evening sessions available next week. Ideal for vocal tracking, songwriting, or pre-production.',tag:'STUDIO',visual:'studio' },
  { id:4,initials:'MLI',name:'Music Legacy',role:'Community Team',time:'Yesterday',content:'Join us for a candid conversation on building relationships that lead to real music-industry opportunities.',tag:'LIVE SESSION',visual:'network' },
];

export const memberships = [
  {name:'Free',price:'$0',line:'Discover the MLI community.',features:['Community access','Basic profile','Public events','Limited connections']},
  {name:'Professional',price:'$15',line:'Build professional presence.',features:['Enhanced profile','More networking','Professional directory access','Member groups']},
  {name:'Pro',price:'$29',line:'Turn goals into opportunity.',features:['Opportunity matching','FastTrack access','Premium groups','Advanced recommendations','Priority event access'],recommended:true},
  {name:'Premium',price:'$59',line:'Access high-touch introductions.',features:['Priority introductions','Exclusive opportunities','Premium visibility','Private sessions','Featured profile']},
];

export const adminActions = ['Edit member email','Change membership level','Approve opportunity','Approve vendor','Create event','Create group','Feature member','Feature opportunity'];
