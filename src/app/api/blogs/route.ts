import { NextRequest, NextResponse } from "next/server";
import { createArticleSchema } from "@/app/utils/validation";
import { createArticleDto } from "@/app/utils/dto";
import { Article } from "@/generated/prisma";
import prisma from "@/app/utils/db";
import { ARTICLE_PER_PAGE } from "@/app/utils/constant";
import { verifyToken } from "@/app/utils/verifyToken";

/**
 * @method GET
 * @route  ~/api/articles
 * @desc   Get All Articles by page number
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const pageParam = request.nextUrl.searchParams.get("pageNumber");
    const pageNumber = Number(pageParam);

    const validPage =
      !pageParam || isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;

    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (validPage - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error", err },
      { status: 500 }
    );
  }
}

/**
 * @method Post
 * @route  ~/api/articles
 * @desc   Create All Articles
 * @access private (only admin can add article)
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin access denied" },
        {
          status: 403,
        }
      );
    }
    const body = (await request.json()) as createArticleDto;

    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.issues[0].message, {
        status: 400,
      });
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error", err },
      { status: 500 }
    );
  }
}
