import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().min(3).max(200),
  password: z.string().min(5).max(200),
});

export const registerSchema = z.object({
  username: z.string().min(2).max(200),
  email: z.string().min(3).max(200).email(),
  password: z.string().min(6),
});

// articles

export const createArticleSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(10),
});

// comments
export const createCommentSchema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),
});
