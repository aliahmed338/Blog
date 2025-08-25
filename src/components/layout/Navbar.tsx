import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.svg";
import { cookies } from "next/headers";
import { Button } from "../ui/button";
import { verifyTokenForPage } from "@/app/utils/verifyToken";

const Navbar = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwtToken")?.value || "";

  const payload = verifyTokenForPage(token);

  return (
    <header className="w-[21rem]  md:w-[40rem] lg:w-[64rem] m-auto my-4 flex justify-between items-center">
      <Link href="/">
        <Image
          className="w-40 dark:brightness-0 dark:invert "
          src={logo}
          alt="logo"
        />
      </Link>
      {token ? (
        <ModeToggle {...payload} />
      ) : (
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      )}
    </header>
  );
};

export default Navbar;
