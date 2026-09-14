'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormEvent, KeyboardEvent, Suspense, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Bookmark, BriefcaseBusiness, CalendarDays, Camera, Check,
  FileText, Image as ImageIcon, Mic, MoreHorizontal, Music2, Pause, Play,
  MessageCircle, Search, Send, ShieldAlert, Store, UserRound, Users, Volume2, X,
} from 'lucide-react';
import { marketplace, members, opportunities } from './mockData';

type ShareKind = 'Photo / Video' | 'Audio' | 'File' | 'Opportunity' | 'Event' | 'Profile' | 'Group' | 'Service';
type ConnectionState = 'Connected' | 'Pending' | 'Not connected';
type Message = {
  id: string;
  sender: 'me' | string;
  text: string;
  time: string;
  type?: ShareKind | 'text' | 'availability' | 'time';
  readState?: 'Sent' | 'Delivered' | 'Seen';
  reaction?: string;
  replyTo?: string;
};
type Conversation = {
  id: number;
  memberId: string;
  state: ConnectionState;
  context: { label: string; title: string; href: string; kind: 'Group' | 'Opportunity' | 'Event' | 'Service' | 'Intro' };
  last: string;
  timestamp: string;
  unread?: boolean;
  activity: string;
  messages: Message[];
};

const profileImages: Record<string, string> = {
  'marcus-lee': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
  'sarah-monroe': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
  'jessica-reed': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
  'nia-brooks': 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=80',
};

const memberOrder = [members[1], members[0], members[2], members[3]];
const opportunity = opportunities[0];
const service = marketplace[0];

const seedConversations: Conversation[] = [
  {
    id: 0,
    memberId: 'marcus-lee',
    state: 'Connected',
    context: { label: 'Connected through', title: 'Producers & Engineers', href: '/community/producers-engineers', kind: 'Group' },
    last: 'I can send the studio availability…',
    timestamp: '2m',
    unread: true,
    activity: 'Active now',
    messages: [
      { id: 'm1', sender: 'marcus-lee', text: 'Hi Alex — your live set caught my attention. Are you available next Thursday?', time: '4:30 PM', readState: 'Seen' },
      { id: 'm2', sender: 'me', text: 'Thanks for reaching out. Yes, I’m available after 4 PM.', time: '4:32 PM', readState: 'Seen', reaction: 'Applaud' },
      { id: 'm3', sender: 'marcus-lee', text: 'Perfect. I can send the details and introduce you to the organizer.', time: '4:34 PM', readState: 'Delivered' },
      { id: 'm4', sender: 'marcus-lee', text: 'Rough mix preview', time: '4:36 PM', type: 'Audio', readState: 'Delivered' },
    ],
  },
  {
    id: 1,
    memberId: 'sarah-monroe',
    state: 'Pending',
    context: { label: 'Recommended from', title: 'Live Events & Touring', href: '/community/live-events-touring', kind: 'Group' },
    last: 'Connection request pending',
    timestamp: '1d',
    activity: 'Active 2h ago',
    messages: [],
  },
  {
    id: 2,
    memberId: 'jessica-reed',
    state: 'Connected',
    context: { label: 'Regarding', title: 'CBS Studio Artist Showcase', href: '/opportunities', kind: 'Opportunity' },
    last: 'Let’s discuss the June series.',
    timestamp: '3d',
    activity: 'Active yesterday',
    messages: [
      { id: 'j1', sender: 'jessica-reed', text: 'Hi Alex — your profile came up around the showcase conversation.', time: 'Tue 2:15 PM', readState: 'Seen' },
      { id: 'j2', sender: 'me', text: 'Thanks Jessica. I’d love to understand what you’re looking for in the June series.', time: 'Tue 2:20 PM', readState: 'Seen' },
      { id: 'j3', sender: 'jessica-reed', text: 'Can you make this showcase?', time: 'Tue 2:24 PM', type: 'Event', readState: 'Delivered' },
    ],
  },
  {
    id: 3,
    memberId: 'nia-brooks',
    state: 'Not connected',
    context: { label: 'Collaboration', title: 'Producer Seeking Female Vocalist', href: '/opportunities', kind: 'Opportunity' },
    last: 'Start a connection',
    timestamp: '3d',
    activity: 'Active this week',
    messages: [],
  },
];

function memberById(id: string) {
  return members.find(member => member.id === id) ?? members[0];
}

function PersonPhoto({ id, initials }: { id: string; initials: string }) {
  const image = profileImages[id];
  return image ? <img className="message-photo" src={image} alt="" loading="lazy" /> : <span className="avatar">{initials}</span>;
}

export default function MessagesContent() {
  return <Suspense><MessagesQuery /></Suspense>;
}

function MessagesQuery() {
  const params = useSearchParams();
  return <MessagesView
    provider={params.get('provider') || ''}
    listing={params.get('listing') || params.get('event') || ''}
    contextKind={params.get('event') ? 'event' : 'service'}
    intent={params.get('intent') || ''}
  />;
}

function MessagesView({ provider, listing, intent, contextKind }: { provider: string; listing: string; intent: string; contextKind: string }) {
  const initialIndex = Math.max(0, memberOrder.findIndex(member => provider && member.name === provider));
  const [conversations, setConversations] = useState(seedConversations);
  const [active, setActive] = useState(initialIndex);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState(listing ? (intent === 'Ask About Availability' ? `Hi! What is your availability for ${listing}?` : intent === 'Request Info' ? `Hi! Could you share more information about ${listing}?` : `Hi! I’d like to discuss ${listing}.`) : '');
  const [mobileChat, setMobileChat] = useState(Boolean(listing));
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [modal, setModal] = useState('');
  const [personSearch, setPersonSearch] = useState('');
  const [notice, setNotice] = useState('');
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [typing, setTyping] = useState(false);
  const [playing, setPlaying] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);

  const conversation = conversations[active];
  const person = memberById(conversation.memberId);
  const connected = conversation.state === 'Connected';

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [active, conversations, typing]);

  const filtered = conversations
    .map((conversation, index) => ({ conversation, index, member: memberById(conversation.memberId) }))
    .filter(({ conversation, member }) => {
      if (filter === 'Unread' && !conversation.unread) return false;
      if (filter === 'Connections' && conversation.state !== 'Connected') return false;
      if (filter === 'Opportunities' && conversation.context.kind !== 'Opportunity') return false;
      if (filter === 'Groups' && conversation.context.kind !== 'Group') return false;
      return `${member.name} ${member.role} ${conversation.context.title} ${conversation.last}`.toLowerCase().includes(search.toLowerCase());
    });

  function select(index: number) {
    setActive(index);
    setMobileChat(true);
    setReplyTo(null);
    setAttachmentOpen(false);
    setMoreOpen(false);
    setModal('');
    setConversations(current => current.map((item, i) => i === index ? { ...item, unread: false } : item));
  }

  function updateConversation(updater: (conversation: Conversation) => Conversation) {
    setConversations(current => current.map((item, index) => index === active ? updater(item) : item));
  }

  function sendMessage(text = draft, type: Message['type'] = 'text') {
    if (!connected || !text.trim()) return;
    const next: Message = {
      id: `${Date.now()}`,
      sender: 'me',
      text: text.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      type,
      readState: 'Sent',
      replyTo: replyTo?.text,
    };
    updateConversation(item => ({ ...item, last: text.trim(), timestamp: 'now', messages: [...item.messages, next] }));
    setDraft('');
    setReplyTo(null);
    setAttachmentOpen(false);
    setModal('');
    setTyping(true);
    window.setTimeout(() => setTyping(false), 1600);
  }

  function requestConnection(index = active) {
    setConversations(current => current.map((item, i) => i === index ? { ...item, state: 'Pending', last: 'Connection request pending' } : item));
    setNotice('Connection request sent. Messaging unlocks when your request is accepted.');
  }

  function react(messageId: string, reaction: string) {
    updateConversation(item => ({ ...item, messages: item.messages.map(message => message.id === messageId ? { ...message, reaction } : message) }));
  }

  function handleComposerKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  const externalContext = listing ? { label: `Regarding ${contextKind}`, title: listing, href: contextKind === 'event' ? '/events' : '/marketplace' } : conversation.context;

  return <div className="mli-messages relationship-messages">
    <div className="messages-head">
      <div><p className="kicker">Your network, in conversation</p><h1>Messages</h1></div>
      <div className="message-tools"><label><Search size={17} /><input aria-label="Search conversations" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search conversations" /></label><button className="primary-action" onClick={() => { setPersonSearch(''); setModal('New Message'); }}><MessageCircle size={17} />New Message</button></div>
    </div>

    <div className={`messages-layout ${mobileChat ? 'show-chat' : ''}`}>
      <aside className="conversation-rail">
        <div className="conversation-filters" aria-label="Conversation filters">{['All', 'Unread', 'Connections', 'Opportunities', 'Groups'].map(item => <button aria-pressed={filter === item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
        <div className="conversation-list social-conversation-list">
          {filtered.map(({ conversation, index, member }) => <button className={`${active === index ? 'active' : ''} ${conversation.unread ? 'unread' : ''}`} onClick={() => select(index)} key={conversation.id}>
            <PersonPhoto id={member.id} initials={member.initials} />
            <div><b>{member.name}</b><span>{member.role}</span><small>{conversation.state === 'Pending' ? 'Connection request pending' : conversation.last}</small></div>
            <em>{conversation.timestamp}</em>
            {conversation.context.kind === 'Opportunity' ? <BriefcaseBusiness size={14} /> : conversation.context.kind === 'Group' ? <Users size={14} /> : <span />}
          </button>)}
          {!filtered.length && <p className="conversation-empty">No conversations in this view.</p>}
        </div>
      </aside>

      <section className="chat-panel relationship-chat" aria-label={`Conversation with ${person.name}`}>
        <header>
          <button className="chat-back" aria-label="Back to conversations" onClick={() => setMobileChat(false)}><ArrowLeft size={20} /></button>
          <button className="chat-person-button" onClick={() => setModal('Profile Preview')}><PersonPhoto id={person.id} initials={person.initials} /></button>
          <button className="chat-title-button" onClick={() => setModal('Profile Preview')}><b>{person.name}</b><span>{person.role} · {person.location}</span></button>
          <span className={`connection-pill ${conversation.state.toLowerCase().replace(' ', '-')}`}>{conversation.state === 'Pending' ? 'Request pending' : conversation.state}</span>
        </header>

        <div className="chat-quick-actions">
          <Link href={`/profile/${person.id}`}>View Profile <ArrowRight size={13} /></Link>
          <button onClick={() => setModal('Why this connection makes sense')}><SparkLabel />Why this connection makes sense</button>
          <div className="chat-menu-anchor"><button aria-label="More conversation actions" aria-expanded={moreOpen} onClick={() => setMoreOpen(!moreOpen)}>More <MoreHorizontal size={16} /></button>{moreOpen && <div className="chat-popover">{['Conversation Info', 'Shared Media', 'Mute', 'Report', 'Block', 'Remove Connection'].map(item => <button key={item} onClick={() => { setMoreOpen(false); setModal(item); }}>{item}</button>)}</div>}</div>
        </div>

        <div className="chat-context-bar relationship-context"><span>{externalContext.label}: <b>{externalContext.title}</b></span><Link href={externalContext.href}>View {conversation.context.kind}<ArrowRight size={13} /></Link></div>

        <div className="chat-body relationship-chat-body" ref={bodyRef}>
          <p className="chat-system">You connected through {conversation.context.title}.</p>
          {connected && conversation.id === 0 && <p className="chat-system">Marcus accepted your connection request.</p>}
          <span className="chat-day">Today</span>
          {connected ? conversation.messages.length ? conversation.messages.map(message => <MessageBubble key={message.id} message={message} person={person} onReply={setReplyTo} onReact={react} playing={playing} setPlaying={setPlaying} />) : <EmptyChat setDraft={setDraft} /> : <LockedChat state={conversation.state} person={person} onRequest={() => requestConnection()} />}
          {connected && conversation.id === 2 && <SharedCard kind="Opportunity" title={opportunity.title} meta="May 24 · Manhattan · Strong Match" href="/opportunities" />}
          {typing && <p className="typing-state">{person.name.split(' ')[0]} is typing...</p>}
        </div>

        {notice && <p className="chat-notice" role="status">{notice}<button onClick={() => setNotice('')}>Dismiss</button></p>}
        {replyTo && <div className="reply-context"><span>Replying to {replyTo.sender === 'me' ? 'your message' : person.name.split(' ')[0]}</span><p>{replyTo.text}</p><button aria-label="Cancel reply" onClick={() => setReplyTo(null)}><X size={14} /></button></div>}
        <form className="chat-composer warm-composer" onSubmit={(event: FormEvent) => { event.preventDefault(); sendMessage(); }}>
          <div className="chat-menu-anchor"><button type="button" disabled={!connected} aria-label="Share attachment" aria-expanded={attachmentOpen} onClick={() => setAttachmentOpen(!attachmentOpen)}>+</button>{attachmentOpen && <AttachmentMenu onPick={kind => { setAttachmentOpen(false); setModal(kind); }} />}</div>
          <textarea aria-label="Write a message" value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={handleComposerKey} disabled={!connected} rows={1} placeholder={connected ? 'Write a message...' : 'Connect to enable messaging'} />
          <button type="button" aria-label="Voice message" disabled={!connected} onClick={() => setModal('Audio')}><Mic size={18} /></button>
          <button type="submit" aria-label="Send message" disabled={!connected || !draft.trim()}><Send size={18} /></button>
        </form>
        <p className="composer-hint">{connected ? 'Press Enter to send · Shift+Enter for a new line' : 'Messaging unlocks after your connection is accepted.'}</p>
      </section>
    </div>

    {modal && <MessageModal modal={modal} person={person} conversations={conversations} personSearch={personSearch} setPersonSearch={setPersonSearch} contactState={conversation.state} onClose={() => setModal('')} onSelect={select} onRequest={requestConnection} onSend={sendMessage} setNotice={setNotice} />}
  </div>;
}

function SparkLabel() {
  return <SparklesIcon />;
}

function SparklesIcon() {
  return <Music2 size={14} />;
}

function MessageBubble({ message, person, onReply, onReact, playing, setPlaying }: { message: Message; person: ReturnType<typeof memberById>; onReply: (message: Message) => void; onReact: (id: string, reaction: string) => void; playing: string; setPlaying: (id: string) => void }) {
  const mine = message.sender === 'me';
  return <div className={`message-row ${mine ? 'mine' : 'theirs'}`}>
    {!mine && <PersonPhoto id={person.id} initials={person.initials} />}
    <div className={`bubble ${mine ? 'mine' : 'theirs'}`}>
      {message.replyTo && <div className="quoted-reply">{message.replyTo}</div>}
      {message.type === 'Audio' ? <AudioMessage title={message.text} playing={playing === message.id} onPlay={() => setPlaying(playing === message.id ? '' : message.id)} /> : message.type && message.type !== 'text' ? <SharedMessage kind={message.type} text={message.text} /> : message.text}
      {message.reaction && <span className="message-reaction">{message.reaction}</span>}
      <time>{message.time}{mine && message.readState ? ` · ${message.readState}` : ''}</time>
      <div className="message-actions"><button onClick={() => onReply(message)}>Reply</button>{['Like', 'Love', 'Applaud'].map(item => <button key={item} onClick={() => onReact(message.id, item)}>{item}</button>)}<button>Copy</button><button>More</button></div>
    </div>
  </div>;
}

function AudioMessage({ title, playing, onPlay }: { title: string; playing: boolean; onPlay: () => void }) {
  return <div className="audio-message"><button aria-label={playing ? 'Pause audio preview' : 'Play audio preview'} onClick={onPlay}>{playing ? <Pause size={15} /> : <Play size={15} />}</button><div><b>{title}</b><span><i /><i /><i /><i /><i /><i /></span></div><small>{title.includes('Voice') ? '0:27' : '03:12'}</small></div>;
}

function SharedMessage({ kind, text }: { kind: Message['type']; text: string }) {
  const href = kind === 'Opportunity' ? '/opportunities' : kind === 'Event' ? '/events' : kind === 'Profile' ? '/profile/sarah-monroe' : kind === 'Group' ? '/community/live-events-touring' : kind === 'Service' ? '/marketplace' : '#';
  return <div className="shared-chat-card"><small>{kind}</small><b>{text}</b><p>{kind === 'Service' ? 'Brooklyn · From $75/hr' : kind === 'Event' ? 'May 18 · Brooklyn' : kind === 'Opportunity' ? 'May 24 · Manhattan · Strong Match' : kind === 'Group' ? '3.1K members' : 'Music Legacy network'}</p><Link href={href}>View {kind}<ArrowRight size={14} /></Link></div>;
}

function SharedCard({ kind, title, meta, href }: { kind: string; title: string; meta: string; href: string }) {
  return <div className="chat-opportunity shared-inline-card"><span>{kind}</span><b>{title}</b><p>{meta}</p><Link href={href}>View {kind}<ArrowRight size={14} /></Link></div>;
}

function EmptyChat({ setDraft }: { setDraft: (value: string) => void }) {
  return <div className="chat-first"><MessageCircle /><h2>You’re connected.</h2><p>Start a conversation about opportunities, collaboration, or shared interests.</p>{['Introduce yourself', 'Ask about availability', 'Share your showcase plans'].map((item, index) => <button key={item} onClick={() => setDraft(['Hi! I’m Alex, an independent artist based in New York.', 'Hi! What’s your availability this week?', 'I’m preparing for an upcoming showcase and would love your perspective.'][index])}>{item}</button>)}</div>;
}

function LockedChat({ state, person, onRequest }: { state: ConnectionState; person: ReturnType<typeof memberById>; onRequest: () => void }) {
  return <div className="chat-locked"><span><MessageCircle /></span><h2>{state === 'Pending' ? `Your request to ${person.name.split(' ')[0]} is pending.` : 'Connect first to start a conversation.'}</h2><p>{state === 'Pending' ? 'Messaging becomes available once the request is accepted.' : 'MLI conversations begin with a relationship.'}</p><div><Link href={`/profile/${person.id}`}>View Profile</Link>{state === 'Pending' ? <button disabled>Request Pending</button> : <button onClick={onRequest}>Connect First <ArrowRight size={14} /></button>}</div></div>;
}

function AttachmentMenu({ onPick }: { onPick: (kind: ShareKind) => void }) {
  const items: [ShareKind, React.ReactNode][] = [
    ['Photo / Video', <Camera size={15} key="photo" />],
    ['Audio', <Volume2 size={15} key="audio" />],
    ['File', <FileText size={15} key="file" />],
    ['Opportunity', <BriefcaseBusiness size={15} key="opportunity" />],
    ['Event', <CalendarDays size={15} key="event" />],
    ['Profile', <UserRound size={15} key="profile" />],
    ['Group', <Users size={15} key="group" />],
    ['Service', <Store size={15} key="service" />],
  ];
  return <div className="chat-popover attachment-popover rich-attachment-menu">{items.map(([label, icon]) => <button type="button" key={label} onClick={() => onPick(label)}>{icon}{label}</button>)}</div>;
}

function MessageModal({ modal, person, conversations, personSearch, setPersonSearch, contactState, onClose, onSelect, onRequest, onSend, setNotice }: {
  modal: string;
  person: ReturnType<typeof memberById>;
  conversations: Conversation[];
  personSearch: string;
  setPersonSearch: (value: string) => void;
  contactState: ConnectionState;
  onClose: () => void;
  onSelect: (index: number) => void;
  onRequest: (index?: number) => void;
  onSend: (text: string, type?: Message['type']) => void;
  setNotice: (value: string) => void;
}) {
  const modalKind = modal as ShareKind;
  return <div className="modal-backdrop" onClick={onClose}>
    <section className="detail-modal messaging-modal relationship-modal" role="dialog" aria-modal="true" aria-label={modal} onClick={event => event.stopPropagation()}>
      <button autoFocus className="modal-close" aria-label="Close dialog" onClick={onClose}><X /></button>
      {modal === 'New Message' && <><p className="kicker">New Message</p><h2>Who do you want to talk to?</h2><label className="member-search"><Search size={17} /><input autoFocus aria-label="Search people" placeholder="Search people" value={personSearch} onChange={event => setPersonSearch(event.target.value)} /></label><div>{conversations.map((conversation, index) => {
        const member = memberById(conversation.memberId);
        if (!`${member.name} ${member.role} ${conversation.context.title}`.toLowerCase().includes(personSearch.toLowerCase())) return null;
        return <button className="compose-member person-first-compose" key={member.id} onClick={() => conversation.state === 'Connected' ? onSelect(index) : onRequest(index)}><PersonPhoto id={member.id} initials={member.initials} /><span><b>{member.name}</b><small>{member.role} · {conversation.context.label} {conversation.context.title}</small></span><em>{conversation.state === 'Connected' ? 'Message' : conversation.state === 'Pending' ? 'Request Pending' : 'Connect First'}</em></button>;
      })}</div></>}
      {modal === 'Profile Preview' && <><p className="kicker">Profile Preview</p><div className="profile-preview-card"><PersonPhoto id={person.id} initials={person.initials} /><h2>{person.name}</h2><p>{person.role} · {person.location}</p><span>{contactState}</span><small>{person.reason}</small><Link className="primary-action" href={`/profile/${person.id}`}>View Profile <ArrowRight size={15} /></Link></div></>}
      {modal === 'Why this connection makes sense' && <><p className="kicker">Why this connection makes sense</p><h2>{person.name}</h2><p>You both work in independent music, share relevant professional interests, and are active around MLI conversations that can move your goals forward.</p><div className="why-fit-list"><span><Check size={15} /> Shared group or opportunity context</span><span><Check size={15} /> Similar live music and collaboration interests</span><span><Check size={15} /> Useful next step for your network</span></div></>}
      {['Conversation Info', 'Shared Media', 'Mute', 'Report', 'Block', 'Remove Connection'].includes(modal) && <InfoPanel modal={modal} person={person} />}
      {['Photo / Video', 'Audio', 'File', 'Opportunity', 'Event', 'Profile', 'Group', 'Service'].includes(modal) && <SharePanel kind={modalKind} onSend={onSend} onClose={onClose} setNotice={setNotice} />}
    </section>
  </div>;
}

function SharePanel({ kind, onSend, onClose, setNotice }: { kind: ShareKind; onSend: (text: string, type?: Message['type']) => void; onClose: () => void; setNotice: (value: string) => void }) {
  const content: Record<ShareKind, { title: string; text: string; icon: React.ReactNode }> = {
    'Photo / Video': { title: 'Photo / Video', text: 'Shared a photo/video preview (demo).', icon: <ImageIcon /> },
    Audio: { title: 'Demo Track', text: 'Voice Message', icon: <Volume2 /> },
    File: { title: 'Stage plot.pdf', text: 'Shared stage plot.pdf', icon: <FileText /> },
    Opportunity: { title: opportunity.title, text: opportunity.title, icon: <BriefcaseBusiness /> },
    Event: { title: 'Music Business Networking Night', text: 'Music Business Networking Night', icon: <CalendarDays /> },
    Profile: { title: 'Sarah Monroe', text: 'Sarah Monroe · Booking Agent', icon: <UserRound /> },
    Group: { title: 'Live Events & Touring', text: 'Live Events & Touring', icon: <Users /> },
    Service: { title: service.title, text: service.title, icon: <Store /> },
  };
  const item = content[kind];
  return <><p className="kicker">Share {kind}</p><h2>{item.title}</h2><div className="share-preview rich-share-preview">{item.icon}<span>{kind}</span><h3>{item.title}</h3><p>{kind === 'Audio' ? 'Voice Message · 0:27' : kind === 'Service' ? 'Brooklyn · From $75/hr' : 'Preview only · no backend upload'}</p></div><button className="primary-action" onClick={() => { onSend(item.text, kind === 'Photo / Video' ? 'Photo / Video' : kind); setNotice(`${kind} shared in this prototype.`); onClose(); }}>Share in conversation <ArrowRight size={15} /></button></>;
}

function InfoPanel({ modal, person }: { modal: string; person: ReturnType<typeof memberById> }) {
  if (modal !== 'Conversation Info') {
    const safety = ['Mute', 'Report', 'Block', 'Remove Connection'].includes(modal);
    return <><p className="kicker">{safety ? 'Safety' : 'Shared Media'}</p><h2>{modal}</h2><p>{safety ? `${modal} is simulated. No account or relationship changes were made.` : 'Photos, videos, audio, files, and shared links will appear here.'}</p><div className="shared-media-grid">{['Photos', 'Videos', 'Audio', 'Files', 'Links'].map(item => <span key={item}>{item}</span>)}</div></>;
  }
  return <><p className="kicker">Conversation Info</p><h2>{person.name}</h2><div className="conversation-info-list"><Link href={`/profile/${person.id}`}>Member profile <ArrowRight size={14} /></Link><Link href="/community/producers-engineers">Shared groups <ArrowRight size={14} /></Link><Link href="/events">Shared events <ArrowRight size={14} /></Link><Link href="/opportunities">Shared opportunities <ArrowRight size={14} /></Link></div><div className="safety-actions"><button><Bookmark size={14} /> Save Message</button><button><ShieldAlert size={14} /> Report</button><button>Mute</button><button>Block</button></div></>;
}
