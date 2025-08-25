import CommentItem from "@/components/comments/CommentItem";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { CommentWithUser } from "@/app/utils/type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { DOMAIN } from "@/app/utils/constant";

const AdminCommentsTable = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  if (!token || payload?.isAdmin === false) {
    redirect("/");
  }
  const response = await fetch(`${DOMAIN}/api/comments`);
  const comments: CommentWithUser[] = await response.json();

  return (
    <section className="mb-32">
      {comments.length ? (
        <div className="grid grid-cols-1 gap-4 mt-6">
          {comments.map((comment) => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        </div>
      ) : (
        "no comments"
      )}
    </section>
  );
};

export default AdminCommentsTable;
