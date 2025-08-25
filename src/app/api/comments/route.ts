import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { verifyToken } from "@/app/utils/verifyToken";
import { CraeteCommentDto } from "@/app/utils/dto";
import { createCommentSchema } from "@/app/utils/validation";

/**
 * @method POST
 * @route  ~/api/comments
 * @desc   create new  comment
 * @access private (only loggid in user can comment)
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "only logged in user can add comment" },
        { status: 401 }
      );
    }
    const body = (await request.json()) as CraeteCommentDto;

    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.issues[0].message, {
        status: 400,
      });
    }

    const article = await prisma.article.findUnique({
      where: { id: body.articleId },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "internal server error" },
      {
        status: 500,
      }
    );
  }
}

/**
 * @method GET
 * @route  ~/api/comments
 * @desc   get all  comment
 * @access private (only Admin)
 */

export async function GET(request: NextRequest) {
  try {
    // const user = verifyToken(request);

    // if (!user) {
    //   return NextResponse.json(
    //     { message: "only Admin or user can get comment" },
    //     { status: 403 }
    //   );
    // }

    const comments = await prisma.comment.findMany({
      include: { user: { select: { username: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error", err },
      {
        status: 500,
      }
    );
  }
}
