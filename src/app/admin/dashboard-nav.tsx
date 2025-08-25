"use client";
import Link from "next/link";
import React from "react";
import { Paperclip, PenSquare, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaComment } from "react-icons/fa";

const DashboardNav = () => {
  const pathname = usePathname();
  const Links = [
    {
      label: "Articles",
      path: "/admin/articles-table?pageNumber=1",
      icon: <Paperclip size={16} />,
    },
    {
      label: "Comments",
      path: "/admin/comments-table",
      icon: <FaComment size={16} />,
    },
    {
      label: "Create",
      path: "/admin",
      icon: <PenSquare size={16} />,
    },
  ] as const;
  return (
    <nav className="py-2 mb-6 overflow-auto">
      <ul className="flex gap-8 text-xs justify-center font-semibold ">
        <AnimatePresence>
          {Links.map((link) => (
            <motion.li whileTap={{ scale: 0.95 }} key={link.label}>
              <Link
                className={`relative flex flex-col gap-1 items-center ${
                  pathname === link.path.split("?")[0] && "text-primary"
                }`}
                href={link.path.split("?")[0]}
              >
                {link.icon}
                {link.label}
                {pathname === link.path.split("?")[0] && (
                  <motion.div
                    className="h-[2px] w-full rounded-full absolute bg-primary z-0 left-0 -bottom-1"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    layoutId="underline"
                  ></motion.div>
                )}
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </nav>
  );
};

export default DashboardNav;
