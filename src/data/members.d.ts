export interface MemberExperience {
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlight: string;
}

export interface MemberPortfolioItem {
  id: string;
  title: string;
  type: 'Video' | 'Document' | 'Schedule' | 'Press' | 'Audio';
  subtitle: string;
  thumbnail: string;
  description: string;
  details?: string;
  date?: string;
}

export interface MemberRecommendation {
  author: string;
  role: string;
  avatar: string;
  initials: string;
  tone: string;
  quote: string;
  relationship: string;
}

export interface MemberSocialPost {
  id: string;
  time: string;
  content: string;
  tag: string;
  likes: number;
  replies: number;
  visual?: string;
}

export interface MemberData {
  id: string;
  name: string;
  initials: string;
  tone: string;
  photo: string;
  cover: string;
  role: string;
  memberType: string;
  location: string;
  timezone: string;
  membership: string;
  trustStatus: string;
  availability: string;
  availabilityDetail: string;
  responseTime: string;
  headline: string;
  bio: string;
  trustFacts: { value: string; label: string }[];
  snapshot: {
    experience: string;
    focus: string;
    market: string;
    specialties: string[];
  };
  skills: string[];
  genres: string[];
  experience: MemberExperience[];
  portfolio: MemberPortfolioItem[];
  links: { label: string; url: string; type: string }[];
  lookingFor: string[];
  availableFor: string[];
  groups: { id: string; name: string; relevance: string; members: string }[];
  events: { id: string; title: string; date: string; time: string; location: string }[];
  opportunities: { id: string; title: string; compensation: string; matchFit: string; type: string }[];
  services: { title: string; category: string; pricing: string; description: string }[];
  recommendations: MemberRecommendation[];
  activity: { id: string; type: string; title: string; time: string }[];
  socialPosts: MemberSocialPost[];
  followersCount: string;
  followingCount: string;
  connectionsCount: string;
  specialty?: string;
  reason?: string;
}

export interface RelationshipContext {
  targetMemberId: string;
  matchScore: number;
  matchFitLabel: string;
  fitHeadline: string;
  matchReasons: string[];
  sharedSignals: { title: string; detail: string; verified: boolean }[];
  mutualConnections: { id: string; name: string; role: string; location: string; photo: string; initials: string; tone: string }[];
  sharedGroups: string[];
  sharedEvents: string[];
  sharedOpportunities: string[];
  bridgingRelevance: string;
  fastTrackRelevance: string;
  fastTrackGoal: string;
  socialProof: string[];
  connectionStatus: 'Connect' | 'Request Sent' | 'Connected';
  followStatus: boolean;
}

export declare const members: MemberData[];
export declare function getRelationshipContext(targetMemberId: string, currentUserId?: string): RelationshipContext;
export declare function getMemberById(id: string): MemberData;
