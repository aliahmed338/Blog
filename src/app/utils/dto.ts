export interface LoginDto {
  email: string;
  password: string;
}
export interface registerDto {
  username: string;
  email: string;
  password: string;
  image: string;
  isAdmin: boolean;
}

// articles
export interface createArticleDto {
  title: string;
  description: string;
  image: string;
}

// commments
export interface CraeteCommentDto {
  text: string;
  articleId: number;
}
export interface updateCommentDto {
  text?: string;
}
