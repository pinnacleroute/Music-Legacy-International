'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo, Fragment } from 'react';
import {
  ArrowRight, Check, ChevronDown, ChevronUp, Crown, Eye,
  Lock, ShieldCheck, Sparkles, X, Briefcase, Building2,
} from 'lucide-react';
import {
  tiers,
  comparisonFeatureGroups,
  comparisonLegend,
  billingOptions,
  processingFeeNotice,
  whatChangesWithProSilver,
  fastTrackSteps,
  membershipFaqs,
  getRecommendedPlan,
} from '@/src/data/membership';

export default function MembershipContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source') || '';

  // Contextual messaging when coming from other screens
  const sourceContext = useMemo(() => {
    switch (source) {
      case 'fasttrack':
        return {
          title: 'FastTrack Upgrade Context',
          message: 'Full FastTrack guidance, guided milestones, and booking actions are included with Pro Silver.',
          targetPlan: 'Pro Silver',
        };
      case 'opportunities':
        return {
          title: 'Opportunity Access Context',
          message: 'Personalized matching, fit breakdowns, and priority showcase access are unlocked with Pro Silver.',
          targetPlan: 'Pro Silver',
        };
      case 'groups':
        return {
          title: 'Community Group Context',
          message: 'This curated industry group is available to Pro Silver and above.',
          targetPlan: 'Pro Silver',
        };
      case 'events':
        return {
          title: 'Event Access Context',
          message: 'Priority showcase registration and performer applications are included with Pro Silver.',
          targetPlan: 'Pro Silver',
        };
      case 'profile':
        return {
          title: 'Introduction & Advisory Context',
          message: 'Custom agreements, VIP showcase access, and strategic exposure are included with Pro Platinum.',
          targetPlan: 'Pro Platinum',
        };
      default:
        return null;
    }
  }, [source]);

  const currentMemberType = 'Artist / Musician';
  const recommendation = useMemo(() => getRecommendedPlan(currentMemberType), [currentMemberType]);

  const [billing, setBilling] = useState<'Monthly' | 'Annual'>('Monthly');
  const [selectedPlanName, setSelectedPlanName] = useState<string>(
    sourceContext?.targetPlan || recommendation.recommendedName
  );
  const [whyProOpen, setWhyProOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [fastTrackModalOpen, setFastTrackModalOpen] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [statusNotice, setStatusNotice] = useState<string>('');

  const currentPlanName = 'Fan';

  function handleChoosePlan(planName: string) {
    setSelectedPlanName(planName);
    const plan = tiers.find(t => t.name === planName);
    const feeText = billing === 'Annual' ? 'free processing on annual plan' : '$5 processing fee per invoice';
    setStatusNotice(
      `You’ve selected ${planName} (${plan?.price}${plan?.period ? plan.period : ''} · ${feeText}). In this prototype, billing remains simulated.`
    );
  }

  const displayedFaqs = showAllFaqs ? membershipFaqs : membershipFaqs.slice(0, 5);

  const creativeTiers = tiers.filter(t => t.group === 'Personal / Creative Memberships');
  const businessTiers = tiers.filter(t => t.group === 'Professional / Business Access');

  return (
    <div className="membership-screen">
      {/* 1 & 2. Simplified Human Hero */}
      <section className="membership-hero" aria-labelledby="membership-heading">
        <span className="membership-pill-badge">
          <Sparkles size={13} />
          <span>Membership built around MLI outcomes</span>
        </span>
        <h1 id="membership-heading">Choose How Far You Want to Go</h1>
        <p className="membership-subtitle">
          Choose the level of access, visibility, and support that fits where you want to go next.
        </p>
        <span className="membership-tagline">
          MLI recommends a plan based on your current goals and needs.
        </span>

        {/* Contextual Banner if arriving from another screen */}
        {sourceContext && (
          <div className="membership-source-banner" role="status">
            <span className="source-tag">{sourceContext.title}</span>
            <p>{sourceContext.message}</p>
          </div>
        )}

        {/* Hero Status Row */}
        <div className="membership-topline">
          <div className="topline-card current">
            <span className="topline-label">CURRENT PLAN</span>
            <div className="topline-badge-row">
              <span className="membership-badge membership-badge-fan">Fan</span>
            </div>
            <p>You’re currently on the Free Fan tier.</p>
          </div>

          <div className="topline-card recommended">
            <span className="topline-label">RECOMMENDED FOR YOU</span>
            <div className="topline-badge-row">
              <span className="membership-badge membership-badge-pro-silver">Pro Silver</span>
              <button
                type="button"
                className="why-pro-link"
                onClick={() => setWhyProOpen(!whyProOpen)}
                aria-expanded={whyProOpen}
                aria-controls="why-pro-panel"
              >
                {whyProOpen ? 'Close Why Pro Silver' : 'Why Pro Silver?'}
                {whyProOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
            <p>Best fit for your current goal: <strong>Book more live performances</strong>.</p>
          </div>

          <div className="topline-card billing-box">
            <span className="topline-label">BILLING &amp; PROCESSING</span>
            <div className="billing-toggle" role="radiogroup" aria-label="Billing cycle">
              {billingOptions.map(option => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={billing === option}
                  className={billing === option ? 'active' : ''}
                  onClick={() => setBilling(option as 'Monthly' | 'Annual')}
                >
                  <span>{option}</span>
                  {option === 'Annual' ? (
                    <small>Free processing</small>
                  ) : (
                    <small>$5 fee / invoice</small>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Source Processing Fee Disclosure */}
        <div className="processing-fee-disclosure-strip" role="note">
          <ShieldCheck size={15} />
          <span>{processingFeeNotice}</span>
        </div>

        {/* Subtle Member Path Indicator */}
        <div className="membership-path-bar">
          <span>Your membership path is personalized for: <strong>{currentMemberType}</strong></span>
          <Link href="/bridging" className="update-profile-link">
            Update Profile &amp; Goals <ArrowRight size={13} />
          </Link>
        </div>

        {/* Humanized "Why Pro Silver Fits You" Expandable Panel */}
        {whyProOpen && (
          <div id="why-pro-panel" className="why-pro-container" role="region" aria-label="Why Pro Silver fits you">
            <div className="why-pro-header">
              <Sparkles size={16} className="gold-icon" />
              <div>
                <h3>Why Pro Silver Fits You</h3>
                <p>Because booking, live performance, and collaboration are priorities for you right now.</p>
              </div>
            </div>

            <div className="why-pro-grid">
              <div className="why-pro-col">
                <span className="col-label">You’re currently focused on:</span>
                <ul>
                  {recommendation.fit.focusNeeds.map((need: string) => (
                    <li key={need}><Check size={14} /> {need}</li>
                  ))}
                </ul>
              </div>

              <div className="why-pro-col highlight">
                <span className="col-label">Pro Silver unlocks:</span>
                <ul>
                  <li><Check size={14} /> Fast Track Program with guided milestones</li>
                  <li><Check size={14} /> Expanded content &amp; media uploads (sell content)</li>
                  <li><Check size={14} /> Priority artist spotlights &amp; interview features</li>
                  <li><Check size={14} /> Collaboration projects &amp; revenue split agreements</li>
                  <li><Check size={14} /> Priority showcase &amp; live-event access</li>
                </ul>
              </div>
            </div>

            <div className="why-pro-example">
              <strong>Real-world fit:</strong>
              <span>See why CBS Studio Artist Showcase matches your profile (95% match) and connect with booking agent Sarah Monroe.</span>
            </div>
          </div>
        )}
      </section>

      {/* Simulated Notification Notice */}
      {statusNotice && (
        <div className="membership-notice" role="status">
          <p>{statusNotice}</p>
          <button type="button" onClick={() => setStatusNotice('')} aria-label="Dismiss notice">
            Dismiss
          </button>
        </div>
      )}

      {/* 6-Node Subtle Progression Track */}
      <nav className="membership-progression-track" aria-label="Membership progression">
        <div className="track-node current">
          <span className="node-step">1</span>
          <div>
            <b>Fan</b>
            <small>Explore</small>
          </div>
        </div>
        <span className="track-arrow">→</span>
        <div className="track-node">
          <span className="node-step">2</span>
          <div>
            <b>Fan / Audiophile</b>
            <small>Deeper Access</small>
          </div>
        </div>
        <span className="track-arrow">→</span>
        <div className="track-node target highlight">
          <span className="node-step">3</span>
          <div>
            <b>Pro Silver</b>
            <small>Career Growth</small>
          </div>
        </div>
        <span className="track-arrow">→</span>
        <div className="track-node">
          <span className="node-step">4</span>
          <div>
            <b>Pro Gold</b>
            <small>Business / Vendor</small>
          </div>
        </div>
        <span className="track-arrow">→</span>
        <div className="track-node">
          <span className="node-step">5</span>
          <div>
            <b>Pro Platinum</b>
            <small>Premium / Custom</small>
          </div>
        </div>
        <span className="track-arrow">→</span>
        <div className="track-node">
          <span className="node-step">6</span>
          <div>
            <b>VIP / Alliance</b>
            <small>Strategic Access</small>
          </div>
        </div>
      </nav>

      {/* Streamlined Plan Cards grouped cleanly into 2 readable rows */}
      <section className="membership-plans-container" aria-label="Available Membership Plans">
        {/* Group 1: Personal / Creative Memberships */}
        <div className="membership-group-block">
          <div className="group-title-row">
            <div className="group-title-left">
              <Sparkles size={16} className="gold-icon" />
              <h3>Personal &amp; Creative Memberships</h3>
            </div>
            <p>From community discovery to accelerated artist career momentum.</p>
          </div>

          <div className="plan-grid membership-plan-grid">
            {creativeTiers.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                currentPlanName={currentPlanName}
                selectedPlanName={selectedPlanName}
                onChoose={handleChoosePlan}
                onCompare={() => setCompareModalOpen(true)}
              />
            ))}
          </div>
        </div>

        {/* Group 2: Professional, Business & Strategic Access */}
        <div className="membership-group-block" style={{ marginTop: '32px' }}>
          <div className="group-title-row">
            <div className="group-title-left">
              <Building2 size={16} className="gold-icon" />
              <h3>Professional, Business &amp; Strategic Access</h3>
            </div>
            <p>Commercial visibility, vendor listings, premium exposure, and executive alliances.</p>
          </div>

          <div className="plan-grid membership-plan-grid">
            {businessTiers.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                currentPlanName={currentPlanName}
                selectedPlanName={selectedPlanName}
                onChoose={handleChoosePlan}
                onCompare={() => setCompareModalOpen(true)}
              />
            ))}
          </div>
        </div>

        {/* Actions Row with Reassurance & Fee note */}
        <div className="membership-actions-row">
          <button
            type="button"
            className="secondary-action compare-all-btn"
            onClick={() => setCompareModalOpen(true)}
          >
            Compare all 6 memberships <ArrowRight size={14} />
          </button>
          <span className="reassurance-note">
            <ShieldCheck size={14} /> You can change your plan later at any time.
          </span>
        </div>
      </section>

      {/* "What Changes with Pro Silver?" Before & After Preview */}
      <section className="what-changes-section" aria-labelledby="what-changes-heading">
        <div className="section-head-clean">
          <span className="kicker">Clear Progression</span>
          <h2 id="what-changes-heading">What Changes with Pro Silver?</h2>
          <p>A tangible preview of how upgrading moves you from passive browsing to guided momentum.</p>
        </div>

        <div className="changes-grid">
          {whatChangesWithProSilver.map(item => (
            <article key={item.category} className="change-row-card">
              <div className="change-category">
                <strong>{item.category}</strong>
              </div>
              <div className="change-before">
                <span className="change-tag before">Before Pro Silver</span>
                <p>{item.before}</p>
              </div>
              <div className="change-arrow-icon">→</div>
              <div className="change-after">
                <span className="change-tag after">With Pro Silver</span>
                <p>{item.after}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="matched-preview-callout">
          <Sparkles size={16} className="gold-icon" />
          <div>
            <b>3 live opportunities already match your profile</b>
            <p>Including CBS Studio Artist Showcase (95% match) and the Manhattan Songwriters Circle.</p>
          </div>
          <button
            type="button"
            className="clean-text-btn"
            onClick={() => handleChoosePlan('Pro Silver')}
          >
            Unlock Matches with Pro Silver <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* Single Focused FastTrack Promotion Section */}
      <section className="membership-banner-refined" aria-labelledby="fasttrack-banner-heading">
        <div className="banner-copy">
          <span className="kicker">YOUR RECOMMENDED PATH</span>
          <h2 id="fasttrack-banner-heading">Unlock your personalized FastTrack plan with Pro Silver.</h2>
          <p>
            FastTrack turns your Bridging profile into guided next steps, relevant connections, and opportunity recommendations.
          </p>
        </div>

        <div className="banner-actions">
          <button
            type="button"
            className="preview-fasttrack-btn"
            onClick={() => setFastTrackModalOpen(true)}
          >
            <Eye size={15} /> Preview FastTrack
          </button>
          <button
            type="button"
            className="gold-action"
            onClick={() => handleChoosePlan('Pro Silver')}
          >
            Choose Pro Silver ($29.99) <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Compact Human FAQ */}
      <section className="membership-faq-refined" aria-labelledby="faq-heading">
        <div className="section-head-clean">
          <span className="kicker">Clear Answers</span>
          <h2 id="faq-heading">Membership Questions</h2>
          <p>Straightforward answers about plan flexibility, invoice processing, and support.</p>
        </div>

        <div className="faq-list">
          {displayedFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <article key={faq.question} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isOpen && (
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="faq-footer-action">
          <button
            type="button"
            className="toggle-faqs-btn"
            onClick={() => setShowAllFaqs(!showAllFaqs)}
          >
            {showAllFaqs ? 'Show Fewer Questions' : 'View More FAQs'}
          </button>
        </div>
      </section>

      {/* "Compare All Memberships" Modal / Full Feature Matrix */}
      {compareModalOpen && (
        <div className="modal-backdrop" onClick={() => setCompareModalOpen(false)}>
          <section
            className="detail-modal membership-compare-modal-refined"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="compare-modal-title"
          >
            <div className="modal-header-row">
              <div>
                <span className="kicker">Complete Feature Matrix</span>
                <h2 id="compare-modal-title">Compare All Memberships</h2>
                <p>Full entitlement breakdown across all six MLI membership tiers.</p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                className="modal-close"
                onClick={() => setCompareModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Source Processing Fee Note in Modal */}
            <div className="modal-fee-banner">
              <ShieldCheck size={15} />
              <span>{processingFeeNotice}</span>
            </div>

            {/* Comparison Matrix Table */}
            <div className="comparison-table-wrapper">
              <table className="refined-compare-table">
                <thead>
                  <tr>
                    <th scope="col" className="category-header">Capability / Access</th>
                    <th scope="col" className="tier-col">
                      <span>Fan</span>
                      <small>FREE</small>
                    </th>
                    <th scope="col" className="tier-col">
                      <span>Fan / Audiophile</span>
                      <small>$19.95</small>
                    </th>
                    <th scope="col" className="tier-col highlight-col">
                      <span>Pro Silver</span>
                      <small className="highlight-gold">$29.99 (Recommended)</small>
                    </th>
                    <th scope="col" className="tier-col">
                      <span>Pro Gold</span>
                      <small>$49.99+ (Business)</small>
                    </th>
                    <th scope="col" className="tier-col">
                      <span>Pro Platinum</span>
                      <small>$99.99+</small>
                    </th>
                    <th scope="col" className="tier-col">
                      <span>VIP / Alliance</span>
                      <small>$495</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatureGroups.map(group => (
                    <Fragment key={group.id}>
                      <tr className="group-separator-row">
                        <th colSpan={7} className="group-category-title">
                          {group.category}
                        </th>
                      </tr>
                      {group.features.map(feat => (
                        <tr key={feat.name}>
                          <th scope="row" className="capability-name">{feat.name}</th>
                          <td>
                            <span className={`matrix-pill ${formatAccessClass(feat.fan)}`}>
                              {feat.fan}
                            </span>
                          </td>
                          <td>
                            <span className={`matrix-pill ${formatAccessClass(feat['fan-audiophile'])}`}>
                              {feat['fan-audiophile']}
                            </span>
                          </td>
                          <td className="highlight-col">
                            <span className={`matrix-pill ${formatAccessClass(feat['pro-silver'])}`}>
                              {feat['pro-silver']}
                            </span>
                          </td>
                          <td>
                            <span className={`matrix-pill ${formatAccessClass(feat['pro-gold'])}`}>
                              {feat['pro-gold']}
                            </span>
                          </td>
                          <td>
                            <span className={`matrix-pill ${formatAccessClass(feat['pro-platinum'])}`}>
                              {feat['pro-platinum']}
                            </span>
                          </td>
                          <td>
                            <span className={`matrix-pill ${formatAccessClass(feat['vip-alliance'])}`}>
                              {feat['vip-alliance']}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Comparison Terminology Legend */}
            <div className="comparison-legend-box">
              <span className="legend-title">Access Terminology Legend</span>
              <div className="legend-grid">
                {comparisonLegend.map(item => (
                  <div key={item.term} className="legend-item">
                    <span className={`matrix-pill ${formatAccessClass(item.term)}`}>{item.term}</span>
                    <small>{item.desc}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="compare-modal-footer">
              <span>Need guidance? All plans can be adjusted as your career evolves.</span>
              <button
                type="button"
                className="primary-action gold-action"
                onClick={() => {
                  handleChoosePlan('Pro Silver');
                  setCompareModalOpen(false);
                }}
              >
                Choose Pro Silver ($29.99/mo) <ArrowRight size={14} />
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Visual FastTrack Preview Modal */}
      {fastTrackModalOpen && (
        <div className="modal-backdrop" onClick={() => setFastTrackModalOpen(false)}>
          <section
            className="detail-modal fasttrack-preview-modal-refined"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fasttrack-modal-title"
          >
            <div className="modal-header-row">
              <div>
                <span className="kicker">FastTrack Career Roadmap</span>
                <h2 id="fasttrack-modal-title">Five-Stage Growth Preview</h2>
                <p>Designed around your goal: <strong>Book more live performances</strong>.</p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                className="modal-close"
                onClick={() => setFastTrackModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="fasttrack-steps-timeline">
              {fastTrackSteps.map(stepItem => (
                <div key={stepItem.step} className={`step-card-visual ${stepItem.status}`}>
                  <div className="step-num-badge">
                    {stepItem.status === 'completed' ? (
                      <Check size={14} />
                    ) : stepItem.status === 'locked' ? (
                      <Lock size={12} />
                    ) : (
                      stepItem.step
                    )}
                  </div>
                  <div className="step-details">
                    <div className="step-head-row">
                      <h4>Stage {stepItem.step}: {stepItem.title}</h4>
                      <span className={`status-pill ${stepItem.status}`}>
                        {stepItem.status === 'completed'
                          ? 'Completed'
                          : stepItem.status === 'in-progress'
                          ? 'In Progress'
                          : 'Unlocked with Pro Silver'}
                      </span>
                    </div>
                    <p>{stepItem.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="fasttrack-modal-callout">
              <Sparkles size={16} className="gold-icon" />
              <p>Full personalized guidance, weekly actions, and opportunity matching are included with Pro Silver.</p>
            </div>

            <div className="modal-actions-right">
              <button
                type="button"
                className="secondary-action"
                onClick={() => setFastTrackModalOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="primary-action gold-action"
                onClick={() => {
                  handleChoosePlan('Pro Silver');
                  setFastTrackModalOpen(false);
                }}
              >
                Unlock Roadmap with Pro Silver <ArrowRight size={14} />
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

// Plan Card Component
function PlanCard({
  plan,
  billing,
  currentPlanName,
  selectedPlanName,
  onChoose,
  onCompare,
}: {
  plan: (typeof tiers)[number];
  billing: 'Monthly' | 'Annual';
  currentPlanName: string;
  selectedPlanName: string;
  onChoose: (name: string) => void;
  onCompare: () => void;
}) {
  const isCurrent = plan.name === currentPlanName;
  const isSelected = selectedPlanName === plan.name;
  const isRecommended = Boolean(plan.isRecommended);
  const isBusiness = plan.audience === 'Business / Vendor';
  const isVIP = plan.id === 'vip-alliance';

  return (
    <article
      className={`plan-card membership-plan-card ${isRecommended ? 'recommended' : ''} ${
        isVIP ? 'vip-tier' : ''
      } ${isSelected ? 'selected' : ''} ${isCurrent ? 'is-current' : ''}`}
    >
      {isRecommended && (
        <span className="recommend-flag">{plan.recommendationBadge || 'BEST FIT FOR YOU'}</span>
      )}

      <div className="plan-card-top">
        <div className="plan-card-head">
          <span className={`membership-badge membership-badge-${plan.id}`}>
            {plan.name}
          </span>
          {isCurrent && <span className="current-badge-pill">Current Plan</span>}
          {plan.audience && (
            <span className="audience-pill">
              {isBusiness ? <Briefcase size={12} /> : <Crown size={12} />} {plan.audience}
            </span>
          )}
        </div>

        <div className="plan-pricing-block">
          <h2>
            {plan.displayPrice}
            {plan.period && <span>{plan.period}</span>}
          </h2>
          <p className="fee-note-inline">
            {billing === 'Annual' ? 'Free processing on annual billing' : '$5 fee per invoice'}
          </p>
        </div>

        <p className="plan-tagline">{plan.positioning}</p>

        <div className="plan-best-fit">
          <strong>Best for:</strong> {plan.bestFor}
        </div>
      </div>

      <hr className="plan-divider" />

      {/* 4-6 representative benefits */}
      <div className="plan-benefits-list">
        <span className="benefits-label">Includes:</span>
        <ul>
          {plan.keyBenefits.map(benefit => (
            <li key={benefit}>
              <Check size={14} className="benefit-check" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Actions */}
      <div className="plan-card-actions">
        {isCurrent ? (
          <button type="button" className="plan-btn current" disabled>
            Current Plan
          </button>
        ) : (
          <button
            type="button"
            className={`plan-btn ${isRecommended ? 'primary-action gold-action' : 'secondary-action'}`}
            onClick={() => onChoose(plan.name)}
          >
            {isSelected ? `Selected · ${plan.name}` : plan.cta}
            <ArrowRight size={14} />
          </button>
        )}

        <button
          type="button"
          className="view-full-benefits-btn"
          onClick={onCompare}
        >
          View Full Benefits
        </button>
      </div>
    </article>
  );
}

function formatAccessClass(val: string) {
  if (val === 'Included' || val === 'VIP') return 'status-included';
  if (val === 'Not Included') return 'status-not-included';
  if (val === 'Priority' || val === 'Featured' || val === 'Premium' || val === 'Expanded') {
    return 'status-priority';
  }
  if (val === 'Custom') return 'status-custom';
  if (val === 'Prelaunch') return 'status-prelaunch';
  return 'status-limited'; // Limited, Standard, Pay per download
}
