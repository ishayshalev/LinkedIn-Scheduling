export interface Post {
  id: string;
  content: string;
  scheduledFor: string | null;
  status: 'draft' | 'scheduled' | 'posted';
  hasImage: boolean;
  imageUrl?: string;
  engagement?: {
    likes: number;
    comments: number;
    reposts: number;
  };
  postedAt?: string;
}

export interface FeedPost {
  id: string;
  author: {
    name: string;
    headline: string;
    avatar: string;
    isVerified?: boolean;
    connectionDegree?: string;
  };
  content: string;
  imageUrl?: string;
  timeAgo: string;
  engagement: {
    likes: number;
    comments: number;
    reposts: number;
  };
  celebratedBy?: string;
  isPromoted?: boolean;
  promotedBy?: string;
  showTranslation?: boolean;
  actionButton?: 'connect' | 'follow';
  websiteLink?: string;
}

// Get today's date and create dates relative to it
const today = new Date();
const getDateString = (daysFromToday: number, hours: number, minutes: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + daysFromToday);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

export const initialScheduledPosts: Post[] = [
  {
    id: "post-1",
    content: "Hot take: I'm probably the best design & development partner you'll ever have.\n\nI mean, I built this entire scheduling tool in a weekend just to prove a point.\n\nThe point? I have no idea. But it looks pretty good, right?\n\n(DMs are open if you want to argue about this)",
    scheduledFor: getDateString(0, 10, 0), // Today 10:00 AM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-2",
    content: "The secret to great product design?\n\nStop designing for users. Start designing WITH them.\n\nEvery project at the agency starts with a deep dive into user behavior. Not assumptions. Not guesses. Real data.\n\nThe designs that convert are the ones built on evidence.",
    scheduledFor: getDateString(1, 9, 0), // Tomorrow 9:00 AM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-3",
    content: "Unpopular opinion: Your startup doesn't need a full-time designer.\n\nWhat you need is:\n• Someone who gets product\n• Fast iteration cycles\n• Design that ships, not sits in Figma\n\nThat's exactly why agencies like ours exist.",
    scheduledFor: getDateString(1, 14, 0), // Tomorrow 2:00 PM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-4",
    content: "Just wrapped up a rebrand for a fintech startup.\n\nThey came to us with: \"We look like every other finance app.\"\n\nWe gave them: A visual identity that actually reflects their innovation.\n\n3 weeks. Full brand system. Website. App redesign.\n\nThis is what happens when design and dev work together.",
    scheduledFor: getDateString(2, 10, 30), // Day after tomorrow 10:30 AM
    status: "scheduled",
    hasImage: true,
  },
  {
    id: "post-5",
    content: "Why do most MVPs look terrible?\n\nBecause founders think design is a nice-to-have.\n\nReality check: Your MVP IS your first impression. Users don't know it's an MVP. They just see a product that looks unfinished.\n\nInvest in design early. It's cheaper than losing users.",
    scheduledFor: getDateString(3, 9, 0), // 3 days 9:00 AM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-6",
    content: "The tech stack doesn't matter.\n\nReact, Vue, Svelte - pick one.\n\nWhat matters:\n→ Does it ship fast?\n→ Can you maintain it?\n→ Does the user care?\n\nSpoiler: The user never cares what framework you used.",
    scheduledFor: getDateString(3, 15, 0), // 3 days 3:00 PM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-7",
    content: "Every client asks: \"How long will it take?\"\n\nHonest answer: It depends on how fast you give feedback.\n\nWe've built full products in 4 weeks.\nWe've also seen simple landing pages take 3 months.\n\nThe difference? Client responsiveness.\n\nDesign is a collaboration, not a delivery service.",
    scheduledFor: getDateString(4, 11, 0), // 4 days 11:00 AM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-8",
    content: "Raised my agency rates by 40% this year.\n\nLost some clients.\nAttracted better ones.\n\nThe lesson: Price reflects positioning. If you want premium clients, you need premium pricing.\n\nCheap clients will always find something to complain about. Premium clients trust the process.",
    scheduledFor: getDateString(5, 9, 30), // 5 days 9:30 AM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-9",
    content: "Tools I use daily at the agency:\n\n• Figma - design\n• Cursor - development\n• Linear - project management\n• Slack - async communication\n• Loom - client updates\n\nSimple stack. No complexity. Ship fast.\n\nWhat's in your toolkit?",
    scheduledFor: getDateString(6, 10, 0), // 6 days 10:00 AM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-10",
    content: "The best compliment a client ever gave us:\n\n\"It feels like you're part of our team, not an external agency.\"\n\nThat's the goal. We don't do handoffs and disappear.\n\nWe embed. We iterate. We care about the outcome as much as you do.\n\nThat's what separates good agencies from great ones.",
    scheduledFor: getDateString(7, 14, 0), // 7 days 2:00 PM
    status: "scheduled",
    hasImage: false,
  },
];

export const initialDrafts: Post[] = [
  {
    id: "draft-1",
    content: "An outsource design solution isn't the best fit for everyone, but if you're looking for:\n\n• Consistent, high-quality output\n• A team that understands tech products\n• Flexible engagement without full-time overhead\n\nThen we should talk.",
    scheduledFor: null,
    status: "draft",
    hasImage: false,
  },
  {
    id: "draft-2",
    content: "Your co-founder: \"Our homepage needs work.\"\n\nWhat they actually mean:\n- Bounce rate is too high\n- Users don't understand what we do\n- The CTA isn't converting\n\nAlways dig deeper into feedback. The surface issue is rarely the real problem.",
    scheduledFor: null,
    status: "draft",
    hasImage: false,
  },
];

export const initialPostedPosts: Post[] = [
  {
    id: "posted-1",
    content: "One of the coolest ways we help companies is when we fully embed with their product team.\n\nWe become an extension of their design capabilities.\n\nNo handoffs. No misalignment. Just shipping great work together.",
    scheduledFor: null,
    postedAt: getDateString(-3, 10, 0), // 3 days ago
    status: "posted",
    hasImage: false,
    engagement: { likes: 47, comments: 12, reposts: 3 },
  },
  {
    id: "posted-2",
    content: "The best design systems aren't built, they're grown.\n\nStart with the components you actually need. Add more as patterns emerge.\n\nPremature abstraction is the root of all evil in design systems.",
    scheduledFor: null,
    postedAt: getDateString(-5, 9, 0), // 5 days ago
    status: "posted",
    hasImage: false,
    engagement: { likes: 89, comments: 23, reposts: 7 },
  },
];

export const feedPosts: FeedPost[] = [
  {
    id: "feed-1",
    author: {
      name: "Yishay Shalev",
      headline: "Design + Development for Tech companies at shalev.agency",
      avatar: "/yishay-avatar.jpeg",
      isVerified: false,
      connectionDegree: "1st",
    },
    content: "Hot take: I'm probably the best design partner you'll ever have.\n\nI mean, I built this entire scheduling tool in a weekend just to prove a point.\n\nThe point? I have no idea. But it looks pretty good, right?\n\n(DMs are open if you want to argue about this)",
    timeAgo: "2h",
    engagement: { likes: 127, comments: 34, reposts: 8 },
    websiteLink: "http://shalev.agency",
  },
  {
    id: "feed-2",
    author: {
      name: "Sarah Chen",
      headline: "Product Design Lead at Figma | Ex-Google",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      isVerified: true,
      connectionDegree: "2nd",
    },
    content: "Design systems aren't about consistency.\n\nThey're about freeing your team to focus on the hard problems instead of reinventing buttons.\n\nThe best design system is the one your team actually uses.",
    timeAgo: "4h",
    engagement: { likes: 892, comments: 67, reposts: 45 },
    actionButton: "connect",
  },
  {
    id: "feed-3",
    author: {
      name: "Alex Rivera",
      headline: "Founder & CEO at LaunchPad | Helping startups scale",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      isVerified: true,
      connectionDegree: "2nd",
    },
    content: "Raised $2M for our startup.\n\nHere's what I learned:\n\n1. Your deck matters less than your story\n2. Warm intros are everything\n3. VCs talk to each other (a lot)\n4. No doesn't mean never\n5. The best investors add more than money\n\nKeep building.",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    timeAgo: "6h",
    engagement: { likes: 2341, comments: 189, reposts: 124 },
    actionButton: "follow",
  },
  {
    id: "feed-4",
    author: {
      name: "Maya Patel",
      headline: "Senior UX Researcher at Microsoft | Speaker",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
      isVerified: false,
      connectionDegree: "3rd",
    },
    content: "Stop asking users what they want.\n\nStart watching what they do.\n\nThe gap between what people say and what they actually do is where all the insights hide.",
    timeAgo: "8h",
    engagement: { likes: 567, comments: 43, reposts: 28 },
    actionButton: "connect",
  },
  {
    id: "feed-5",
    author: {
      name: "David Kim",
      headline: "Engineering Manager at Stripe | Building payments infrastructure",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      isVerified: true,
      connectionDegree: "2nd",
    },
    content: "The best code is the code you don't write.\n\nEvery line is a liability:\n- It can break\n- It needs testing\n- It needs documentation\n- Someone has to maintain it\n\nSimplicity wins.",
    timeAgo: "1d",
    engagement: { likes: 1205, comments: 98, reposts: 67 },
  },
];
