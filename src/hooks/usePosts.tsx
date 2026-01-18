import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  type Post,
  initialScheduledPosts,
  initialDrafts,
  initialPostedPosts,
} from '@/data/posts';

interface PostsContextType {
  scheduledPosts: Post[];
  drafts: Post[];
  postedPosts: Post[];
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  createDraft: () => Post;
  schedulePost: (id: string, scheduledFor: string) => void;
  moveToDraft: (id: string) => void;
  swapPostTimes: (postId1: string, postId2: string) => void;
  movePostToDate: (postId: string, newDate: Date) => void;
}

const PostsContext = createContext<PostsContextType | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>(initialScheduledPosts);
  const [drafts, setDrafts] = useState<Post[]>(initialDrafts);
  const [postedPosts] = useState<Post[]>(initialPostedPosts);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(
    initialScheduledPosts[0]?.id || null
  );

  const updatePost = (id: string, updates: Partial<Post>) => {
    setScheduledPosts((posts) =>
      posts.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    setDrafts((posts) =>
      posts.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deletePost = (id: string) => {
    setScheduledPosts((posts) => posts.filter((p) => p.id !== id));
    setDrafts((posts) => posts.filter((p) => p.id !== id));
    if (selectedPostId === id) {
      setSelectedPostId(null);
    }
  };

  const createDraft = (): Post => {
    const newPost: Post = {
      id: `draft-${Date.now()}`,
      content: '',
      scheduledFor: null,
      status: 'draft',
      hasImage: false,
    };
    setDrafts((posts) => [newPost, ...posts]);
    setSelectedPostId(newPost.id);
    return newPost;
  };

  const schedulePost = (id: string, scheduledFor: string) => {
    // Check if it's a draft
    const draft = drafts.find((p) => p.id === id);
    if (draft) {
      // Move from drafts to scheduled
      setDrafts((posts) => posts.filter((p) => p.id !== id));
      setScheduledPosts((posts) => [
        ...posts,
        { ...draft, scheduledFor, status: 'scheduled' },
      ]);
    } else {
      // Update existing scheduled post
      setScheduledPosts((posts) =>
        posts.map((p) => (p.id === id ? { ...p, scheduledFor } : p))
      );
    }
  };

  const moveToDraft = (id: string) => {
    const post = scheduledPosts.find((p) => p.id === id);
    if (post) {
      setScheduledPosts((posts) => posts.filter((p) => p.id !== id));
      setDrafts((posts) => [
        { ...post, scheduledFor: null, status: 'draft' },
        ...posts,
      ]);
    }
  };

  const swapPostTimes = (postId1: string, postId2: string) => {
    setScheduledPosts((posts) => {
      const post1 = posts.find((p) => p.id === postId1);
      const post2 = posts.find((p) => p.id === postId2);

      if (!post1 || !post2 || !post1.scheduledFor || !post2.scheduledFor) {
        return posts;
      }

      return posts.map((p) => {
        if (p.id === postId1) {
          return { ...p, scheduledFor: post2.scheduledFor };
        }
        if (p.id === postId2) {
          return { ...p, scheduledFor: post1.scheduledFor };
        }
        return p;
      });
    });
  };

  const movePostToDate = (postId: string, newDate: Date) => {
    setScheduledPosts((posts) => {
      const post = posts.find((p) => p.id === postId);
      if (!post || !post.scheduledFor) return posts;

      // Keep the same time, just change the date
      const oldDate = new Date(post.scheduledFor);
      const updatedDate = new Date(newDate);
      updatedDate.setHours(oldDate.getHours(), oldDate.getMinutes(), 0, 0);

      return posts.map((p) =>
        p.id === postId ? { ...p, scheduledFor: updatedDate.toISOString() } : p
      );
    });
  };

  const selectedPost =
    [...scheduledPosts, ...drafts, ...postedPosts].find(
      (p) => p.id === selectedPostId
    ) || null;

  return (
    <PostsContext.Provider
      value={{
        scheduledPosts,
        drafts,
        postedPosts,
        selectedPostId,
        setSelectedPostId,
        updatePost,
        deletePost,
        createDraft,
        schedulePost,
        moveToDraft,
        swapPostTimes,
        movePostToDate,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}

export function useSelectedPost(): Post | null {
  const { scheduledPosts, drafts, postedPosts, selectedPostId } = usePosts();
  return (
    [...scheduledPosts, ...drafts, ...postedPosts].find(
      (p) => p.id === selectedPostId
    ) || null
  );
}
