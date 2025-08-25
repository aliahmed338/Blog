import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { verifyToken } from "@/app/utils/verifyToken";
import { updateCommentDto } from "@/app/utils/dto";

interface Props {
  params: Promise<{ id: string }>;
}
/**
 * @method PUT
 * @route  ~/api/comments/:id
 * @desc   update comment
 * @access private (only owner in user can comment)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        {
          status: 404,
        }
      );
    }
    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "you are not allawed,access denied" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as updateCommentDto;
    const updatecomment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: {
        text: body.text,
      },
    });
    return NextResponse.json(updatecomment, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error", err },
      {
        status: 500,
      }
    );
  }
}

/**
 * @method Delete
 * @route  ~/api/comments/:id
 * @desc   update comment
 * @access private (only owner or admin in user can comment)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        {
          status: 404,
        }
      );
    }

    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json(
        { message: "no token provided,access denied" },
        { status: 401 }
      );
    }
    if (user.id === comment.userId || user.isAdmin) {
      await prisma.comment.delete({ where: { id: parseInt(id) } });
      return NextResponse.json(
        { message: "deleted successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "you are not allawed ,access denied" },
      { status: 403 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error", err },
      {
        status: 500,
      }
    );
  }
}
