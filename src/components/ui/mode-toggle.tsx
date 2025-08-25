"use client";

import * as React from "react";
import { LogOut, Moon, Paperclip, PlusCircle, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DOMAIN } from "@/app/utils/constant";
import axios from "axios";
import { Payload } from "@/app/utils/type";

export function ModeToggle({ id, email, image, isAdmin, username }: Payload) {
  const router = useRouter();
  async function logOut() {
    await axios.get(`${DOMAIN}/api/users/logout`);
    router.replace("/");
    router.refresh();
  }

  const { setTheme, theme } = useTheme();
  console.log(image);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={image} />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className=" md:w-[200px] m-3 p-4 dark:text-black bg-violet-200 focus:bg-violet-200 flex flex-col gap-1 items-center rounded-md">
          <Avatar className="cursor-pointer w-16 h-16">
            <AvatarImage src={image} />
          </Avatar>
          <p className="text-sm">{email}</p>
          <h3>{username}</h3>
        </DropdownMenuItem>
        <DropdownMenuItem className="group py-2 px-3">
          <div
            onClick={(e) => {
              theme === "light" ? setTheme("dark") : setTheme("light");
              e.stopPropagation();
            }}
            className="relative flex items-center gap-3"
          >
            <Sun className="  group-hover:text-yellow-600 absolute dark:scale-0 dark:rotate-90 group-hover:rotate-180 transition-all duration-500 ease-in-out" />
            <Moon className=" group-hover:text-blue-400 dark:scale-100 scale-0 group-hover:rotate-360 transition-all duration-500 ease-in-out" />
            <p>{theme}</p>
          </div>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem className="group py-2 px-3">
            <Link href={"/admin"} className="flex items-center gap-3">
              <PlusCircle
                width={12}
                className=" group-hover:text-emerald-700 group-hover:rotate-180 transition-all duration-500 ease-in-out"
              />
              Admin
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="group py-2 px-3">
          <Link href={"/"} className="flex items-center gap-3">
            <Paperclip
              width={12}
              className=" group-hover:rotate-180 group-hover:text-violet-600 transition-all duration-500 ease-in-out"
            />
            Article
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => logOut()}
          className="group py-2 px-3 focus:bg-red-300 mb-3"
        >
          <Link href={"/"} className="flex items-center gap-3">
            <LogOut
              width={12}
              className=" group-hover:translate-x-1 group-hover:text-red-950 transition-all duration-500 ease-in-out"
            />
            sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
