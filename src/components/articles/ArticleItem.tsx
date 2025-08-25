"use client";

import { DOMAIN } from "@/app/utils/constant";
import { Button } from "@/components/ui/button";
import { Article } from "@/generated/prisma";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ArticleItemProps {
  article: Article;
  isAdmin?: boolean;
}
const ArticleItem = ({ article, isAdmin = false }: ArticleItemProps) => {
  const router = useRouter();
  const deleteSingleArticleById = async (articleId: number) => {
    try {
      await axios.delete(`${DOMAIN}/api/blogs/${articleId}`);
      router.refresh();
      toast.success("Article deleted successfully..!");
    } catch (err: any) {
      toast.error(err?.response?.data.message);
    }
  };
  return (
    <div className={` rounded-lg flex flex-col justify-between `}>
      <Link href={`/${article.id}`}>
        {article.image && (
          <Image
            src={article.image}
            alt="Preview"
            className="rounded object-cover object-top w-full max-h-60"
            width={120}
            height={120}
            layout="responsive"
            priority={true}
          />
        )}
      </Link>

      <div className="flex justify-between items-center mt-4">
        <h3 className="font-medium  line-clamp-1">{article.title}</h3>

        {isAdmin && (
          <Button
            className="cursor-pointer bg-red-950 rounded-md hover:bg-destructive/50 "
            onClick={() => deleteSingleArticleById(article.id)}
          >
            delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ArticleItem;
