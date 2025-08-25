import { Article, Comment } from "@/generated/prisma";

export interface Payload {
  id?: number;
  isAdmin?: boolean;
  username?: string;
  email?: string;
  image?: string;
}

export type User = {
  id: number;
  isAdmin: boolean;
  username: string;
  image: string;
  email: string;
};

export type CommentWithUser = Comment & { user: User };
export type SingleArticle = Article & { comments: CommentWithUser[] };
