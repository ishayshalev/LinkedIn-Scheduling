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
    avatar: string | null;
  };
  content: string;
  imageUrl?: string;
  timeAgo: string;
  engagement: {
    likes: number;
    comments: number;
    reposts: number;
  };
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
    content: "Man vibe coding is something else. Started playing around with cursor, and it can feel so stupid and so smart sometimes.\n\nhopefully its going to get better soon, going to ship some cool stuff with it for the agency and clients",
    scheduledFor: getDateString(0, 9, 0), // Today 9:00 AM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-2",
    content: "Quick design tip: Always test your mobile layouts at actual phone size, not just responsive browser windows.\n\nThe difference is huge. Your thumb can't reach that button on a real phone.",
    scheduledFor: getDateString(0, 14, 15), // Today 2:15 PM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-3",
    content: "When you design a product, I always try to optimize for the 1 goal that matters most.\n\nEverything else is secondary.",
    scheduledFor: getDateString(1, 10, 30), // Tomorrow 10:30 AM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-4",
    content: "I recently had a talk with Jeff Kapinski about growing my agency...\n\nHere are 5 things I learned that changed how I think about scaling:\n\n1. Focus on outcomes, not outputs\n2. Hire slow, fire fast\n3. Process is your product\n4. Charge for value, not time\n5. Build systems, not dependencies",
    scheduledFor: getDateString(2, 9, 0), // Day after tomorrow 9:00 AM
    status: "scheduled",
    hasImage: true,
  },
  {
    id: "post-5",
    content: "What's the one tool you couldn't live without as a designer?\n\nI'll go first: Figma's auto-layout changed everything for me.",
    scheduledFor: getDateString(2, 16, 0), // Day after tomorrow 4:00 PM
    status: "scheduled",
    hasImage: false,
  },
  {
    id: "post-6",
    content: "Story of how I started my agency...\n\nI was working at a startup, grinding 60+ hours a week, and realized I was building someone else's dream.\n\nSo I took the leap. Started freelancing. Then built a team.\n\n3 years later, we've worked with 40+ companies.\n\nThe lesson? Sometimes the scariest path is the right one.",
    scheduledFor: getDateString(3, 11, 0), // 3 days from now 11:00 AM
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
      name: "Sarah Chen",
      headline: "Product Design Lead at Stripe | Ex-Google",
      avatar: null,
    },
    content: "Just shipped a major redesign of our checkout flow.\n\n3 months of research, testing, and iteration.\n\nResult: 23% increase in conversion rate.\n\nThe key insight? Reducing cognitive load at each step matters more than visual polish.\n\nDon't make users think.",
    timeAgo: "2h",
    engagement: { likes: 234, comments: 45, reposts: 12 },
  },
  {
    id: "feed-2",
    author: {
      name: "Marcus Johnson",
      headline: "Founder & CEO at TechStart | Building the future of work",
      avatar: null,
    },
    content: "Hot take: Remote work isn't going away.\n\nCompanies forcing RTO are just delaying the inevitable.\n\nThe best talent wants flexibility. Period.\n\nAdapt or lose your best people to companies that will.",
    imageUrl: "placeholder",
    timeAgo: "4h",
    engagement: { likes: 1234, comments: 287, reposts: 89 },
  },
  {
    id: "feed-3",
    author: {
      name: "Emily Rodriguez",
      headline: "Senior Engineer at Netflix | React enthusiast",
      avatar: null,
    },
    content: "I've been coding for 10 years and I still Google basic things.\n\nImposter syndrome never fully goes away.\n\nBut here's what I've learned: Everyone is figuring it out as they go.\n\nThe difference between juniors and seniors? Seniors are better at searching.",
    timeAgo: "6h",
    engagement: { likes: 567, comments: 89, reposts: 34 },
  },
  {
    id: "feed-4",
    author: {
      name: "David Park",
      headline: "Design Systems at Figma | Previously Airbnb",
      avatar: null,
    },
    content: "Design tokens are the foundation of scalable design systems.\n\nBut most teams implement them wrong.\n\nHere's the framework I use:\n\n1. Primitive tokens (raw values)\n2. Semantic tokens (purpose-driven)\n3. Component tokens (context-specific)\n\nThis hierarchy makes maintenance 10x easier.",
    timeAgo: "8h",
    engagement: { likes: 345, comments: 56, reposts: 23 },
  },
];
