export const POST_TYPE = {
  BLOG: 'blog',
  YOUTUBE: 'youtube',
} as const;

export type PostType = (typeof POST_TYPE)[keyof typeof POST_TYPE];
