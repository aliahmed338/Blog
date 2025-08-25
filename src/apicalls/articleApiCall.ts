import { Article } from "@/generated/prisma";
import { DOMAIN } from "@/app/utils/constant";
import { SingleArticle } from "@/app/utils/type";
// get article based in page number
export async function getArticles(
  pageNumber: string | undefined
): Promise<Article[]> {
  const response = await fetch(`${DOMAIN}/api/blogs?pageNumber=${pageNumber}`);

  if (!response.ok) {
    throw new Error("falid to fetch blogs");
  }

  return response.json();
}
// articles count
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/blogs/count`);

  if (!response.ok) {
    throw new Error("falid to fetch articles count");
  }

  const { count } = await response.json();
  return count;
}
// search for articles
// export async function searchArticles(searchText: string): Promise<Article[]> {
//   const response = await fetch(
//     `${DOMAIN}/api/blogs/search?searchText=${searchText}`
//   );

//   if (!response.ok) {
//     throw new Error("falid to fetch blogs count");
//   }

//   return response.json();
// }

// get single article by id
export async function getSingleArticleById(
  articleId: string
): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/blogs/${articleId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("falid to fetch blogs count");
  }

  return response.json();
}
// // deltet single article by id

// export async function getComments() {
//   const response = await fetch(`${DOMAIN}/api/comments`);

//   if (!response.ok) {
//     throw new Error("falid to fetch comments");
//   }

//   return response.json();
// }
