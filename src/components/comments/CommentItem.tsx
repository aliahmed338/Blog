"use client";
import { DOMAIN } from "@/app/utils/constant";
import { CommentWithUser } from "@/app/utils/type";
import axios from "axios";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

interface CommentItemProps {
  comment: CommentWithUser;
}
const CommentItem = ({ comment }: CommentItemProps) => {
  const router = useRouter();
  const deleteSingleCommentById = async (commmentId: number) => {
    try {
      await axios.delete(`${DOMAIN}/api/comments/${commmentId}`);
      router.refresh();
      toast.success("comment deleted successfully..!");
    } catch (err: any) {
      toast.error(err?.response?.data.message);
    }
  };

  return (
    <div className="px-4 mb-4 p-2 rounded-lg border">
      <div className="flex justify-between items-start">
        <strong className="text-gray-800 dark:text-white ">
          {comment.user.username}
        </strong>
        <Button
          variant={"link"}
          onClick={() => deleteSingleCommentById(comment.id)}
          className="cursor-pointer text-destructive flex justify-end items-center -mt-2"
        >
          delete
        </Button>
      </div>
      <p className="text-gray-800 mb-2 dark:text-white">{comment.text}</p>

      {/* <span className=" px-1 rounded-lg text-black dark:text-white">
          {new Date(comment.createdAt).toDateString()}
        </span> */}
    </div>
  );
};

export default CommentItem;
