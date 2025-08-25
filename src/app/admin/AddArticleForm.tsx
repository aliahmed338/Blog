"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { DOMAIN } from "../utils/constant";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import Tiptap from "./tip-tap";
import Image from "next/image";

// Define Zod schema for validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.instanceof(File).optional(),
});

export default function AddArticleForm() {
  // Initialize React Hook Form with Zod schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
    },
  });

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      let imageUrl = "";

      if (data.image) {
        const imageData = new FormData();
        imageData.append("file", data.image);
        imageData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        );

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          imageData
        );

        imageUrl = res.data.secure_url;
      }

      await axios.post(`${DOMAIN}/api/blogs`, {
        title: data.title,
        description: data.description,
        image: imageUrl,
      });

      form.reset();
      toast.success("New Article Added!");
    } catch (err: any) {
      toast.error(err?.response?.data.message || "Failed to add article");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 font-[var(--font-abeezee)]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Article Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Tiptap val={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                  />
                  {value && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Preview:</p>
                      <Image
                        src={URL.createObjectURL(value)}
                        alt="Preview"
                        className="mt-2 max-h-60 rounded"
                        width={50}
                        height={50}
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className=" ">
          Add
        </Button>
      </form>
    </Form>
  );
}
