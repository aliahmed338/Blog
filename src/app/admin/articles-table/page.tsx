import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Article } from "@/generated/prisma";
import { ARTICLE_PER_PAGE } from "../../utils/constant";
import { getArticles, getArticlesCount } from "@/apicalls/articleApiCall";
import Pagination from "@/components/articles/Pagination";
import ArticleItem from "@/components/articles/ArticleItem";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page({ searchParams }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  if (!token || payload?.isAdmin === false) {
    redirect("/");
  }

  const { pageNumber } = await searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await getArticlesCount();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  return (
    <section className="mb-32">
      <Pagination
        pageNumber={parseInt(pageNumber)}
        route="/admin/articles-table"
        pages={pages}
      />
      <div className="grid grid-cols-1 gap-4 mt-6">
        {articles.map((article) => (
          <ArticleItem isAdmin article={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}

// export default Page;
