import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

/**
 * @method Get
 * @route  ~/api/users/logout
 * @desc   logout user
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("jwtToken");
    return NextResponse.json({ message: "logout" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error", err },
      { status: 500 }
    );
  }
}
