"use client";

import { DOMAIN } from "@/app/utils/constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommetForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const [text, setText] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("please write something");
      return;
    }
    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      router.refresh();
      setText("");
    } catch (err: any) {
      setText("");
      toast.error(err?.response?.data.message);
    }
  };
  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex justify-center items-start my-5"
    >
      <Input
        type="text"
        placeholder="Add a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        type="submit"
        className="text-sm cursor-pointer text-white rounded-l-none "
      >
        Comment
      </Button>
    </form>
  );
};

export default AddCommetForm;
