'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowRight, BriefcaseBusiness, Check, Crown,
  PlayCircle, Sparkles, UserPlus, X, Zap,
} from 'lucide-react';
import { members, opportunities } from './mockData';

type JourneyAction = {
  id: string;
  title: string;
  category: 'PROFILE' | 'CONNECTION' | 'OPPORTUNITY' | 'EVENT' | 'SERVICE' | 'LEARNING';
  href: string;
  cta: string;
  why: string;
  timing?: string;
};
type JourneyStep = {
  internalTitle: string;
  displayTitle: string;
  status: 'Complete' | 'Current' | 'Coming next' | 'Coming later';
  description: string;
  why: string;
  criteria: string[];
  doneCount: number;
  unlock?: string;
  actions: JourneyAction[];
};

const profilePhotos: Record<string, string> = {
  'sarah-monroe': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=220&q=80',
  'marcus-lee': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=220&q=80',
  'jessica-reed': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=220&q=80',
};

const journeySteps: JourneyStep[] = [
  {
    internalTitle: 'Complete Bridging Profile',
    displayTitle: 'Know Your Direction',
    status: 'Complete',
    description: 'Define your current position, goals, challenges, and needs.',
    why: 'Bridging gives MLI the context used to shape your path.',
    criteria: ['Current position completed', 'Goals completed', 'Challenges completed', 'Needs completed'],
    doneCount: 4,
    actions: [{ id: 'review-bridging', title: 'Review Bridging Profile', category: 'LEARNING', href: '/bridging', cta: 'Review Bridging', why: 'Keeping goals current keeps recommendations relevant.' }],
  },
  {
    internalTitle: 'Build Professional Presence',
    displayTitle: 'Build Your Presence',
    status: 'Current',
    description: 'Make it easy for booking agents, venues, and collaborators to understand what you do and why you are ready.',
    why: 'Your Bridging profile shows that booking access is your biggest current challenge. A stronger professional presence makes upcoming applications more credible.',
    criteria: ['Add profile photo', 'Add bio', 'Add performance video', 'Add experience', 'Add availability'],
    doneCount: 2,
    actions: [
      { id: 'profile-media', title: 'Add one live performance video', category: 'PROFILE', timing: 'Today', href: '/profile/sarah-monroe', cta: 'Add Media', why: 'Booking agents and venues are more likely to engage when they can see you perform.' },
      { id: 'portfolio-proof', title: 'Add portfolio / proof of work', category: 'PROFILE', timing: 'This week', href: '/profile/sarah-monroe', cta: 'Update', why: 'Proof of work helps people quickly understand your readiness.' },
      { id: 'availability', title: 'Add May and June availability', category: 'PROFILE', href: '/profile/sarah-monroe', cta: 'Add Availability', why: 'Availability helps venues and collaborators decide whether to start a conversation.' },
    ],
  },
  {
    internalTitle: 'Make Relevant Connections',
    displayTitle: 'Meet the Right People',
    status: 'Coming next',
    description: 'Build relationships with booking agents, venue managers, and collaborators who fit your goals.',
    why: 'Relevant relationships create the pathway from readiness to opportunity.',
    criteria: ['Connect with Sarah Monroe', 'Join Live Events & Touring', 'Start one booking conversation'],
    doneCount: 1,
    unlock: 'Unlocks after Profile Ready: complete 4 of 5 profile actions.',
    actions: [
      { id: 'connect-sarah', title: 'Connect with Sarah Monroe', category: 'CONNECTION', href: '/profile/sarah-monroe', cta: 'Connect', why: 'Sarah is a booking agent in New York who works with independent artists.' },
      { id: 'join-live-group', title: 'Join Live Events & Touring', category: 'CONNECTION', href: '/community/live-events-touring', cta: 'Join Group', why: 'People in this group align with your booking and live-event goals.' },
      { id: 'message-intro', title: 'Start a conversation with Sarah', category: 'CONNECTION', href: '/messages?provider=Sarah%20Monroe&listing=Live%20Events%20%26%20Touring&intent=Start%20Conversation', cta: 'Message Sarah', why: 'Sarah accepted your request. Start while the relationship is warm.' },
    ],
  },
  {
    internalTitle: 'Apply to Opportunities',
    displayTitle: 'Pursue Opportunities',
    status: 'Coming later',
    description: 'Use your stronger profile and new connections to pursue showcases, gigs, and partnerships.',
    why: 'Live-performance opportunities directly support your primary goal.',
    criteria: ['Apply to one showcase', 'Apply to one local gig', 'RSVP to one industry event'],
    doneCount: 1,
    unlock: 'Opens when your profile is ready and one relevant connection is active.',
    actions: [
      { id: 'apply-cbs', title: 'Apply to CBS Studio Artist Showcase', category: 'OPPORTUNITY', href: '/opportunities', cta: 'Apply', why: 'Strong match for your current performance goal.' },
      { id: 'rsvp-networking', title: 'Attend Music Business Networking Night', category: 'EVENT', href: '/events', cta: 'RSVP', why: 'This event could help you meet booking professionals.' },
    ],
  },
  {
    internalTitle: 'Review Progress & Next Goals',
    displayTitle: 'Review & Advance',
    status: 'Coming later',
    description: 'Review responses, new relationships, completed actions, and the next goal.',
    why: 'FastTrack adapts as your goals, activity, and outcomes change.',
    criteria: ['Review applications sent', 'Track responses', 'Record events attended', 'Set next goal'],
    doneCount: 0,
    unlock: 'Unlocks as applications, events, and replies create real outcomes.',
    actions: [
      { id: 'release-service', title: 'View Release Campaign Strategy', category: 'SERVICE', href: '/marketplace?recommended=1', cta: 'View Service', why: 'Promotion support may help complete the next milestone.' },
    ],
  },
];

const outcomeMilestones = ['Direction Defined', 'Profile Ready', 'Network Activated', 'First Application', 'First Industry Response', 'First Opportunity Completed'];
const recentWins = ['May 10 · Completed your Bridging profile', 'May 12 · Connected with Sarah Monroe', 'May 14 · Applied to CBS Studio Showcase', 'May 18 · Attended Networking Night'];

export default function FastTrackContent() {
  const [checked, setChecked] = useState<Record<string, boolean>>({ 'review-bridging': true, 'portfolio-proof': true, 'connect-sarah': true });
  const [notice, setNotice] = useState('');
  const [modal, setModal] = useState('');
  const currentStep = journeySteps[1];
  const actionDone = Object.values(checked).filter(Boolean).length;
  const progress = Math.min(100, 20 + Math.max(0, actionDone - 3) * 5);
  const currentDone = currentStep.actions.filter(action => checked[action.id]).length + currentStep.doneCount;
  const stagePercent = Math.min(100, Math.round(currentDone / currentStep.criteria.length * 100));

  function toggleAction(action: JourneyAction) {
    setChecked(current => {
      const nextValue = !current[action.id];
      setNotice(nextValue ? `${action.title} complete. Your profile is stronger.` : `${action.title} reopened.`);
      return { ...current, [action.id]: nextValue };
    });
  }

  const weekly = useMemo(() => [
    currentStep.actions[0],
    journeySteps[2].actions[0],
    journeySteps[3].actions[0],
  ], [currentStep.actions]);

  return <div className="fasttrack-screen fasttrack-guide">
    <section className="guide-hero">
      <div>
        <p className="kicker">FastTrack</p>
        <h1>A guided path from where you are now to where you want to go.</h1>
        <p>Your Bridging profile becomes a focused path of meaningful actions, relationships, and opportunities.</p>
        <small>FastTrack adapts as your goals, activity, and outcomes change.</small>
      </div>
      <div className="guide-hero-card">
        <span>Current goal</span><b>Book more live performances</b>
        <span>Current focus</span><b>Build Professional Presence</b>
        <div><p>Step 2 of 5</p><p>{progress}% complete</p></div>
        <Link className="primary-action" href="#current-focus">Continue My Path <ArrowRight size={15} /></Link>
      </div>
    </section>

    {notice && <p className="fasttrack-notice" role="status">{notice}<button onClick={() => setNotice('')}>Dismiss</button></p>}

    <section className="outcome-journey" aria-label="Outcome milestones">
      {outcomeMilestones.map((milestone, index) => <span className={index < 2 ? 'done' : index === 2 ? 'current' : ''} key={milestone}>{index < 2 ? <Check size={14} /> : <i />}{milestone}</span>)}
    </section>

    <div className="guide-layout">
      <main>
        <section id="current-focus" className="current-stage-panel">
          <div className="current-stage-head">
            <div><p className="kicker">Current focus · Step 2 of 5</p><h2>{currentStep.displayTitle}</h2><small>{currentStep.internalTitle}</small></div>
            <div className="stage-progress" role="progressbar" aria-valuenow={stagePercent} aria-valuemin={0} aria-valuemax={100}><b>{currentStep.doneCount} of 5</b><span>actions complete</span><i><em style={{ width: `${stagePercent}%` }} /></i></div>
          </div>
          <p className="stage-description">{currentStep.description}</p>
          <div className="stage-why"><Sparkles size={17} /><div><b>Why this stage matters</b><p>{currentStep.why}</p></div></div>
          <NextBestAction action={currentStep.actions[0]} done={Boolean(checked[currentStep.actions[0].id])} onToggle={() => toggleAction(currentStep.actions[0])} />
          <section className="next-actions">
            <div className="section-heading-inline"><div><p className="kicker">Your next 3 actions</p><h3>Small steps that build momentum.</h3></div><button onClick={() => setModal('All Actions')}>View All Actions</button></div>
            {currentStep.actions.map(action => <GuideActionRow action={action} done={Boolean(checked[action.id])} onToggle={() => toggleAction(action)} key={action.id} />)}
          </section>
          <ThisWeek actions={weekly} />
        </section>

        <section className="simple-journey">
          <div className="section-heading-inline"><div><p className="kicker">Your roadmap</p><h2>The path ahead</h2></div></div>
          {journeySteps.map((step, index) => <JourneyRow step={step} index={index} key={step.internalTitle} />)}
        </section>

        <section className="coming-later-panel">
          <div><p className="kicker">Coming later</p><h2>3 opportunities already match your profile.</h2><p>These become part of your FastTrack when your profile is ready.</p></div>
          <Link href="/opportunities">Preview opportunities <ArrowRight size={14} /></Link>
        </section>
      </main>

      <aside className="guide-rail">
        <section className="your-path-card">
          <p className="kicker">Your path</p>
          <p><span>Goal</span><b>Book more live performances</b></p>
          <p><span>Current focus</span><b>Build Your Presence</b></p>
          <p><span>Next milestone</span><b>Profile Ready</b></p>
          <button onClick={() => setModal('View Progress')}>View Progress <ArrowRight size={14} /></button>
          <button onClick={() => setModal('Roadmap Settings')}>Roadmap Settings</button>
        </section>
        <section className="guide-coming-up">
          <p className="kicker">Coming up</p>
          <MiniPerson />
          <MiniOpportunity />
        </section>
        <section className="small-pro-note">
          <Crown size={16} /><p>Priority opportunity matching is available with Pro Silver.</p><Link href="/membership">Compare Memberships</Link>
        </section>
      </aside>
    </div>

    {modal && <FastTrackModal modal={modal} checked={checked} onClose={() => setModal('')} onToggle={toggleAction} />}
  </div>;
}

function NextBestAction({ action, done, onToggle }: { action: JourneyAction; done: boolean; onToggle: () => void }) {
  return <section className={`next-best-guide ${done ? 'done' : ''}`}>
    <div><Zap size={20} /><p className="kicker">Next best action</p><h3>{done ? 'Performance video added' : action.title}</h3><p>{done ? 'Your profile is stronger.' : action.why}</p></div>
    <div><button onClick={onToggle}>{done ? <Check size={15} /> : <PlayCircle size={15} />}{done ? 'Done' : 'Mark done'}</button><Link href={action.href}>{action.cta} <ArrowRight size={14} /></Link></div>
  </section>;
}

function GuideActionRow({ action, done, onToggle }: { action: JourneyAction; done: boolean; onToggle: () => void }) {
  return <article className={`guide-action-row ${done ? 'done' : ''}`}>
    <button aria-label={`${done ? 'Reopen' : 'Complete'} ${action.title}`} aria-pressed={done} onClick={onToggle}>{done ? <Check size={15} /> : <span />}</button>
    <div><span>{action.category}{action.timing ? ` · ${action.timing}` : ''}</span><b>{done ? action.title.replace('Add one live performance video', 'Performance video added') : action.title}</b></div>
    <Link href={action.href}>{action.cta}</Link>
  </article>;
}

function ThisWeek({ actions }: { actions: JourneyAction[] }) {
  const icons = [PlayCircle, UserPlus, BriefcaseBusiness];
  return <section className="week-moment">
    <p className="kicker">This week</p>
    <div>{actions.map((action, index) => { const Icon = icons[index]; return <Link href={action.href} key={action.id}><Icon size={17} /><span>{action.category}</span><b>{action.title}</b></Link>; })}</div>
  </section>;
}

function JourneyRow({ step, index }: { step: JourneyStep; index: number }) {
  const state = step.status === 'Complete' ? 'complete' : step.status === 'Current' ? 'current' : 'preview';
  return <article className={`journey-row ${state}`}>
    <span>{step.status === 'Complete' ? <Check size={16} /> : String(index + 1).padStart(2, '0')}</span>
    <div><small>Step {index + 1}</small><h3>{step.displayTitle}</h3><p>{step.internalTitle}</p>{step.status !== 'Current' && <em>{step.status === 'Complete' ? 'Complete' : step.unlock ?? 'Preview available'}</em>}</div>
    {step.status === 'Coming next' && <Link href="/profile/sarah-monroe">Preview <ArrowRight size={14} /></Link>}
  </article>;
}

function MiniPerson() {
  const person = members[0];
  return <article className="mini-human-card"><img src={profilePhotos[person.id]} alt="" /><div><b>{person.name}</b><span>{person.role}</span><p>Relevant to your goal of booking more live performances.</p></div><Link href={`/profile/${person.id}`}>Connect</Link></article>;
}

function MiniOpportunity() {
  const item = opportunities[0];
  return <article className="mini-opportunity-card"><BriefcaseBusiness size={18} /><div><b>{item.title}</b><span>Strong match for your current performance goal.</span></div><Link href="/opportunities">Apply</Link></article>;
}

function FastTrackModal({ modal, checked, onClose, onToggle }: { modal: string; checked: Record<string, boolean>; onClose: () => void; onToggle: (action: JourneyAction) => void }) {
  return <div className="modal-backdrop" onClick={onClose}>
    <section className="detail-modal fasttrack-guide-modal" role="dialog" aria-modal="true" aria-label={modal} onClick={event => event.stopPropagation()}>
      <button autoFocus className="modal-close" aria-label="Close dialog" onClick={onClose}><X /></button>
      {modal === 'View Progress' && <ProgressDrawer />}
      {modal === 'Roadmap Settings' && <RoadmapSettings />}
      {modal === 'All Actions' && <AllActions checked={checked} onToggle={onToggle} />}
    </section>
  </div>;
}

function ProgressDrawer() {
  return <>
    <p className="kicker">Your momentum</p><h2>View Progress</h2>
    <div className="progress-detail-grid">{[['Profile', '80%'], ['Connections made', '4'], ['Applications', '3'], ['Responses', '1'], ['Events attended', '2'], ['Opportunities completed', '0']].map(([label, value]) => <p key={label}><span>{label}</span><b>{value}</b></p>)}</div>
    <h3>Recent Wins</h3>
    <div className="recent-wins">{recentWins.map(win => <p key={win}><Check size={15} />{win}</p>)}</div>
  </>;
}

function RoadmapSettings() {
  return <>
    <p className="kicker">Profile context</p><h2>Your path: Artist / Musician</h2>
    <p>Your member type and goals are shaped in Bridging. Update Bridging when your direction changes.</p>
    <div className="settings-context"><p><span>Primary goal</span><b>Book more live performances</b></p><p><span>Secondary goals</span><b>Grow audience · improve promotion · build industry connections</b></p><p><span>Current stage</span><b>Build Professional Presence</b></p></div>
    <Link className="primary-action" href="/bridging">Update Bridging Profile <ArrowRight size={15} /></Link>
  </>;
}

function AllActions({ checked, onToggle }: { checked: Record<string, boolean>; onToggle: (action: JourneyAction) => void }) {
  const actions = journeySteps.flatMap(step => step.actions);
  return <>
    <p className="kicker">All Actions</p><h2>Everything on your current roadmap</h2>
    <div className="all-actions-list">{actions.map(action => <GuideActionRow action={action} done={Boolean(checked[action.id])} onToggle={() => onToggle(action)} key={action.id} />)}</div>
  </>;
}
