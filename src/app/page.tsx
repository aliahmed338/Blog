import ArticleItem from "@/components/articles/ArticleItem";
import type { Metadata } from "next";
import SearchArticlesInput from "@/components/articles/SearchArticlesInput";
import Pagination from "@/components/articles/Pagination";
import { getArticles, getArticlesCount } from "@/apicalls/articleApiCall";
import { Article } from "@/generated/prisma";
import { ARTICLE_PER_PAGE } from "@/app/utils/constant";

export const metadata: Metadata = {
  title: "Articles",
  description: "Articles about anything",
};

interface ArticlePageProps {
  searchParams: Promise<{ pageNumber: string }>;
}
const Home = async ({ searchParams }: ArticlePageProps) => {
  const { pageNumber } = await searchParams;

  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await getArticlesCount();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  return (
    <div>
      <section className="mb-32  m-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {articles.map((article) => (
            <ArticleItem article={article} key={article.id} />
          ))}
        </div>
        <Pagination
          pageNumber={parseInt(pageNumber)}
          route="/articles"
          pages={pages}
        />
      </section>
    </div>
  );
};

export default Home;
