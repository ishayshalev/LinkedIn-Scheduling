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
      name: "Ofer Monar, Ph.D.",
      headline: "Founder and head lecturer at Uxer - UX Studies and consultancy",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      isVerified: true,
      connectionDegree: "2nd",
    },
    content: "יש לכם חברה ואתם צריכים מתמחים למחקר ועיצוב UI/UX?\nמעולה! יש לנו כאלה!!\nבמסגרת ההתמחות באפיון חוויית משתמש תחת תואר ראשון בפסיכולוגיה באקדמית ת״א יפו,\nפתחנו את ההרשמה להברות הרוצות להשתתף בתכנית ההתמחות UX ל-2026 (מרץ עד יוני).",
    timeAgo: "29m",
    engagement: { likes: 48, comments: 12, reposts: 3 },
    celebratedBy: "Guy Magen",
    showTranslation: true,
    actionButton: "connect",
  },
  {
    id: "feed-2",
    author: {
      name: "Boaz Rossano",
      headline: "UX Expert for Explainable AI | Helping Startup Companies Gain ...",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      isVerified: true,
      connectionDegree: "2nd",
    },
    content: "יש לכם חברה ואתם צריכים מתמחים למחקר ועיצוב UI/UX?\nמעולה! יש לנו כאלה!!",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
    timeAgo: "5d • Edited",
    engagement: { likes: 234, comments: 45, reposts: 12 },
    showTranslation: true,
    actionButton: "connect",
  },
  {
    id: "feed-3",
    author: {
      name: "Adeo Ressi",
      headline: "CEO at Decile Group, Chairman at Founder Institute, Funding...",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
      isVerified: true,
      connectionDegree: "2nd",
    },
    content: "The last satisfying GP just retired.",
    timeAgo: "1d",
    engagement: { likes: 36, comments: 24, reposts: 1 },
    isPromoted: true,
    promotedBy: "Decile Group",
    actionButton: "follow",
  },
  {
    id: "feed-4",
    author: {
      name: "Amir Shneider",
      headline: "CMO | Skywatch, VOOM & Toffu AI",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
      isVerified: true,
      connectionDegree: "1st",
    },
    content: "Design tokens are the foundation of scalable design systems.\n\nBut most teams implement them wrong.\n\nHere's the framework I use:\n\n1. Primitive tokens (raw values)\n2. Semantic tokens (purpose-driven)\n3. Component tokens (context-specific)",
    timeAgo: "4h • Edited",
    engagement: { likes: 345, comments: 56, reposts: 23 },
  },
];
