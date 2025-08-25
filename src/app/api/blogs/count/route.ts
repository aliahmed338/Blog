import prisma from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route  ~/api/articles
 * @desc   Get All Articles count
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const count = await prisma.article.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
