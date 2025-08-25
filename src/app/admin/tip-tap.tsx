"use client";

import { Toggle } from "@/components/ui/toggle";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  CornerDownLeft,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import CodeBlock from "@tiptap/extension-code-block";
import HardBreak from "@tiptap/extension-hard-break";

const Tiptap = ({ val }: { val: string }) => {
  const { setValue } = useFormContext();
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Add A longer description for your product",
        emptyNodeClass:
          "first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
      }),
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      CodeBlock.configure({
        languageClassPrefix: "language-",
        HTMLAttributes: {
          class: "bg-gray-800 text-white p-4 rounded-md",
        },
      }),
      HardBreak.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setValue("description", content, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      console.log(content);
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      },
    },
    immediatelyRender: false,
    content: val,
  });

  useEffect(() => {
    if (editor && val !== editor.getHTML()) {
      editor.commands.setContent(val);
    }
  }, [val, editor]);

  return (
    <div className="flex flex-col gap-2">
      {editor && (
        <div className="border rounded-md">
          <Toggle
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            aria-label="Toggle bold cursor-pointer"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Toggle italic cursor-pointer"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            aria-label="Toggle strike cursor-pointer"
          >
            <Strikethrough className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("orderList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            aria-label="Toggle orderlist cursor-pointer"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            aria-label="Toggle bulletlist cursor-pointer"
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("codeBlock")}
            onPressedChange={() =>
              editor.chain().focus().toggleCodeBlock().run()
            }
            aria-label="Toggle code block"
          >
            <Code className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={false}
            onPressedChange={() => editor.chain().focus().setHardBreak().run()}
            aria-label="Insert line break"
          >
            <CornerDownLeft className="h-4 w-4" />
          </Toggle>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
