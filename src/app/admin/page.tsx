import React from "react";
import AddArticleForm from "./AddArticleForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "../utils/verifyToken";

const Admin = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  if (!token || payload?.isAdmin === false) {
    redirect("/");
  }
  return (
    <div className="w-full">
      <h3 className="font-black text-5xl mb-5">Add new Article</h3>

      <AddArticleForm />
    </div>
  );
};

export default Admin;
