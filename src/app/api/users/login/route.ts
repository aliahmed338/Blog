import prisma from "@/app/utils/db";
import { LoginDto } from "@/app/utils/dto";
import { setCookies } from "@/app/utils/tokenInCookies";
import { Payload } from "@/app/utils/type";
import { loginSchema } from "@/app/utils/validation";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method Post
 * @route  ~/api/users/login
 * @desc   login user
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const Body = (await request.json()) as LoginDto;
    // validation
    const validation = loginSchema.safeParse(Body);
    // validation
    if (!validation.success) {
      return NextResponse.json(validation.error.issues[0].message, {
        status: 400,
      });
    }

    // find user
    const user = await prisma.user.findUnique({ where: { email: Body.email } });
    if (!user) {
      return NextResponse.json(
        { message: "please make an account first" },
        {
          status: 404,
        }
      );
    }

    // bcrypt password
    const isPsswordMatch = await bcrypt.compare(Body.password, user.password);
    if (!isPsswordMatch) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    // set token and add to cookies
    const jwtPayload: Payload = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
      email: user.email,
      image: user.image || "",
    };
    const cookie = setCookies(jwtPayload);
    return NextResponse.json(
      { message: "authenticated" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error", err },
      { status: 500 }
    );
  }
}
